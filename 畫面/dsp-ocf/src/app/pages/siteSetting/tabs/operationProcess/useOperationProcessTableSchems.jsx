import React from 'react';
import { DSPTableActions, DSPTableItem } from '@delta/dsp-ui';
import { getIntl } from '../../../../intl/IntlGlobalProvider';
import tableSchemaMapping from '../../../../utils/tableSchemaMapping';

const useOperationProcessTableSchems = ({ handleActions }) => {
	const { formatMessage } = getIntl();

	return [
		/** 設施名稱 */
		{
			title: formatMessage({ id: 'site.setting.schema.name' }),
			weight: 2,
			dataIndex: 'name',
			key: 'name',
			fixed: 'left',
			render: (name, record) => DSPTableItem.ClickItem(name, () => handleActions('read', record)),
		},
		/** 描述 */
		{
			title: formatMessage({ id: 'site.setting.schema.description' }),
			weight: 3,
			dataIndex: 'description',
			key: 'description',
		},
		/** 標籤 */
		{
			title: formatMessage({ id: 'site.setting.schema.tag' }),
			weight: 3,
			dataIndex: 'tags',
			key: 'tags',
			render: tag => <DSPTableItem.ArrayTagItem items={tag} />,
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

export default useOperationProcessTableSchems;
