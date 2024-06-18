import React from 'react';
import PropTypes from 'prop-types';
import { DSPModal, DSPForm } from '@delta/dsp-ui';
import { useIntl } from 'react-intl';
import useProjectFormSchema from './useProjectFormSchema';
import useApi from './useApi';
import useFormStatus from '../../../../utils/useFormStatus';

import './projectFormModal.scss';

const ProjectFormModal = ({ exportMode, projectId, open, onFinish, onExport }) => {
	const { formatMessage } = useIntl();
	useFormStatus({ editing: open }); // 用來監聽是否編輯中，若是被重新登入時 不進行頁面刷新
	const [form] = DSPForm.useForm();
	const { loading, handleSubmit } = useApi({ form, open, exportMode, projectId, onFinish, onExport });
	const formSchema = useProjectFormSchema({ form, exportMode, projectId });

	const title = () => {
		if (exportMode) return formatMessage({ id: 'project.schema.export' });
		return formatMessage(
			{ id: 'project.modal.title' },
			{ action: projectId ? formatMessage({ id: 'common.edit' }) : formatMessage({ id: 'common.add' }) }
		);
	};

	return (
		<DSPModal
			className="projectFormModal"
			title={title()}
			size="large"
			open={open}
			okButtonProps={{ loading }}
			cancelButtonProps={{ loading }}
			onCancel={() => onFinish()}
			onOk={handleSubmit}
			okText={formatMessage({ id: exportMode ? 'project.schema.export' : 'common.confirm' })}
		>
			<DSPForm {...{ form, formSchema, loading }} />
		</DSPModal>
	);
};

ProjectFormModal.defaultProps = {
	exportMode: undefined,
	projectId: undefined,
	open: undefined,
	onFinish: () => undefined,
	onExport: () => undefined,
};

ProjectFormModal.propTypes = {
	/** 是否為輸出模式 */
	exportMode: PropTypes.bool,
	/** 專案 id */
	projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/** 是否開啟 modal */
	open: PropTypes.bool,
	/** 建立/編輯完畢 callback */
	onFinish: PropTypes.func,
	/** 匯出 callback */
	onExport: PropTypes.func,
};

export default ProjectFormModal;
