import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { DSPForm, DSPModal } from '@delta/dsp-ui';
import { operationProcessFormSchema } from './operationProcessFormSchema';
import useApi from './useApi';
import useFormStatus from '../../../../../utils/useFormStatus';

import './operationProcessFormModal.scss';

const OperationProcessFormModal = ({ open, siteId, OPId, onFinish }) => {
	useFormStatus({ editing: open }); // 用來監聽是否編輯中，若是被重新登入時 不進行頁面刷新
	const { formatMessage } = useIntl();

	const [form] = DSPForm.useForm();

	const { loading, handleSubmit } = useApi({ form, open, siteId, OPId, onFinish });
	const formSchema = operationProcessFormSchema();

	return (
		<DSPModal
			open={open}
			className="operationProcessFormModal"
			title={formatMessage(
				{ id: 'site.setting.modal.operation.process.title' },
				{ action: OPId ? formatMessage({ id: 'common.edit' }) : formatMessage({ id: 'common.add' }) }
			)}
			okButtonProps={{ loading }}
			cancelButtonProps={{ loading }}
			onCancel={() => onFinish()}
			onOk={handleSubmit}
		>
			<DSPForm {...{ form, formSchema, loading }} />
		</DSPModal>
	);
};

OperationProcessFormModal.defaultProps = {
	OPId: undefined,
	open: undefined,
	onFinish: () => undefined,
};

OperationProcessFormModal.propTypes = {
	siteId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	OPId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	open: PropTypes.bool,
	onFinish: PropTypes.func,
};

export default OperationProcessFormModal;
