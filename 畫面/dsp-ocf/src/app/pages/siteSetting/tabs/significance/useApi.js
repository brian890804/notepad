import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { DSPHandleAxiosError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import services from '../../../../../config/services';
import { convertFormValueToPayload } from './utils';
import { openNotification } from '../../../../utils/notification';
import { convertFormulaToStr } from './formulaFormModal/utils';

const useApi = ({ siteId, scopeId }) => {
	const { loading: fetchingFormula, axiosApi: fetchFormula, data: formula } = DSPUseAxios().useGet();
	const { loading: fetchingOptions, axiosApi: fetchOptions, data: assessmentOptions } = DSPUseAxios().useGet();
	const { loading: fetching, axiosApi: getEmissionList, data: dataSource } = DSPUseAxios().useGet();
	const { loading: updating, axiosApi: updateEmissionList } = DSPUseAxios().usePut();
	const intl = useIntl();

	const {
		search: { tab, page, size },
	} = DSPUseNavAppendSearch();

	// eslint-disable-next-line no-shadow
	const getTableData = (siteId, scopeId, page, size) => {
		getEmissionList({
			url: services.siteSignfiacanceAssessment?.replace('{siteId}', siteId),
			config: { params: { scopeId, page, size } },
			mapper: resp => resp.data.result,
		}).catch(error => DSPHandleAxiosError({ intl, error }));
	};

	// eslint-disable-next-line no-shadow
	const getFomula = siteId => {
		fetchFormula({
			url: services.siteSignfiacanceAssessmentScore?.replace('{siteId}', siteId),
			mapper: ({ data: { result } }) => {
				if (!result) return {};
				return { formulaStr: convertFormulaToStr(result.formula), threshold: result.threshold };
			},
		});
	};

	useEffect(() => {
		if (tab === 'significance' && scopeId) getTableData(siteId, scopeId, page, size);
	}, [siteId, scopeId, tab, page, size]);

	useEffect(() => {
		getFomula(siteId);
		fetchOptions({
			url: services.siteSignfiacancEvaluationTableOptions?.replace('{siteId}', siteId),
			mapper: resp => resp.data.result,
		}).catch(error => DSPHandleAxiosError({ intl, error }));
	}, []);

	const handleUpdate = data => {
		const payload = convertFormValueToPayload(data);
		console.info(payload);
		updateEmissionList({ url: services.siteSignfiacanceAssessment?.replace('{siteId}', siteId), data: payload })
			.then(() => {
				openNotification('success', intl.formatMessage({ id: 'common.message.update.success' }));
				getTableData(siteId, scopeId);
			})
			.catch(error => DSPHandleAxiosError({ intl, error }));
	};

	// eslint-disable-next-line no-shadow
	const handleRefreshTable = (siteId, scopeId) => {
		getTableData(siteId, scopeId);
		getFomula(siteId);
	};

	return {
		loading: fetching || updating || fetchingOptions || fetchingFormula,
		formula,
		dataSource,
		assessmentOptions,
		handleRefreshTable,
		handleUpdate,
	};
};

export default useApi;
