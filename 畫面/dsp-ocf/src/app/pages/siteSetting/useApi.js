import { useEffect } from 'react';
import { DSPHandleAxiosError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import { useIntl } from 'react-intl';
import services from '../../../config/services';
import storageKey from '../../../config/storageKey';

export default () => {
	const intl = useIntl();
	const { axiosApi: getSites, loading: siteListLoading, data: siteList } = DSPUseAxios().useGet();

	const {
		params: { siteId },
		nav,
		navigateReplace,
	} = DSPUseNavAppendSearch();

	useEffect(() => {
		getSites({
			url: services.siteAll,
			mapper: resp => resp?.data?.result,
			onSuccess: result => {
				const currentSiteIdExist = Number.isInteger(parseInt(siteId, 10));
				if (currentSiteIdExist) return;

				const latestSiteId = localStorage.getItem(storageKey.siteId);
				if (latestSiteId) navigateReplace({ pathname: `/home/site/siteSetting/${latestSiteId}` }, false);
				else nav({ pathname: `/home/site/siteSetting/${result?.[0]?.value}` }, false); // 無上次網址，前往第一個據點
			},
		}).catch(error => DSPHandleAxiosError({ intl, error }));
	}, []);

	return { loading: siteListLoading, siteList };
};
