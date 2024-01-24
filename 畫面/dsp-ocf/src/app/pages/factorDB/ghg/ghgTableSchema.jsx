import React from 'react';
import { DSPTableActions } from '@delta/dsp-ui';
import { getIntl } from '../../../intl/IntlGlobalProvider';
import tableSchemaMapping from '../../../utils/tableSchemaMapping';

import './ghgTableSchema.scss';

const factorTypes = ['CO2', 'CH4', 'N2O', 'HFCs', 'PFCs', 'SF6', 'NF3'];
const renderFactor = ({ factorName, factors, i }) => {
	if (factorName !== factors?.[i]?.ghg?.label && factors?.[i]?.ghg) {
		return (
			<div className="ghgTableSchema__field">
				<div>{typeof factors?.[i]?.factor === 'number' ? factors?.[i]?.factor : '-'}</div>
				<div className="ghgTableSchema__field__norm">{factors?.[i]?.ghg?.label}</div>
			</div>
		);
	}

	return <div>{typeof factors?.[i]?.factor === 'number' ? factors?.[i]?.factor : '-'}</div>;
};

const ghgTableSchema = ({ handleActions }) => {
	const { formatMessage } = getIntl();

	return [
		/** 分類 */
		// { title: formatMessage({ id: 'factorDB.modal.type' }), key: 'referenceType', dataIndex: 'referenceType', fixed: 'left' },
		/** 區域 */
		// { title: formatMessage({ id: 'factorDB.modal.site' }), dataIndex: 'region', key: 'region', fixed: 'left' },
		/** 國家/市場 */
		// {
		// 	title: formatMessage({ id: 'factorDB.modal.country' }),
		// 	dataIndex: 'countryMarket',
		// 	key: 'countryMarket',
		// 	weight: 1.2,
		// 	fixed: 'left',
		// },
		/** 係數名稱 */
		{
			title: formatMessage({ id: 'factorDB.modal.coefficientSourceName' }),
			dataIndex: 'name',
			key: 'name',
			sorter: true,
			weight: 2,
			fixed: 'left',
		},
		...factorTypes.map((factorName, i) => ({
			title: factorName,
			dataIndex: factorName,
			key: factorName,
			weight: 1.2,
			render: (_, { factors }) => renderFactor({ factorName, factors, i }),
		})),
		/** 係數來源 */
		{
			title: formatMessage({ id: 'factorDB.modal.reference' }),
			dataIndex: 'reference',
			key: 'reference',
			sorter: true,
			weight: 2,
			fixed: 'right',
		},
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

export default ghgTableSchema;
