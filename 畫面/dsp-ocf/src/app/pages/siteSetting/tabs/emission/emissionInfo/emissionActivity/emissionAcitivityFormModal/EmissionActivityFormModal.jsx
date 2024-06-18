import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DSPForm, DSPModal } from '@delta/dsp-ui';
import useActivityFormSchema from './useEmissionActivityFormSchema';
import useApi from './useApi';
import { getIntl } from '../../../../../../../intl/IntlGlobalProvider';
import useFormStatus from '../../../../../../../utils/useFormStatus';

import './emissionActivityFormModal.scss';

const EmissionActivityFormModal = ({ emissionId, emissionData, activityId, open, onFinish }) => {
	useFormStatus({ editing: open }); // 用來監聽是否編輯中，若是被重新登入時 不進行頁面刷新
	const [form] = DSPForm.useForm();
	const { formatMessage } = getIntl();
	const [uploading, setUploading] = useState();
	const [formValues, setFormValues] = useState();
	const { loading, handleSubmit } = useApi({ form, emissionId, emissionData, activityId, open, setFormValues, onFinish });
	const formSchema = useActivityFormSchema({ formValues, emissionData });

	const onCancel = () => {
		onFinish();
		setUploading();
	};

	const { resourceUnit } = emissionData || {};
	useEffect(() => {
		if (open) {
			/** 開啟 modal 時，還原設定 */
			const defaultFormValues = { resourceUnit, unit: resourceUnit, calcMethod: 'filling' };
			form?.setFieldsValue(defaultFormValues);
			setFormValues(defaultFormValues);
		} else {
			form?.resetFields();
		}
	}, [activityId, resourceUnit, open]);

	return (
		<DSPModal
			open={open}
			title={
				<>
					{/* 新增/編輯活動數據 */}
					{formatMessage(
						{ id: 'site.setting.modal.emission.activity.title' },
						{ action: activityId ? formatMessage({ id: 'common.edit' }) : formatMessage({ id: 'common.add' }) }
					)}
					{/* 排放源 */}
					{emissionData?.name && (
						<div className="emissionActivityFormModal__title">
							{`${formatMessage({ id: 'site.list.schema.emissionSource' })}: ${emissionData?.name}`}
						</div>
					)}
				</>
			}
			size="medium"
			className="emissionActivityFormModal"
			closable={!uploading}
			onCancel={onCancel}
			onOk={handleSubmit}
		>
			<DSPForm
				{...{ form, loading, formSchema }}
				initialValues={{ calcMethod: 'filling' }}
				layout="vertical"
				onValuesChange={(changedValues, values) => {
					if (Object.keys(changedValues)?.includes('evidences')) setUploading(changedValues?.evidences === 'uploading');
					setFormValues(values);
				}}
			/>
		</DSPModal>
	);
};

EmissionActivityFormModal.defaultProps = {
	emissionId: undefined,
	emissionData: undefined,
	activityId: undefined,
	open: undefined,
	onFinish: undefined,
};

EmissionActivityFormModal.propTypes = {
	/** 排放源id */
	emissionId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/** 排放源資料 */
	emissionData: PropTypes.objectOf(PropTypes.any),
	/** 活動數據id */
	activityId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/** 是否開啟 Modal */
	open: PropTypes.bool,
	/** Modal 動作完成 callback */
	onFinish: PropTypes.func,
};

export default EmissionActivityFormModal;
