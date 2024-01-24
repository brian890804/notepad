import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { DSPForm, DSPModal } from '@delta/dsp-ui';
import useFomulaFormModalSchema from './useFormSchema';
import useApi from './useApi';
import { FORMULA_ITEM_TYPE, createFomulaItem } from './utils';

const FormulaFormModal = ({ open, onFinish }) => {
	const [form] = DSPForm.useForm();
	const { loading, handleSubmit } = useApi({ form, open, onFinish });
	const formSchema = useFomulaFormModalSchema();
	const { formatMessage } = useIntl();
	return (
		<DSPModal
			title={formatMessage({ id: 'significance.severity.formula.setting' })}
			open={open}
			onCancel={() => onFinish()}
			onOk={handleSubmit}
			size="large"
		>
			<DSPForm
				{...{
					form,
					formSchema,
					loading,
					layout: 'vertical',
					initialValues: {
						formula: [createFomulaItem(FORMULA_ITEM_TYPE.NUMBER)],
					},
				}}
			/>
		</DSPModal>
	);
};

FormulaFormModal.defaultProps = {
	open: undefined,
	onFinish: undefined,
};

FormulaFormModal.propTypes = {
	open: PropTypes.bool,
	onFinish: PropTypes.func,
};

export default FormulaFormModal;
