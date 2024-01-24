import React from 'react';
import { useIntl } from 'react-intl';
import { Radio, Tooltip } from '@delta/dsp-ui/lib/antd';
import { InfoCircleOutlined } from '@delta/dsp-ui/lib/antd/icons';
import FactorTableList from '../../../../../components/factorTableList/FactorTableList';

const useResourceFormSchema = ({ form, isEdit, isElectricity }) => {
	const { formatMessage } = useIntl();
	return [
		/** 名稱 */
		{
			name: 'name',
			label: formatMessage({ id: 'site.setting.schema.name' }),
			required: true,
			type: 'input',
		},
		/** 描述 */
		{
			name: 'description',
			label: formatMessage({ id: 'site.setting.schema.description' }),
			type: 'textarea',
		},
		/** 是否為電力類型 */
		{
			name: 'isElectricity',
			label: (
				<span className="resourceFormModal__isElectricity">
					{formatMessage({ id: 'site.setting.resource.isElectricity' })}
					{isEdit && (
						<Tooltip
							className="resourceFormModal__isElectricity__info"
							// 已建立的原燃物料或產品無法變更電力類型
							title={formatMessage({ id: 'site.setting.resource.isElectricity.hint' })}
						>
							<InfoCircleOutlined />
						</Tooltip>
					)}
				</span>
			),
			required: true,
			type: 'radio',
			disabled: isEdit,
			options: [
				{ label: formatMessage({ id: 'common.false' }), value: false },
				{ label: formatMessage({ id: 'common.true' }), value: true },
			],
			render: () => <Radio.Group />,
		},
		/** 原燃物料或產品的係數列表 */
		{
			name: 'factorTables',
			label: formatMessage({ id: 'site.setting.schema.coefficient.list' }),
			required: true,
			render: () => <FactorTableList editable form={form} isElectricity={isElectricity} />,
		},
		/** 原燃物料或產品的修改時間 */
		{ name: 'modifyDate', type: 'hidden' },
		/** 缺失的時間區間內容 */
		{ name: 'nonOverlapContent', type: 'hidden' },
	];
};

export default useResourceFormSchema;
