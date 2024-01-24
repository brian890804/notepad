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
	const { axiosApi: fetchGHGOption, data: rootScopeOption } = DSPUseAxios().useGet();
	const { axiosApi: fetchGWPOption, data: gwpOption } = DSPUseAxios().useGet();

	const ghgBasedOption = [
		{ label: 'market', value: 'market' },
		{ label: 'location', value: 'location' },
	];

	useEffect(() => {
		// get 下面的選項
		fetchGHGOption({
			url: services.dropdowns.replace('{cate}', 'scope'),
			mapper: resp => resp.data.result,
		}).catch(error => DSPHandleAxiosError({ error, intl }));

		fetchGWPOption({
			url: services.dropdowns.replace('{cate}', 'gwp'),
			mapper: resp => resp.data.result,
		}).catch(error => DSPHandleAxiosError({ error, intl }));
	}, []);

	useEffect(() => {
		if (gwpOption && rootScopeOption) {
			if (!form.getFieldsValue()[type]?.gwpId && !form.getFieldsValue()[type]?.rootScopeOption) {
				form?.setFieldsValue({
					[type]: {
						gwpId: gwpOption[0],
						ghgBased: ghgBasedOption[0],
						rootScopeId: rootScopeOption[0],
					},
				});
			}
		}
	}, [gwpOption, rootScopeOption]);

	const selectItemsMap = [
		//規範
		{
			key: [[type], 'rootScopeId'],
			title: formatMessage({ id: 'yearComparison.rootScope' }),
			options: rootScopeOption,
		},
		//基準
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
