import React from 'react';
import PropTypes from 'prop-types';
import { DSPForm, DSPModal } from '@delta/dsp-ui';
import { useIntl } from 'react-intl';
import useApi from './useApi';

const ReferenceListModal = ({ open, onFinish }) => {
	const { formatMessage } = useIntl();
	const [form] = DSPForm.useForm();

	// 請求邏輯 (取得清單、更新清單)
	const { loading, updating, submitReference } = useApi({ form, open, onFinish });

	return (
		<DSPModal
			title={formatMessage({ id: 'factorDB.reference.modal.setting' })} // 係數來源設定
			open={open}
			cancelButtonProps={{ loading: updating }}
			okButtonProps={{ loading: updating }}
			closable={!updating}
			onCancel={() => onFinish()}
			onOk={() => submitReference()}
		>
			<DSPForm
				{...{ form, loading }}
				formSchema={[
					{
						name: 'reference',
						type: 'formList',
						addLabel: formatMessage({ id: 'factorDB.modal.reference' }),
						columns: [
							{
								label: formatMessage({ id: 'factorDB.modal.reference' }),
								name: 'label',
								type: 'input',
								size: 'small',
								width: '100%',
							},
						],
					},
				]}
			/>
		</DSPModal>
	);
};

ReferenceListModal.defaultProps = {
	open: undefined,
	onFinish: () => undefined,
};

ReferenceListModal.propTypes = {
	/** 是否開啟 modal */
	open: PropTypes.bool,
	/** 完成關閉視窗 (含式返回是否刷新參數) */
	onFinish: PropTypes.func,
};

export default ReferenceListModal;
