import { DSPHandleAxiosError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import services from '../../../../../config/services';

export default form => {
	const {
		search: { type },
	} = DSPUseNavAppendSearch();
	const intl = useIntl();
	const { formatMessage } = useIntl();
	const { axiosApi: fetchGWPOption, data: gwpOption } = DSPUseAxios().useGet();
	const ghgBasedOption = [
		{ label: 'market', value: 'market' },
		{ label: 'location', value: 'location' },
	];

	useEffect(() => {
		// get 下面的選項
		fetchGWPOption({
			url: services.dropdowns.replace('{cate}', 'gwp'),
			mapper: resp => resp.data.result,
		}).catch(error => DSPHandleAxiosError({ error, intl }));
	}, []);

	useEffect(() => {
		if (gwpOption) {
			if (!form.getFieldsValue()[type]?.ghgBased && !form.getFieldsValue()[type]?.gwpId) {
				form?.setFieldsValue({
					[type]: {
						gwpId: gwpOption[0],
						ghgBased: ghgBasedOption[0],
					},
				});
			}
		}
	}, [gwpOption]);

	const selectItemsMap = [
		// 基準
		{
			key: [[type], 'ghgBased'],
			title: formatMessage({ id: 'yearComparison.ghgBased' }),
			options: ghgBasedOption,
		},
		// //GWP
		{
			key: [[type], 'gwpId'],
			title: formatMessage({ id: 'yearComparison.gwp.version' }),
			options: gwpOption,
		},
	];
	return { selectItemsMap };
};
