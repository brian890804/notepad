/* eslint-disable */
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { DSPHandleAxiosError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import services from '../../../../../config/services';

export default form => {
	const {
		search: { type },
	} = DSPUseNavAppendSearch();
	const intl = useIntl();
	const { formatMessage } = useIntl();
	const { axiosApi: fetchGWPOption, data: gwpOption } = DSPUseAxios().useGet();

	useEffect(() => {
		// get 下面的選項
		fetchGWPOption({
			url: services.dropdowns.replace('{cate}', 'gwp'),
			mapper: resp => resp.data.result,
		}).catch(error => DSPHandleAxiosError({ error, intl }));
	}, []);

	useEffect(() => {
		if (gwpOption) {
			if (!form.getFieldsValue()[type]?.gwpId) {
				form?.setFieldsValue({
					[type]: {
						gwpId: gwpOption[0],
					},
				});
			}
		}
	}, [gwpOption]);

	const selectItemsMap = [
		// //GWP
		{
			key: [[type], 'gwpId'],
			title: formatMessage({ id: 'yearComparison.gwp.version' }),
			options: gwpOption,
		},
	];

	return { selectItemsMap };
};
