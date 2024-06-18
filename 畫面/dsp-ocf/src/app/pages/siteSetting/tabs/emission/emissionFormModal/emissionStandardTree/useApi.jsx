import { DSPHandleAxiosError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { useEffect } from 'react';
import { getIntl } from '../../../../../../intl/IntlGlobalProvider';
import services from '../../../../../../../config/services';

const useApi = () => {
	const { loading: fetchingStandardTree, axiosApi: fetchStandardTree, data: standardTree } = DSPUseAxios().useGet();

	useEffect(() => {
		fetchStandardTree({ url: services.scope, mapper: resp => resp.data?.result }).catch(error => {
			DSPHandleAxiosError({ error, intl: getIntl() });
		});
	}, []);

	return { fetchingStandardTree, standardTree };
};

export default useApi;
