import React, { lazy, useMemo } from 'react';
import { DSPSuspenseOutlet } from '@delta/dsp-ui';
import { Navigate, useLocation } from 'react-router-dom';
import {
	// FileProtectOutlined,
	FundProjectionScreenOutlined,
	HomeOutlined,
	PartitionOutlined,
	PieChartOutlined,
	// ScheduleOutlined,
	SettingOutlined,
	UserOutlined,
} from '@delta/dsp-ui/lib/antd/icons';
import getNodesByPath from '../utils/getNodesByPath';
import I18nTable from './settings/i18nTable/I18nTable';
import webConfig from '../../config/base';
import { getIntl } from '../intl/IntlGlobalProvider';
import YearComparison from './statisticalAnalysis/yearComparison/YearComparison';
import SiteComparison from './statisticalAnalysis/siteComparison/SiteComparison';

const Welcome = lazy(() => import('./welcome/Welcome'));
const Member = lazy(() => import('@delta/dsp-ui').then(module => ({ default: module.DSPMemberPage })));
const Role = lazy(() => import('@delta/dsp-ui').then(module => ({ default: module.DSPRolePage })));
const CompanyList = lazy(() => import('@delta/dsp-ui').then(module => ({ default: module.DSPCompanyListPage })));
const SiteList = lazy(() => import('@delta/dsp-ui').then(module => ({ default: module.DSPSiteListPage })));
const SiteSetting = lazy(() => import('./siteSetting/SiteSetting'));
const PjList = lazy(() => import('./project/pjList/PjList'));
const GHGList = lazy(() => import('./factorDB/ghg/GHGList'));
const GWPList = lazy(() => import('./factorDB/gwp/GWPList'));
const GHGEditForm = lazy(() => import('./form/ghg/GHGEditForm'));
const GWPEditForm = lazy(() => import('./form/gwp/GWPEditForm'));

export const homeRoutes = () => {
	const { formatMessage } = getIntl();

	return [
		{ key: 'welcome', element: <Welcome /> },
		// 帳號管理
		{
			key: 'account',
			// icon: <DSPIcon.Account />,
			icon: <UserOutlined />,
			element: <DSPSuspenseOutlet />,
			label: formatMessage({ id: 'sidebar.account' }),
			children: [
				// 人員管理
				{
					key: 'member',
					label: formatMessage({ id: 'sidebar.account.member' }),
					element: <Member domain={webConfig.domain} />,
				},
				// 角色管理
				{
					key: 'role',
					label: formatMessage({ id: 'sidebar.account.role' }),
					element: <Role domain={webConfig.domain} />,
				},
				{ key: '', element: <Navigate to="member" /> }, // 導向第一頁
			],
		},
		// 據點管理
		{
			key: 'site',
			// icon: <DSPIcon.Site />,
			icon: <HomeOutlined />,
			element: <DSPSuspenseOutlet />,
			label: formatMessage({ id: 'sidebar.site' }),
			children: [
				// 據點清單
				{
					key: 'siteList',
					label: formatMessage({ id: 'sidebar.site.list' }),
					element: (
						<SiteList
							domain={webConfig.domain}
							carbonActivityButtons={[
								// 管理排放源
								{
									label: formatMessage({ id: 'site.list.carbonActivity.button.emissionSource' }),
									onClick: ({ navigate, siteId }) => navigate(`/home/site/siteSetting/${siteId}?tab=emission`),
								},
								// 輸入資料
								// {
								// 	label: formatMessage({ id: 'site.list.carbonActivity.button.enterDate' }),
								// 	onClick: ({ siteId }) => navigate(`/home/site/siteSetting/${siteId}?tab=emission`),
								// },
							]}
						/>
					),
				},
				// TODO 考慮將 tab 也列為 router 管理
				{
					key: 'siteSetting/:siteId?',
					label: formatMessage({ id: 'sidebar.site.setting' }),
					element: <SiteSetting />,
				},
				{ key: '', element: <Navigate to="siteList" /> }, // 導向第一頁
			],
		},
		// 公司管理
		{
			key: 'company',
			// icon: <DSPIcon.Corporate />,
			icon: <PartitionOutlined />,
			element: <DSPSuspenseOutlet />,
			label: formatMessage({ id: 'sidebar.company' }),
			children: [
				// 公司清單
				{
					key: 'companyList',
					label: formatMessage({ id: 'sidebar.company.list' }),
					element: <CompanyList domain={webConfig.domain} />,
				},
				{ key: '', element: <Navigate to="companyList" /> }, // 導向第一頁
			],
		},
		{
			// 專案管理
			key: 'project',
			// icon: <DSPIcon.Project />,
			icon: <FundProjectionScreenOutlined />,
			element: <DSPSuspenseOutlet />,
			label: formatMessage({ id: 'sidebar.project' }),
			children: [
				// 專案清單
				{
					key: 'pjList',
					label: formatMessage({ id: 'sidebar.project.list' }),
					element: <PjList />,
				},
				// { key: 'pjChecklist', label: '產生盤查清冊' },
				{ key: '', element: <Navigate to="pjList" /> }, // 導向第一頁
			],
		},

		// // 簽核管理
		// {
		// 	key: 'sign',
		// 	// icon: <DSPIcon.Sign />,
		// 	icon: <FileProtectOutlined />,
		// 	label: formatMessage({ id: 'sidebar.sign' }),
		// 	disabled: true,
		// },
		// // 稽核管理
		// {
		// 	key: 'audit',
		// 	// icon: <DSPIcon.Audit />,
		// 	icon: <ScheduleOutlined />,
		// 	label: formatMessage({ id: 'sidebar.audit' }),
		// 	disabled: true,
		// },

		// 統計分析
		{
			key: 'statistical',
			icon: <PieChartOutlined />,
			element: <DSPSuspenseOutlet />,
			label: formatMessage({ id: 'sidebar.statistical' }),
			// disabled: true,
			children: [
				// 年度比較
				{ key: 'yearComparison', label: formatMessage({ id: 'sidebar.statistical.yearComparison' }), element: <YearComparison /> },
				// 據點比較
				{ key: 'siteComparison', label: formatMessage({ id: 'sidebar.statistical.siteComparison' }), element: <SiteComparison /> },
			],
		},
		{
			key: 'factorDB',
			icon: <SettingOutlined />,
			element: <DSPSuspenseOutlet />,
			label: formatMessage({ id: 'sidebar.factorDB' }),
			children: [
				{
					key: 'GHG',
					label: formatMessage({ id: 'sidebar.factorDB.GHG' }),
					element: <GHGList />,
				},
				{
					key: 'GWP',
					label: formatMessage({ id: 'sidebar.factorDB.GWP' }),
					element: <GWPList />,
				},
			],
		},
		{
			key: 'system',
			// icon: <DSPIcon.Setting />,
			icon: <SettingOutlined />,
			element: <DSPSuspenseOutlet />,
			label: formatMessage({ id: 'sidebar.system' }),
			children: [
				{
					key: 'i18n',
					label: formatMessage({ id: 'sidebar.system.i18n' }),
					element: <I18nTable />,
				},
			],
		},
		// 表單頁面(在menu中隱藏)
		{
			key: 'form',
			element: <DSPSuspenseOutlet />,
			children: [
				{ key: 'ghg/:ghgId?', element: <GHGEditForm /> },
				{ key: 'gwp/:gwpId?', element: <GWPEditForm /> },
			],
		},
	];
};

export const useGetPathNodes = (basename = 'home') => {
	const { pathname } = useLocation();
	let pathnames = pathname?.split('/')?.filter(path => path);

	/** 因 siteSetting 頁面使用 tabs 切頁，故 pathnames 強制更換，讓 sidebar 及麵包屑正常 */
	if (pathnames?.includes('siteSetting')) pathnames = ['home', 'site', 'siteSetting/:siteId?'];

	const paths = useMemo(
		() => getNodesByPath({ key: basename, children: homeRoutes() }, pathnames).filter(({ key }) => key !== basename),
		[pathname]
	);
	return paths;
};
