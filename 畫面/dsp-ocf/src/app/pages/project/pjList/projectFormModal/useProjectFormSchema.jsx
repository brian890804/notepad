import React from 'react';
import { useIntl } from 'react-intl';
import services from '../../../../../config/services';
import RegionSiteCompanyTreeSelect from '../../../../components/regionSiteCompanyTreeSelect/RegionSiteCompanyTreeSelect';
import SiteCompanySelect from '../../../../components/siteCompanySelect/SiteCompanySelect';

const region = true;

const useProjectFormSchema = ({ /* form */ exportMode, projectId }) => {
	const { formatMessage } = useIntl();

	return [
		// 專案名稱
		{
			name: 'name',
			disabled: exportMode,
			label: formatMessage({ id: 'project.schema.name' }),
			required: true,
			type: 'input',
		},
		{
			name: 'coverageSites',
			label: formatMessage({ id: 'project.schema.scope' }),
			required: true,
			disabled: exportMode,
			render: () => {
				const placeholder = formatMessage({ id: 'common.placeholder' }, { text: formatMessage({ id: 'project.schema.scope' }) });
				return region ? <RegionSiteCompanyTreeSelect placeholder={placeholder} /> : <SiteCompanySelect placeholder={placeholder} />;
			},
		},
		{
			// GWP版本
			name: 'gwp',
			label: formatMessage({ id: 'project.schema.gwp.version' }),
			required: exportMode,
			type: 'apiSelect',
			url: services.dropdowns.replace('{cate}', 'gwp'),
		},
		{
			// 統計起訖日期
			name: 'calculateRange',
			disabled: exportMode,
			label: formatMessage({ id: 'project.schema.statistics.interval' }),
			required: true,
			type: 'rangePicker',
		},
		projectId && {
			// 專案建立者
			name: 'creator',
			label: formatMessage({ id: 'common.creator' }),
			type: 'viewItem',
		},
		projectId && {
			// 專案建立時間
			name: 'createDate',
			label: formatMessage({ id: 'common.createDate' }),
			type: 'viewItemTime',
		},
		projectId && {
			// 專案修改時間
			name: 'modifyDate',
			label: formatMessage({ id: 'common.modifyDate' }),
			type: 'viewItemTime',
		},
	].filter(i => i);
};

export default useProjectFormSchema;
