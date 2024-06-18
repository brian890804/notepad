import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { DSPForm, DSPModal } from '@delta/dsp-ui';
import useFactorFormSchema from './useFactorFormSchema';
import useApi from './useApi';
import useFormStatus from '../../utils/useFormStatus';

import './factorFormModal.scss';

/**
 * 建立/編輯 係數
 */
const FactorFormModal = ({ factorTables, isElectricity, defaultGhgBased, resourceId, factorId, open, onFinish, onSubmit }) => {
	useFormStatus({ editing: open }); // 用來監聽是否編輯中，若是被重新登入時 不進行頁面刷新

	const intl = useIntl();
	const { formatMessage } = intl;
	const [form] = DSPForm.useForm();

	// API (建立、更新)
	const { loading, handleSubmit, referenceId, setReferenceId, tableFactorTypeId, setTableFactorTypeId } = useApi({
		...{ form, open, factorId, onFinish, factorTables, onSubmit },
	});

	const formSchema = useFactorFormSchema({ factorId, tableFactorTypeId, isElectricity, referenceId });

	useEffect(() => {
		form.setFieldValue('ghgBased', isElectricity ? defaultGhgBased : 'general');
	}, [open, isElectricity, defaultGhgBased]);

	return (
		<DSPModal
			className="factorFormModal"
			open={open}
			title={formatMessage(
				{ id: 'site.setting.modal.coefficient.title' },
				{ action: factorId ? formatMessage({ id: 'common.edit' }) : formatMessage({ id: 'common.add' }) }
			)}
			size="large"
			okButtonProps={{ loading }}
			cancelButtonProps={{ loading }}
			onCancel={() => onFinish()}
			onOk={handleSubmit}
		>
			<DSPForm
				{...{ form, formSchema, loading }}
				layout="vertical"
				initialValues={{ resourceId }}
				onValuesChange={data => {
					// if (Object.keys(data).includes('source')) setSourceId(data.source?.value);
					if (Object.keys(data).includes('table')) {
						// 切換係數
						if (Object.keys(data.table).includes('factorType')) setTableFactorTypeId(data.table?.factorType?.value);
						// 切換係數來源 (清除係數、單位、係數表)
						if (Object.keys(data.table).includes('reference')) {
							setReferenceId(data.table?.reference?.value);
							setTableFactorTypeId();
							form.setFieldValue(['table', 'factorType'], undefined);
							form.setFieldValue(['table', 'factors'], undefined);
							form.setFieldValue(['table', 'unit'], undefined);
						}
					}
				}}
			/>
		</DSPModal>
	);
};

FactorFormModal.defaultProps = {
	factorTables: undefined,
	isElectricity: undefined,
	defaultGhgBased: undefined,
	resourceId: undefined,
	factorId: undefined,
	open: undefined,
	onFinish: () => undefined,
	onSubmit: undefined,
};

FactorFormModal.propTypes = {
	/** 是否是電力類型的原燃物料或產品 */
	isElectricity: PropTypes.bool,
	/** 關聯係數列表 */
	factorTables: PropTypes.arrayOf(PropTypes.object),
	/** 預設的電力類型 */
	defaultGhgBased: PropTypes.string,
	/** 原燃物料或產品 id */
	resourceId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/** 編輯的係數 id */
	factorId: PropTypes.number,
	/** Modal 是否開啟 */
	open: PropTypes.bool,
	/** 表單提交成功時觸發 */
	onFinish: PropTypes.func,
	/** 自訂 submit 事件 */
	onSubmit: PropTypes.func,
};

export default FactorFormModal;
