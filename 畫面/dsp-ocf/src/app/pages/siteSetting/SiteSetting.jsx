import React, { useMemo } from 'react';
import { Tabs } from '@delta/dsp-ui/lib/antd';
import { DSPDialogPage } from '@delta/dsp-ui';
import { DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import useTabsSchema from './tabs/useTabsSchema';
import useDialog from './useDialog';
import SiteBreadcrumb from './siteBreadcrumb/SiteBreadcrumb';
import useApi from './useApi';

import './siteSetting.scss';

const SiteSetting = () => {
	const {
		params: { siteId },
		search: { dialogType, tab },
		navigateReplace,
	} = DSPUseNavAppendSearch();

	const dialog = useDialog();

	/** 取得據點清單，並前往第一個據點 */
	const { siteList, loading } = useApi();

	/** 分頁清單，內含檢測據點是否存在 */
	const tabItems = useTabsSchema({ siteId });
	const tabs = useMemo(() => tabItems?.map(({ key }) => key), [tabItems]);

	return (
		<div className="siteSetting">
			{/* 據點麵包屑、導覽 Tour */}
			<SiteBreadcrumb {...{ tabItems, siteList, loading }} />

			{/* Tabs 分頁 [基本資訊、顯著性評估、排放源、設備、活動、原燃物料或產品係數、總覽 等等] */}
			<DSPDialogPage className="siteSetting__dialogPage" open={!!dialogType} dialog={dialog || <></>}>
				{/* 組織設定的七大分類 */}
				<Tabs
					animated
					className="siteSetting__tabs"
					items={tabItems}
					activeKey={tabs?.includes(tab) ? tab : tabs?.[0]}
					onChange={value => navigateReplace({ tab: value, keyword: undefined, page: undefined, size: undefined }, false)}
				/>
			</DSPDialogPage>
		</div>
	);
};

SiteSetting.propTypes = {};

export default SiteSetting;
