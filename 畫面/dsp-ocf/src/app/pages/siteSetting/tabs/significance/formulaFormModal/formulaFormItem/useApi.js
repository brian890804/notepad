import { useEffect } from 'react';
import { DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import services from '../../../../../../../config/services';

const useApi = () => {
	const { loading: fetchingOptions, axiosApi: fetchOptions, data: options } = DSPUseAxios().useGet();

	const {
		params: { siteId },
	} = DSPUseNavAppendSearch();

	useEffect(() => {
		fetchOptions({ url: services.siteSignfiacancEvaluationTableColumns.replace('{siteId}', siteId), mapper: resp => resp.data.result });
	}, []);

	return { fetchingOptions, options };
};

export default useApi;
