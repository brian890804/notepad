import React, { useState, useRef, useCallback } from 'react';
// import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button, Spin } from '@delta/dsp-ui/lib/antd';
import { DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import { DSPForm } from '@delta/dsp-ui';
import classNames from 'classnames';
import ghgFormSchema from './ghgFormSchema';
import ReferenceListModal from '../common/referenceListModal/ReferenceListModal';
import useApi from './useApi';

import './ghgEditForm.scss';

const GHGEditForm = () => {
	const { formatMessage } = useIntl();
	const {
		nav,
		params: { ghgId, isImport },
	} = DSPUseNavAppendSearch();
	const [form] = DSPForm.useForm();
	const referenceeSelectRef = useRef();
	const [referenceModalOpen, setReferenceModalOpen] = useState(false);

	const isedit = !!ghgId;
	const goback = useCallback(() => nav('/home/factorDB/GHG'), []);
	const { loading, ghgGroups, handleSubmit } = useApi({ form, ghgId, isedit, goback });

	// 新增/編輯GWP變數
	const title = `${formatMessage({ id: isedit ? 'common.edit' : 'common.add' })} GHG ${formatMessage({
		id: 'factorDB.modal.coefficient',
	})}`;

	return (
		<Spin className="ghgEditForm" spinning={loading}>
			<div className="ghgEditForm__title">{title}</div>
			<DSPForm
				{...{ form }}
				className={classNames({ 'ghgEditForm--single': !isImport })}
				formSchema={ghgFormSchema({ isImport, ghgGroups, referenceeSelectRef, setReferenceModalOpen })}
				layout="vertical"
			/>
			<div className="ghgEditForm__actions">
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

GHGEditForm.defaultProps = {};

GHGEditForm.propTypes = {};

export default GHGEditForm;
