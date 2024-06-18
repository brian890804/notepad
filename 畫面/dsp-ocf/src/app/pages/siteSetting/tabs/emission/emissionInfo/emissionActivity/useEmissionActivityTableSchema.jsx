import React from 'react';
import { DSPTableActions, DSPTableItem } from '@delta/dsp-ui';
import { getIntl } from '../../../../../../intl/IntlGlobalProvider';
import FileList from './fileList/FileList';
import tableSchemaMapping from '../../../../../../utils/tableSchemaMapping';

const useEmissionActivityTableSchema = ({ handleActions }) => {
	const { formatMessage } = getIntl();
	return [
		/** 活動數據名稱 */
		{
			title: formatMessage({ id: 'site.setting.schema.name' }),
			weight: 2,
			key: 'name',
			dataIndex: 'name',
			render: (name, record) => DSPTableItem.ClickItem(name, () => handleActions('edit', record)),
		},
		/** 數據起始時間 */
		{
			title: formatMessage({ id: 'site.setting.schema.data.startTime' }),
			weight: 1.5,
			key: 'startDate',
			dataIndex: 'startDate',
			render: DSPTableItem.DateItem,
		},
		/** 數據結束時間 */
		{
			title: formatMessage({ id: 'site.setting.schema.data.endTime' }),
			weight: 1.5,
			key: 'endDate',
			dataIndex: 'endDate',
			render: DSPTableItem.DateItem,
		},
		/** 數量 */
		{
			title: formatMessage({ id: 'site.setting.schema.quantity' }),
			weight: 1.2,
			key: 'amount',
			dataIndex: 'amount',
			render: text => text.toLocaleString(), // 顯示千分位
		},
		/** 單位 */
		{
			title: formatMessage({ id: 'site.setting.schema.unit' }),
			key: 'unit',
			dataIndex: 'unit',
		},
		/** 更新時間 */
		{
			title: formatMessage({ id: 'site.setting.schema.updateTime' }),
			weight: 1.6,
			key: 'modifyDate',
			dataIndex: 'modifyDate',
			render: DSPTableItem.TimeItem,
		},
		/** 佐證資料 */
		{
			title: formatMessage({ id: 'site.setting.schema.evidence' }),
			key: 'evidences',
			dataIndex: 'evidences',
			fixed: 'right',
			render: (evidences, record) => FileList(evidences, () => handleActions('edit', record)),
		},
		/** 功能 */
		{
			title: formatMessage({ id: 'site.setting.schema.action' }),
			width: 60,
			dataIndex: 'privilege',
			key: 'privilege',
			fixed: 'right',
			render: (_, record) => <DSPTableActions privilege={{ edit: true, delete: true }} onClick={key => handleActions(key, record)} />,
		},
	].map(tableSchemaMapping);
};

export default useEmissionActivityTableSchema;
