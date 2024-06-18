import React from 'react';
import { DSPTableActions, DSPTableItem } from '@delta/dsp-ui';
import { getIntl } from '../../../../intl/IntlGlobalProvider';
import tableSchemaMapping from '../../../../utils/tableSchemaMapping';

const useEquipmentTableSchems = ({ handleActions }) => {
	const { formatMessage } = getIntl();

	return [
		/** 設施名稱 */
		{
			title: formatMessage({ id: 'site.setting.schema.equipment.name' }),
			weight: 2,
			dataIndex: 'name',
			key: 'name',
			fixed: 'left',
			render: (name, record) => DSPTableItem.ClickItem(name, () => handleActions('read', record)),
		},

		/** 廠商 */
		{
			title: formatMessage({ id: 'site.setting.schema.manufacturers' }),
			weight: 1.5,
			dataIndex: 'factory',
			key: 'factory',
		},
		/** 型號 */
		{ title: formatMessage({ id: 'site.setting.schema.model' }), weight: 1, dataIndex: 'model', key: 'model' },
		/** 區域 */
		{ title: formatMessage({ id: 'site.setting.schema.region' }), weight: 1, dataIndex: 'area', key: 'area' },
		/** 數量 */
		{
			title: formatMessage({ id: 'site.setting.schema.quantity' }),
			weight: 1,
			dataIndex: 'amount',
			key: 'amount',
		},
		/** 保管者 */
		{
			title: formatMessage({ id: 'site.setting.schema.keeper' }),
			weight: 2,
			dataIndex: 'keeper',
			key: 'keeper',
		},
		/** 設施照片 */
		{
			title: formatMessage({ id: 'site.setting.schema.equipment.photo' }),
			width: 112,
			dataIndex: 'image',
			key: 'image',
			render: base64 => DSPTableItem.Base64Item(base64),
		},
		/** 啟用時間 */
		{
			title: formatMessage({ id: 'site.setting.schema.enabledTime' }),
			weight: 1.6,
			dataIndex: 'activateDate',
			key: 'activateDate',
			render: time => DSPTableItem.TimeItem(time),
		},
		/** 標籤 */
		{
			title: formatMessage({ id: 'site.setting.schema.tag' }),
			weight: 1.5,
			dataIndex: 'tags',
			key: 'tags',
			render: items => DSPTableItem.ArrayTagItem({ items }),
		},
		/** 狀態 */
		// {
		// 	title: formatMessage({ id: 'site.setting.schema.status' }),
		// 	weight: 1,
		// 	dataIndex: 'status',
		// 	key: 'status',
		// 	fixed: 'right',
		// },
		/** 功能 */
		{
			title: formatMessage({ id: 'site.setting.schema.action' }),
			width: 60,
			dataIndex: 'privileges',
			key: 'privileges',
			fixed: 'right',
			render: (_, record) => (
				<DSPTableActions
					privilege={{ read: true, edit: true, delete: true }} // 先全開，未來有權限再掛勾
					onClick={key => handleActions(key, record)}
				/>
			),
		},
	].map(tableSchemaMapping);
};

export default useEquipmentTableSchems;
