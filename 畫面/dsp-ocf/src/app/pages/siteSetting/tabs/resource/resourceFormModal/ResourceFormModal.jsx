import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { DSPForm, DSPModal } from '@delta/dsp-ui';
import useResourceFormSchema from './useResourceFormSchema';
import useApi from './useApi';
import useFormStatus from '../../../../../utils/useFormStatus';

import './resourceFormModal.scss';

const ResourceFormModal = ({ open, resourceId, siteId, onFinish }) => {
	useFormStatus({ editing: open }); // 用來監聽是否編輯中，若是被重新登入時 不進行頁面刷新
	const [form] = DSPForm.useForm();
	const intl = useIntl();
	const { formatMessage } = intl;
	const [isElectricity, setIsElectricity] = useState(false);
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);
	const isEdit = useMemo(() => !!resourceId, [resourceId]);

	const { loading, isFetchingResource, handleSubmit } = useApi({ form, resourceId, siteId, open, setIsElectricity, onFinish });

	const formSchema = useResourceFormSchema({ form, isEdit, isElectricity });

	return (
		<>
			<DSPModal
				open={open}
				size="large"
				title={formatMessage(
					{ id: 'site.setting.modal.resource.title' },
					{ action: isEdit ? formatMessage({ id: 'common.edit' }) : formatMessage({ id: 'common.add' }) }
				)}
				okButtonProps={{ loading }}
				cancelButtonProps={{ loading }}
				onCancel={() => onFinish()}
				onOk={handleSubmit}
			>
				<DSPForm
					{...{ form, formSchema, loading: isFetchingResource || loading }}
					initialValues={{ isElectricity }}
					layout="vertical"
					onValuesChange={changeValues => {
						if (Object.keys(changeValues).includes('isElectricity')) {
							if (form.getFieldValue('factorTables')) setConfirmModalOpen(true);
							else setIsElectricity(changeValues?.isElectricity);
						}
					}}
				/>
			</DSPModal>

			{/* 電力類型變更時，彈跳視窗確認是否清除係數列表 */}
			{/* 變更電力類型，清除係數列表 (避免非電力類型卻新增 ghgBased，而電力類型卻新增 general) */}
			<DSPModal
				open={confirmModalOpen}
				onOk={() => {
					form.setFieldsValue({ factorTables: undefined });
					setIsElectricity(form.getFieldValue('isElectricity'));
					setConfirmModalOpen(false);
				}}
				onCancel={() => {
					const finalElectricity = !form.getFieldValue('isElectricity');
					setIsElectricity(finalElectricity);
					form.setFieldsValue({ isElectricity: finalElectricity });
					setConfirmModalOpen(false);
				}}
				okButtonProps={{ danger: true }}
				title={formatMessage({ id: 'common.system.message' })}
				okText={formatMessage({ id: 'common.delete' })}
				cancelText={formatMessage({ id: 'common.cancel' })}
			>
				<span>{formatMessage({ id: 'site.setting.resource.isElectricity.change.hint' })}</span>
			</DSPModal>
		</>
	);
};

ResourceFormModal.defaultProps = {
	resourceId: undefined,
	siteId: undefined,
	open: undefined,
	onFinish: () => undefined,
};

ResourceFormModal.propTypes = {
	/** 原燃物料或產品的 Id */
	resourceId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/** 據點的 Id */
	siteId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/** 控制 Modal 開關 */
	open: PropTypes.bool,
	/** 表單提交成功後執行 */
	onFinish: PropTypes.func,
};

export default ResourceFormModal;
