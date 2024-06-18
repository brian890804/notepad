import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { DSPForm, DSPModal } from '@delta/dsp-ui';
import useEmissionFormShema from './useEmissionFormSchema';
import FactorTablesModal from './factorTablesModal/FactorTablesModal';
import useApi from './useApi';
import { getIntl } from '../../../../../intl/IntlGlobalProvider';
import useFormStatus from '../../../../../utils/useFormStatus';
import EmissionTagListModal from './emissionTagListModal/EmissionTagListModal';

import './emissionFormModal.scss';

const EmissionFormModal = ({ open, setOpen, emissionId, siteId, onFinish }) => {
	useFormStatus({ editing: open }); // 用來監聽是否編輯中，若是被重新登入時 不進行頁面刷新
	const [openFactorTablesModal, setOpenFactorTablesModal] = useState(false);
	const [scopeId, setScopeId] = useState();
	const [changeScopeByUser, setChangeScopeByUser] = useState(false);
	const [form] = DSPForm.useForm();
	const { formatMessage } = getIntl();
	const { loading, handleSubmit } = useApi({ form, open, setOpen, emissionId, siteId, onFinish, setScopeId });
	const sourceType = DSPForm.useWatch('sourceType', form); // 監聽來源(活動 or 設施)
	const resource = DSPForm.useWatch('resource', form); // 監聽原燃物料或產品

	/** 排放標籤 */
	const tagSelectRef = useRef();
	const [tagModalOpen, setTagModalOpen] = useState(false);

	const formSchema = useEmissionFormShema({
		...{ form, sourceType, resource, siteId, emissionId, scopeId, changeScopeByUser },
		...{ tagSelectRef, setTagModalOpen, setOpenFactorTablesModal },
	});

	return (
		<DSPModal
			open={open}
			title={formatMessage(
				{ id: 'site.setting.modal.emission.title' },
				{ action: emissionId ? formatMessage({ id: 'common.edit' }) : formatMessage({ id: 'common.add' }) }
			)}
			size="large"
			okButtonProps={{ loading }}
			cancelButtonProps={{ loading }}
			onCancel={() => setOpen()}
			onOk={handleSubmit}
		>
			<DSPForm
				{...{ form, formSchema, loading }}
				layout="vertical"
				onValuesChange={(changedValues, values) => {
					const keys = Object.keys(changedValues);
					if (keys?.includes('scopeId')) {
						setChangeScopeByUser(true);
						setScopeId(preScopeId => {
							// 若標準切換 2.1 或是 由 2.1 切換至其他時，清除 "原然物料或產品"
							if (preScopeId === 41 || changedValues?.scopeId === 41) form.setFieldsValue({ resource: undefined });
							return changedValues?.scopeId;
						});
					}
					if (keys?.includes('sourceType')) form.setFieldsValue({ emissionSources: undefined }); // 來源類型變動時，清除已選擇的來源

					/** 若名稱未填寫，勾選來源及原燃物料或產品後，自動帶入 */
					if (keys?.includes('emissionSources') || keys?.includes('resource')) {
						const { name, emissionSources } = values || {};
						if (!name && emissionSources?.[0]?.label && resource?.label)
							form.setFieldValue('name', `${emissionSources[0].label}(${resource.label})`);
					}
				}}
			/>
			{/* 係數表視窗 */}
			<FactorTablesModal open={openFactorTablesModal} setOpen={setOpenFactorTablesModal} resourceId={resource?.value} />
			{/* 標籤視窗 */}
			<EmissionTagListModal
				open={tagModalOpen}
				onFinish={refresh => {
					setTagModalOpen(false);
					if (refresh) tagSelectRef?.current?.fetchEmissionTags();
				}}
			/>
		</DSPModal>
	);
};

EmissionFormModal.defaultProps = {
	open: undefined,
	siteId: undefined,
	emissionId: undefined,
	setOpen: () => undefined,
	onFinish: () => undefined,
};

EmissionFormModal.propTypes = {
	siteId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	emissionId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	open: PropTypes.bool,
	setOpen: PropTypes.func,
	onFinish: PropTypes.func,
};

export default EmissionFormModal;
