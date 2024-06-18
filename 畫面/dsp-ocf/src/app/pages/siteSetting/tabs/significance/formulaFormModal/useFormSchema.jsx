import React from 'react';
import { useIntl } from 'react-intl';
import { convertFormulaItemsToFormula } from './utils';
import FormulaFormItem from './formulaFormItem/FormulaFormItem';

const useFomulaFormModalSchema = () => {
	const { formatMessage } = useIntl();
	return [
		{
			name: 'formula',
			label: formatMessage({ id: 'significance.severity.formula' }),
			rules: [
				() => ({
					async validator(_, value) {
						try {
							const formulaStr = await convertFormulaItemsToFormula(value);
							eval(`+${formulaStr}`); // eslint-disable-line no-eval
							return Promise.resolve();
						} catch ({ message }) {
							if (message === 'empty') return Promise.reject(new Error('請輸入公式'));
							return Promise.reject(new Error('公式驗證失敗，請檢查公式是否正確'));
						}
					},
				}),
			],
			validateTrigger: 'onSubmit',
			render: () => <FormulaFormItem />,
		},
		{
			name: 'threshold',
			label: formatMessage({ id: 'significance.severity.goal' }),
			type: 'number',
			width: '50%',
			required: true,
		},
	];
};

export default useFomulaFormModalSchema;
