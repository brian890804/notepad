import React from 'react';
import { Button, Tooltip } from '@delta/dsp-ui/lib/antd';
import { UnorderedListOutlined, InfoCircleFilled } from '@delta/dsp-ui/lib/antd/icons';
import { DSPTableActions, DSPTableItem } from '@delta/dsp-ui';
import { getIntl } from '../../../../intl/IntlGlobalProvider';
import clearPageParam from '../../../../utils/clearPageParam';
import tableSchemaMapping from '../../../../utils/tableSchemaMapping';
import { getMissingTimePeriodContent } from '../../../../utils/getDateOverlapContent';

const useEmissionTableSchemas = ({ navigateReplace, handleActions }) => {
	const { formatMessage } = getIntl();

	return [
		// 標準
		{
			title: formatMessage({ id: 'site.setting.emission.scopeFirstLayer' }),
			dataIndex: 'scopeFirstLayer',
			key: 'scopeFirstLayer',
			// sorter: true,
			fixed: 'left',
		},
		// 主類別
		{
			title: formatMessage({ id: 'site.setting.emission.scopeSecondLayer' }),
			weight: 2,
			dataIndex: 'scopeSecondLayer',
			key: 'scopeSecondLayer',
			sorter: true,
			fixed: 'left',
		},
		// 子類別
		{
			title: formatMessage({ id: 'site.setting.emission.scopeName' }),
			weight: 2,
			dataIndex: 'scopeName',
			key: 'scopeName',
			// sorter: true,
			fixed: 'left',
		},
		/** 排放源名稱 */
		{
			title: formatMessage({ id: 'site.setting.emission.name' }),
			weight: 2,
			dataIndex: 'name',
			key: 'name',
			sorter: true,
			fixed: 'left',
			render: (name, record) => DSPTableItem.ClickItem(name, () => handleActions('read', record)),
		},
		/** 標準 */
		// { title: '標準', weight: 3, dataIndex: 'standard', key: 'standard' },
		/** 來源 */
		// {
		// 	title: '來源',
		// 	weight: 2,
		// 	dataIndex: 'source',
		// 	key: 'source',
		// 	render: tag => <DSPTableItem.ArrayTagItem items={tag} />,
		// },
		/** 原燃物料或產品 */
		{
			title: formatMessage({ id: 'site.setting.schema.resource' }),
			weight: 2.5,
			dataIndex: 'resource',
			key: 'resource',
			render: (resource, record) => {
				const { general, location, market } = record.resourceMissingTimePeriod || {};
				return (
					<div className="emission__shema__resource-field">
						{!!(general?.length || location?.length || market?.length) && (
							<Tooltip title={getMissingTimePeriodContent(null, record.resourceMissingTimePeriod)}>
								<InfoCircleFilled className="emission__shema__resource-field__icon" />
							</Tooltip>
						)}
						{DSPTableItem.ClickItem(resource, () => handleActions('resource', record))}
					</div>
				);
			},
		},
		/** 起始日期 */
		{
			title: formatMessage({ id: 'site.setting.schema.startDate' }),
			weight: 1.5,
			dataIndex: 'startDate',
			key: 'startDate',
			render: DSPTableItem.DateItem,
		},
		/** 結束日期 */
		{
			title: formatMessage({ id: 'site.setting.schema.endDate' }),
			weight: 1.5,
			dataIndex: 'endDate',
			key: 'endDate',
			render: DSPTableItem.DateItem,
		},
		/** 應用係數名稱 */
		{
			title: formatMessage({ id: 'site.setting.schema.coefficient.apply' }),
			weight: 2,
			dataIndex: 'factors',
			key: 'factors',
			render: items => DSPTableItem.ArrayTagItem({ items }),
		},
		/** 活動數據數量 */
		{
			title: formatMessage({ id: 'site.setting.schema.count' }),
			weight: 1.2,
			dataIndex: 'activityDataNum',
			key: 'activityDataNum',
		},
		/** 原燃物料單位 */
		{
			title: formatMessage({ id: 'site.setting.schema.resource.unit' }),
			weight: 1.2,
			dataIndex: 'resourceUnit',
			key: 'resourceUnit',
		},
		/** 填寫 */
		{
			title: formatMessage({ id: 'site.setting.schema.write' }),
			width: 60,
			dataIndex: 'createActivity',
			key: 'createActivity',
			fixed: 'right',
			render: (_, { id, name }) => (
				<Button
					type="text"
					size="small"
					icon={<UnorderedListOutlined />}
					onClick={() =>
						navigateReplace(
							{
								dialogType: 'emissionInfo',
								tab: 'emission',
								emissionId: id,
								emissionTab: 'activity',
								name,
								...clearPageParam,
							},
							false
						)
					}
				/>
			),
		},
		/** 功能 */
		{
			title: formatMessage({ id: 'site.setting.schema.action' }),
			width: 60,
			dataIndex: 'privilege',
			key: 'privilege',
			fixed: 'right',
			render: (privilege, record) => (
				<DSPTableActions privilege={{ read: true, edit: true, delete: true }} onClick={key => handleActions(key, record)} />
			),
		},
	].map(tableSchemaMapping);
};

export default useEmissionTableSchemas;
