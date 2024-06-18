import React from 'react';
import { DSPTableActions } from '@delta/dsp-ui';
import { getIntl } from '../../../intl/IntlGlobalProvider';
import tableSchemaMapping from '../../../utils/tableSchemaMapping';

const gwpTableSchema = ({ ghgTypes, handleActions }) => {
	const { formatMessage } = getIntl();

	return [
		/** 分類 */
		// { title: formatMessage({ id: 'factorDB.modal.type' }), key: 'referenceType', dataIndex: 'referenceType', fixed: 'left' },
		/** 係數來源 */
		// {
		// 	title: formatMessage({ id: 'factorDB.modal.reference' }),
		// 	dataIndex: 'reference',
		// 	key: 'reference',
		// 	weight: 1.5,
		// 	fixed: 'left',
		// },
		/** 區域 */
		// { title: formatMessage({ id: 'factorDB.modal.site' }), dataIndex: 'region', key: 'region', fixed: 'left' },
		/** 國家/市場 */
		// {
		// 	title: formatMessage({ id: 'factorDB.modal.country' }),
		// 	dataIndex: 'countryMarket',
		// 	weight: 1.2,
		// 	key: 'countryMarket',
		// 	fixed: 'left',
		// },
		/** 名稱 */
		{ title: formatMessage({ id: 'factorDB.modal.name' }), dataIndex: 'name', key: 'name', weight: 2, fixed: 'left' },
		...(Array.isArray(ghgTypes) ? ghgTypes : []).map(({ label, value }, i) => ({
			title: label,
			dataIndex: `${value}_${label}`,
			key: `${value}_${label}`,
			width: label?.length * 13 > 100 ? label?.length * 13 : 100,
			render: (_, { factors }) => {
				const factor = Array.isArray(factors) ? factors[i]?.factor : undefined;
				return typeof factor === 'number' ? factor : '-';
			},
		})),
		/** 功能 */
		{
			title: formatMessage({ id: 'factorDB.modal.action' }),
			width: 75,
			dataIndex: 'privilege',
			key: 'privilege',
			fixed: 'right',
			render: (privilege, record) => (
				<DSPTableActions privilege={{ edit: true, delete: true }} onClick={key => handleActions(key, record)} />
			),
		},
	].map(tableSchemaMapping);
};

export default gwpTableSchema;
