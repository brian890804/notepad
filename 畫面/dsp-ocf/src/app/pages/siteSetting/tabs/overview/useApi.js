import { useCallback, useState } from 'react';
import { DSPHandleAxiosError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { useIntl } from 'react-intl';
import services from '../../../../../config/services';

export default ({ siteId }) => {
	const intl = useIntl();

	const [locationData, setLocationData] = useState();
	const [marketData, setMarketData] = useState();

	const { axiosApi: fetchOverviewLocation, loading: locationLoading } = DSPUseAxios().useGet();
	const { axiosApi: fetchOverviewMarket, loading: marketLoading } = DSPUseAxios().useGet();

	const handleSubmit = useCallback(
		requestData => {
			const { rangeDate, scope, gwp, ghgBased } = requestData || {};
			const startDate = rangeDate?.[0];
			const endDate = rangeDate?.[1];
			const scopeId = scope?.value;
			const gwpId = gwp?.value;
			const params = { startDate, endDate, scopeId, gwpId };

			if (['both', 'location'].includes(ghgBased?.value)) {
				/** 取得 location base 的圖表 */
				fetchOverviewLocation({
					url: services.siteOverview?.replace('{siteId}', siteId),
					config: { params: { ...params, ghgBased: 'location' } },
					mapper: resp => resp?.data?.result,
					onSuccess: setLocationData,
				}).catch(error => {
					DSPHandleAxiosError({ error, intl });
				});
			} else setLocationData();

			if (['both', 'market'].includes(ghgBased?.value)) {
				/** 取得 location base 的圖表 */
				setTimeout(() => {
					// 加一個 timer (後端打太快好像會卡住)
					fetchOverviewMarket({
						url: services.siteOverview?.replace('{siteId}', siteId),
						config: { params: { ...params, ghgBased: 'market' } },
						mapper: resp => resp?.data?.result,
						onSuccess: setMarketData,
					}).catch(error => {
						DSPHandleAxiosError({ error, intl });
					});
				}, 500);
			} else setMarketData();
		},
		[siteId]
	);

	return { handleSubmit, locationLoading, locationData, marketLoading, marketData };
};
