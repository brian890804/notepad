import React, { useEffect, useRef, useState } from 'react';
import { DSPLoading, DSPNotFoundPage } from '@delta/dsp-ui';
import { DSPHandleAxiosError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import Overview from './overview/Overview';
import SiteBasicinfo from './basicinfo/SiteBasicinfo';
import Significance from './significance/Significance';
import Equipment from './equipment/Equipment';
import OperationProcess from './operationProcess/OperationProcess';
import Resource from './resource/Resource';
import Emission from './emission/Emission';
import { getIntl } from '../../../intl/IntlGlobalProvider';
import services from '../../../../config/services';
import storageKey from '../../../../config/storageKey';

const useTabsSchema = ({ siteId }) => {
	const intl = getIntl();
	const { formatMessage } = intl;

	const { loading, axiosApi: getSite, data: siteData } = DSPUseAxios().useGet();
	const [siteExist, setSiteExist] = useState();
	const tourRefs = useRef([]);

	useEffect(() => {
		/** 檢測 site 是否為數字 */
		const siteIdIsNumber = Number.isInteger(parseInt(siteId, 10));
		if (siteIdIsNumber) {
			/** 取得據點資料 - 找不到顯示找不到頁面 */
			getSite({ url: `${services.site}/${siteId}`, mapper: resp => resp?.data?.result })
				.then(() => setSiteExist(true))
				.catch(error => {
					setSiteExist(false);
					localStorage.removeItem(storageKey.siteId); // 若找不到據點則清除連結，避免未來再自動前往
					// nav({ pathname: '/404' });
					DSPHandleAxiosError({ error, intl });
				});
		}
	}, [siteId]);

	return [
		// 基本資料
		{
			key: 'basicinfo',
			label: formatMessage({ id: 'site.setting.schema.basicInfo' }),
			children: <SiteBasicinfo siteData={siteData} loading={loading} />,
			tourStep: {
				title: formatMessage({ id: 'site.setting.schema.basicInfo' }),
				description: formatMessage({ id: 'site.setting.tour.basicInfo' }),
			},
		},
		// 顯著性評估
		{
			key: 'significance',
			label: formatMessage({ id: 'site.setting.schema.significance' }),
			children: <Significance siteId={siteId} />,
			tourStep: {
				title: formatMessage({ id: 'site.setting.schema.significance' }),
				description: formatMessage({ id: 'site.setting.tour.significance' }),
			},
		},
		// 排放源
		{
			key: 'emission',
			label: formatMessage({ id: 'site.setting.schema.emission' }),
			children: <Emission siteId={siteId} />,
			tourStep: {
				title: formatMessage({ id: 'site.setting.schema.emission' }),
				description: formatMessage({ id: 'site.setting.tour.emission' }),
			},
		},
		// 設施
		{
			key: 'equipment',
			label: formatMessage({ id: 'site.setting.schema.equipment' }),
			children: <Equipment siteId={siteId} />,
			tourStep: {
				title: formatMessage({ id: 'site.setting.schema.equipment' }),
				description: formatMessage({ id: 'site.setting.tour.equipment' }),
			},
		},
		// 活動
		{
			key: 'operationProcess',
			label: formatMessage({ id: 'site.setting.schema.operation.process' }),
			children: <OperationProcess siteId={siteId} />,
			tourStep: {
				title: formatMessage({ id: 'site.setting.schema.operation.process' }),
				description: formatMessage({ id: 'site.setting.tour.operation.process' }),
			},
		},
		// 原燃物料或產品係數
		{
			key: 'resource',
			label: formatMessage({ id: 'site.setting.schema.resourceCoefficient' }),
			children: <Resource siteId={siteId} />,
			tourStep: {
				title: formatMessage({ id: 'site.setting.schema.resourceCoefficient' }),
				description: formatMessage({ id: 'site.setting.tour.resourceCoefficient' }),
			},
		},
		// 總覽
		{
			key: 'overview',
			label: formatMessage({ id: 'site.setting.schema.overview' }),
			children: <Overview siteId={siteId} />,
			tourStep: {
				title: formatMessage({ id: 'site.setting.schema.overview' }),
				description: formatMessage({ id: 'site.setting.tour.overview' }),
			},
		},
	].map((item, i) => {
		let children;
		if (loading || siteExist === undefined) children = <DSPLoading />;
		else if (siteExist) children = item.children;
		else children = <DSPNotFoundPage />;
		return {
			...item,
			children,
			label: (
				<div
					ref={ref => {
						tourRefs.current[i] = ref;
					}}
				>
					{item?.label}
				</div>
			),
			tourStep: {
				...item?.tourStep,
				prevButtonProps: { children: formatMessage({ id: 'common.previous' }) },
				nextButtonProps: { children: formatMessage({ id: 'common.next' }) },
				target: () => tourRefs.current[i]?.parentNode?.parentNode,
			},
		};
	});
};

export default useTabsSchema;
