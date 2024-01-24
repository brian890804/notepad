import React, { useCallback, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import { DSPForm } from '@delta/dsp-ui';
import { Button, Spin } from '@delta/dsp-ui/lib/antd';
import classNames from 'classnames';
import gwpFormSchema from './gwpFormSchema';
import ReferenceListModal from '../common/referenceListModal/ReferenceListModal';
import useApi from './useApi';

import './gwpEditForm.scss';

const GWPEditForm = () => {
	const { formatMessage } = useIntl();
	const {
		nav,
		params: { gwpId, isImport },
	} = DSPUseNavAppendSearch();
	const [form] = DSPForm.useForm();
	const referenceeSelectRef = useRef();
	const [referenceModalOpen, setReferenceModalOpen] = useState(false);

	const isedit = !!gwpId;
	const goback = useCallback(() => nav('/home/factorDB/GWP'), []);
	const { ghgTypes, handleSubmit, loading } = useApi({ form, gwpId, isedit, goback });

	// 新增/編輯GWP變數
	const title = `${formatMessage({ id: isedit ? 'common.edit' : 'common.add' })} GWP ${formatMessage({
		id: 'factorDB.modal.coefficient',
	})}`;

	return (
		<Spin className="gwpEditForm" spinning={loading}>
			<div className="gwpEditForm__title">{title}</div>
			<DSPForm
				form={form}
				layout="vertical"
				className={classNames({ 'gwpEditForm--single': !isImport })}
				formSchema={gwpFormSchema({ isImport, ghgTypes, referenceeSelectRef, setReferenceModalOpen })}
			/>
			<div className="gwpEditForm__actions">
				<Button loading={loading} onClick={goback}>
					{formatMessage({ id: 'common.cancel' })}
				</Button>
				<Button loading={loading} type="primary" onClick={handleSubmit} style={{ marginLeft: 80 }}>
					{formatMessage({ id: 'common.confirm' })}
				</Button>
			</div>
			<ReferenceListModal
				open={referenceModalOpen}
				onFinish={refresh => {
					setReferenceModalOpen(false);
					if (refresh) referenceeSelectRef?.current?.fetchReference();
				}}
			/>
		</Spin>
	);
};

GWPEditForm.propTypes = {};

export default GWPEditForm;
