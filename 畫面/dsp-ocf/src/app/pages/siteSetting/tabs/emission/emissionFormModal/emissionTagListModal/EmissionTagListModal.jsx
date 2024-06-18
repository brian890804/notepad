import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { DSPForm, DSPModal } from '@delta/dsp-ui';
import { Tabs } from '@delta/dsp-ui/lib/antd';
import { useIntl } from 'react-intl';
import useApi from './useApi';

import './emissionTagListModal.scss';

const EmissionTagListModal = ({ open, onFinish }) => {
	const { formatMessage } = useIntl();
	const [activeKey, setActiveKey] = useState();
	const [refularForm] = DSPForm.useForm();
	const [customForm] = DSPForm.useForm();

	// 請求邏輯 (取得清單、更新清單)
	const { loading, updating, submitTags } = useApi({ refularForm, customForm, open, setActiveKey, onFinish });

	/** 表單元件 */
	const formComponent = useCallback(
		({ form, type = 'custom' }) => (
			<DSPForm
				{...{ form, loading }}
				formSchema={[
					{
						name: 'emissionTags',
						type: 'formList',
						addLabel: formatMessage({ id: 'site.setting.emission.tag' }),
						editable: type === 'custom',
						// 標籤名稱
						columns: [
							{
								...{ label: formatMessage({ id: 'common.name' }), type: type === 'custom' ? 'input' : 'text' },
								...{ name: 'name', width: '100%', required: true, size: 'small' },
							},
						],
					},
				]}
			/>
		),
		[]
	);

	/** 既有標籤 及 客製標籤 */
	const tabItems = useMemo(
		() => [
			{ key: 'custom', label: 'Custom', children: formComponent({ form: customForm, type: 'custom' }), forceRender: true },
			{ key: 'regular', label: 'Regular', children: formComponent({ form: refularForm, type: 'regular' }), forceRender: true },
		],
		[]
	);

	return (
		<DSPModal
			title={formatMessage({ id: 'site.setting.emission.tag.setting' })} // 類別標籤設定
			className="emissionTagListModal"
			open={open}
			cancelButtonProps={{ loading: updating }}
			okButtonProps={{ loading: updating }}
			closable={!updating}
			onCancel={() => onFinish()}
			onOk={() => submitTags()}
		>
			<Tabs type="card" items={tabItems} activeKey={activeKey} onChange={setActiveKey} />
		</DSPModal>
	);
};

EmissionTagListModal.defaultProps = {
	open: undefined,
	onFinish: () => undefined,
};

EmissionTagListModal.propTypes = {
	/** 是否開啟 modal */
	open: PropTypes.bool,
	/** 完成關閉視窗 (含式返回是否刷新參數) */
	onFinish: PropTypes.func,
};

export default EmissionTagListModal;
