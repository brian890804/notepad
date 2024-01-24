import React from 'react';
import PropTypes from 'prop-types';
import { DSPModal } from '@delta/dsp-ui';
import { useIntl } from 'react-intl';
import EvaluateFormTable from './evaluateFormTable/EvaluateFormTable';
import './evaluateTableModa.scss';

const EvaluateTableModal = ({ open, onCancel, onFinish }) => {
	const { formatMessage } = useIntl();
	return (
		<DSPModal
			className="evaluateTableModal"
			title={formatMessage({ id: 'significance.severity.table' })}
			open={open}
			size="large"
			onCancel={onCancel}
			footer={[]}
		>
			<EvaluateFormTable open={open} onFinish={onFinish} />
		</DSPModal>
	);
};

EvaluateTableModal.defaultProps = {
	open: undefined,
	onFinish: () => undefined,
	onCancel: () => undefined,
};

EvaluateTableModal.propTypes = {
	open: PropTypes.bool,
	onFinish: PropTypes.func,
	onCancel: PropTypes.func,
};

export default EvaluateTableModal;
