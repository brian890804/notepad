import React from 'react';
import { Button } from '@delta/dsp-ui/lib/antd';
import { useIntl } from 'react-intl';
import { ExceptionOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { DSPTableActions, DSPTableItem } from '@delta/dsp-ui';
import SiteTag from '../../../components/siteTag/SiteTag';
import tableSchemaMapping from '../../../utils/tableSchemaMapping';

const useProjectTableSchema = ({ handleActions }) => {
	const { formatMessage } = useIntl();

	return [
		{ title: formatMessage({ id: 'project.schema.name' }), dataIndex: 'name', key: 'name', fixed: 'left', weight: 2 },
		// { title: '類型', dataIndex: 'type', key: 'type' },
		{
			// 涵蓋範圍
			title: formatMessage({ id: 'project.schema.scope' }),
			dataIndex: 'coverageSites',
			key: 'coverageSites',
			weight: 3,
			render: tags => (
				<div className="pjList__siteTags">
					{tags?.map(item => {
						const { value, label, companies, progress } = item || {};
						return (
							<SiteTag key={value} title={label} {...{ companies, progress }}>
								{`${item?.label} ${item?.companies?.length > 0 ? `(${item?.companies?.length})` : ''}`}
							</SiteTag>
						);
					})}
				</div>
			),
		},
		{
			// GWP 版本
			title: formatMessage({ id: 'project.schema.gwp.version' }),
			dataIndex: 'gwp',
			key: 'gwp',
			weight: 2,
			render: DSPTableItem.StringItem,
		},
		{
			// 統計進度
			title: formatMessage({ id: 'project.schema.progress' }),
			dataIndex: 'progress',
			key: 'progress',
			render: DSPTableItem.ProgressItem,
			weight: 1.5,
		},
		{
			// 統計起始日期
			title: formatMessage({ id: 'project.schema.statistics.startDate' }),
			dataIndex: 'startDate',
			key: 'startDate',
			render: DSPTableItem.DateItem,
			weight: 1.5,
		},
		{
			// 統計結束日期
			title: formatMessage({ id: 'project.schema.statistics.endDate' }),
			dataIndex: 'endDate',
			key: 'endDate',
			render: DSPTableItem.DateItem,
			weight: 1.5,
		},

		{
			// 建立者
			title: formatMessage({ id: 'common.creator' }),
			dataIndex: 'creator',
			key: 'creator',
			weight: 2,
		},
		{
			// 建立時間
			title: formatMessage({ id: 'common.createDate' }),
			dataIndex: 'createDate',
			key: 'createDate',
			render: DSPTableItem.DateItem,
			weight: 1.5,
		},
		{
			// 修改時間
			title: formatMessage({ id: 'common.modifyDate' }),
			dataIndex: 'modifyDate',
			key: 'modifyDate',
			render: DSPTableItem.DateItem,
			weight: 1.5,
		},
		{
			// 匯出清冊
			title: formatMessage({ id: 'project.schema.export' }),
			dataIndex: 'export',
			fixed: 'right',
			align: 'center',
			weight: 1,
			render: (_, record) => (
				<Button icon={<ExceptionOutlined />} type="text" size="small" onClick={() => handleActions('export', record)} />
			),
		},
		{
			// 動作
			title: formatMessage({ id: 'account.member.schema.action' }),
			dataIndex: 'action',
			fixed: 'right',
			align: 'center',
			weight: 1,
			render: (_, record) => <DSPTableActions privilege={{ edit: true, delete: true }} onClick={key => handleActions(key, record)} />,
		},
	].map(tableSchemaMapping);
};

export default useProjectTableSchema;
