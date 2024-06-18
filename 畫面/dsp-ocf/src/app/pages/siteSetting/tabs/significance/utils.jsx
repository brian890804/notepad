import React from 'react';
import { DSPFormItem } from '@delta/dsp-ui';
import RowFormItem from './rowFormItem/RowFormItem';
import { getIntl } from '../../../../intl/IntlGlobalProvider';

export default {};

export const getIdentifyOptions = () => {
	const { formatMessage } = getIntl();
	return [
		{ label: formatMessage({ id: 'common.true' }), value: true },
		{ label: formatMessage({ id: 'common.false' }), value: false },
	];
};

export const converTableColumns = (columns, options = {}) => {
	if (!columns) return [];
	return columns.map(({ label, name }) => ({
		key: label,
		title: `${label}. ${name}`,
		dataIndex: label,
		weight: 1.5,
		render: (_, record) => (
			<DSPFormItem name={record?.id} render={() => <RowFormItem name={[record?.id, label]} options={options[label] || []} />} />
		),
	}));
};

export const convertTableData = datasource => {
	if (!datasource) return [];
	return datasource.reduce((prev, current) => {
		const { id, name, score, isIdentify, scopeName, evaluations, significanceIdentification } = current || {};
		const identifyOption = getIdentifyOptions().find(i => i.value === isIdentify);
		return { ...prev, [id]: { name, score, scopeName, significanceIdentification, isIdentify: identifyOption, ...evaluations } };
	}, {});
};

export const convertFormValueToPayload = formValue => {
	if (!formValue) return [];
	const { id, name, score, scopeName, isIdentify, significanceIdentification, ...rest } = formValue;
	return { id, name, score, scopeName, isIdentify: isIdentify?.value, significanceIdentification, evaluations: rest };
};
