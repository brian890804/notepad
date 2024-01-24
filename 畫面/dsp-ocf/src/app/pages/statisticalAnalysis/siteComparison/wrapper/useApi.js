import { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { DSPUseAxios, DSPHandleAxiosError } from '@delta/dsp-ui/lib/utils';
import services from '../../../../../config/services';

const ghgBasedOption = [
	{ label: 'market', value: 'market' },
	{ label: 'location', value: 'location' },
];

const useApi = (form, type) => {
	const intl = useIntl();
	const { formatMessage } = intl;
	const { axiosApi: fetchGHGOption, data: rootScopeOption, loading: ghgOptionLoading } = DSPUseAxios().useGet();
	const { axiosApi: fetchGWPOption, data: gwpOptions, loading: gwpOptionLoading } = DSPUseAxios().useGet();

	const loading = ghgOptionLoading || gwpOptionLoading;

	const selectItemsMap = useMemo(() => {
		const items = [];
		if (type === 'emission') {
			items.push({
				// 規範
				key: [type, 'rootScopeId'],
				title: formatMessage({ id: 'yearComparison.rootScope' }),
				span: 4,
				options: rootScopeOption,
			});
		}

		if (['emission', 'electricity', 'energy'].includes(type)) {
			items.push({
				// 基準
				key: [type, 'ghgBased'],
				title: formatMessage({ id: 'yearComparison.ghgBased' }),
				span: 4,
				options: ghgBasedOption,
			});
		}

		if (type !== 'electricity') {
			items.push({
				// GWP
				key: [type, 'gwpId'],
				title: formatMessage({ id: 'yearComparison.gwp.version' }),
				span: 6,
				options: gwpOptions,
			});
		}

		return items;
	}, [type, rootScopeOption, gwpOptions]);

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
		if (gwpOptions?.length > 0 && rootScopeOption?.length > 0) {
			['emission', 'electricity', 'energy', 'water', 'garbage'].forEach(value =>
				form.setFieldsValue({
					[value]: {
						ghgBased: ghgBasedOption[0],
						gwpId: gwpOptions[0],
						rootScopeId: rootScopeOption[0],
					},
				})
			);
		}
	}, [rootScopeOption, gwpOptions]);

	return { selectItemsMap, loading };
};

export default useApi;
