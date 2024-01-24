import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { DSPForm, DSPModal } from '@delta/dsp-ui';
import { equipmentFormSchema } from './equipmentFormSchema';
import useApi from './useApi';
import useFormStatus from '../../../../../utils/useFormStatus';

import './equipmentFormModal.scss';

const EquipmentFormModal = ({ open, siteId, equipmentId, onFinish }) => {
	useFormStatus({ editing: open }); // 用來監聽是否編輯中，若是被重新登入時 不進行頁面刷新
	const { formatMessage } = useIntl();

	const [form] = DSPForm.useForm();

	const { loading, handleSubmit } = useApi({ form, open, siteId, equipmentId, onFinish });
	const formSchema = equipmentFormSchema();

	return (
		<DSPModal
			open={open}
			className="equipmentFormModal"
			title={formatMessage(
				{ id: 'site.setting.modal.equipment.title' },
				{ action: equipmentId ? formatMessage({ id: 'common.edit' }) : formatMessage({ id: 'common.add' }) }
			)}
			size="large"
			okButtonProps={{ loading }}
			cancelButtonProps={{ loading }}
			onCancel={() => onFinish()}
			onOk={handleSubmit}
		>
			<DSPForm {...{ form, formSchema, loading }} />
		</DSPModal>
	);
};

EquipmentFormModal.defaultProps = {
	equipmentId: undefined,
	open: undefined,
	onFinish: () => undefined,
};

EquipmentFormModal.propTypes = {
	/** 據點 id */
	siteId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	/** 設備 id */
	equipmentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/** 是否開啟 modal */
	open: PropTypes.bool,
	/** 建立/編輯完畢 callback */
	onFinish: PropTypes.func,
};

export default EquipmentFormModal;
