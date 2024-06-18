import React from 'react';
import { Radio, Tooltip } from '@delta/dsp-ui/lib/antd';
import { InfoCircleOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { getIntl } from '../../intl/IntlGlobalProvider';
import services from '../../../config/services';
import factorTableSchema from '../../utils/factorTableSchema';
// import GHGItem from './ghgItem/GHGItem';

const useFactorFormSchema = ({
	factorId, // 係數 id
	tableFactorTypeId, // 綁定係數表 id
	isElectricity, // 是否為電力係數
	referenceId, // 規範 id
}) => {
	const { formatMessage } = getIntl();
	return [
		{ name: 'id', type: 'hidden' }, // 係數 id
		{ name: 'resourceId', type: 'hidden' }, // 原燃物料或產品 id
		{ name: 'modifyDate', type: 'hidden' }, // 修改時間
		{ name: ['table', 'id'], type: 'hidden' }, // 綁定的 table id
		// 係數來源
		{
			name: ['table', 'reference'],
			label: formatMessage({ id: 'factorDB.modal.reference' }),
			required: true,
			width: '50%',
			type: factorId ? 'viewItemBorder' : 'apiSelect',
			url: services.dropdowns.replace('{cate}', 'reference'),
		},
		// 空一格
		{ type: 'space', width: '50%' },
		// 選擇的係數
		referenceId && {
			name: ['table', 'factorType'],
			label: formatMessage({ id: 'factorDB.modal.coefficient' }),
			required: true,
			width: '50%',
			type: factorId ? 'viewItemBorder' : 'apiSelect',
			url: services.ghgFactorTables.replace('{referenceId}', referenceId),
			showSearch: !factorId,
			filterOption: (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
		},
		// 係數的單位 (純顯示)
		tableFactorTypeId && { name: ['table', 'unit'], label: '單位', width: '50%', type: 'viewItemBorder' },
		// 綁定的係數表 (純顯示)
		tableFactorTypeId && {
			name: ['table', 'factors'],
			type: 'formList',
			variant: 'horizontalTable',
			columns: [...factorTableSchema({ formatMessage })],
		},
		// 空一格
		!tableFactorTypeId && referenceId && { type: 'space', width: '50%' },
		// 計算基準
		{
			name: 'ghgBased',
			label: (
				<span className="factorFormModal__ghgBased">
					{/* 計算基準 */}
					{formatMessage({ id: 'factorDB.modal.ghgBased' })}
					<Tooltip
						className="factorFormModal__ghgBased__info"
						title={
							isElectricity
								? formatMessage({ id: 'factorDB.modal.is.electricity' }) // 電力類型的原燃物料或產品，需選擇計算基準
								: formatMessage({ id: 'factorDB.modal.non.electricity' }) // 非電力類型的原燃物料或產品，計算基準自動套用一般
						}
					>
						<InfoCircleOutlined />
					</Tooltip>
				</span>
			),
			required: true,
			placeholder: formatMessage({ id: 'common.placeholder' }, { text: formatMessage({ id: 'factorDB.modal.ghgBased' }) }),
			type: isElectricity ? 'radio' : 'hidden',
			width: '50%',
			options: [
				// { label: formatMessage({ id: 'common.general' }), value: 'general', disabled: true },
				{ label: formatMessage({ id: 'common.location.base' }), value: 'location', disabled: !isElectricity },
				{ label: formatMessage({ id: 'common.market.base' }), value: 'market', disabled: !isElectricity },
			],
			render: () => <Radio.Group />,
		},
		// 空一格
		{ type: 'space', width: '50%' },
		// 起始日期
		{
			name: 'startDate',
			label: formatMessage({ id: 'site.setting.schema.startDate' }),
			required: true,
			width: '50%',
			type: 'datePicker',
		},
		// 結束日期
		{
			name: 'endDate',
			label: formatMessage({ id: 'site.setting.schema.endDate' }),
			width: '50%',
			type: 'datePicker',
			fixTime: value => value?.endOf('day'),
		},
	].filter(i => i);
};

export default useFactorFormSchema;
