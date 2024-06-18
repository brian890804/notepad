import React, { useEffect, useMemo } from 'react';
import { DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { InfoCircleOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { Tooltip, Radio } from '@delta/dsp-ui/lib/antd';
import services from '../../../../../../../../config/services';
import { getIntl } from '../../../../../../../intl/IntlGlobalProvider';
import UnitSelect from './unitSelect/UnitSelect';
import ResourceUnitDisplay from './resourceUnitDisplay/ResourceUnitDisplay';

const useEmissionActivityFormSchema = ({ formValues, emissionData }) => {
	const { formatMessage } = getIntl();

	// 依照原燃物料的單位 取得單位轉換列表
	const { axiosApi: getRates, data: unitOptions } = DSPUseAxios().useGet();
	const { resourceUnit, amount, unit, calcMethod } = formValues || {};
	useEffect(() => {
		if (resourceUnit?.value)
			getRates({
				url: services.unitRates,
				config: { params: { resourceUnit: resourceUnit?.value } },
				mapper: resp => resp?.data?.result,
			});
	}, [resourceUnit]);

	const isEscape = useMemo(() => calcMethod === 'loss', [calcMethod]); // 計算方法 是否為 逸散率法
	const isRefrigerant = useMemo(() => emissionData?.lossMethod === 'refrigerant', [emissionData?.lossMethod]); // 逸散方式 是否為 冷媒逸散

	return [
		/** 名稱 */
		{ name: 'name', label: formatMessage({ id: 'site.setting.schema.name' }), required: true, type: 'input' },
		/** 計算區間 */
		{
			name: 'calculateRange',
			label: formatMessage({ id: 'site.setting.schema.calculateRange' }),
			required: true,
			type: 'rangePicker',
		},
		/** 計算方法 (iso1.4才會出現計算方法) */
		isRefrigerant && {
			name: 'calcMethod',
			required: true,
			placeholder: formatMessage(
				{ id: 'common.placeholder' },
				{ text: formatMessage({ id: 'site.setting.schema.calculate.method' }) }
			),
			label: (
				<span className="emissionActivityFormModal__lossFactor">
					{/* 計算方法 */}
					{formatMessage({ id: 'site.setting.schema.calculate.method' })}
					<Tooltip
						className="emissionActivityFormModal__lossFactor__info"
						placement="right"
						// 當排放源逸散方式為\"冷媒逸散\"時，計算方法提供\"填充量法\"及\"逸散率法\"供其選擇
						title={formatMessage({ id: 'site.setting.schema.calculate.method.info' })}
					>
						<InfoCircleOutlined />
					</Tooltip>
				</span>
			),
			render: () => (
				<Radio.Group
					options={[
						{ label: formatMessage({ id: 'site.setting.schema.calculate.method.filling' }), value: 'filling' }, // 填充量法
						{ label: formatMessage({ id: 'site.setting.schema.calculate.method.loss' }), value: 'loss' }, // 逸散率法
					]}
				/>
			),
		},
		/** 數量 */
		{
			name: 'amount',
			label: isEscape
				? formatMessage({ id: 'site.setting.schema.refrigerant.amount' }) // 冷媒量
				: formatMessage({ id: 'site.setting.schema.quantity' }), // 數量
			required: true,
			width: isEscape ? '33%' : '50%',
			type: 'number',
			formatter: value => {
				if (!value) return value;
				const floatVal = Number.parseFloat(value);
				if (Number.isNaN(floatVal)) return value;
				return floatVal.toLocaleString(undefined, { maximumFractionDigits: 6 }); // 顯示千分位，最多6位小數
			},
		},
		/** 單位 */
		{
			name: 'unit',
			label: formatMessage({ id: 'site.setting.schema.unit' }),
			width: isEscape ? '33%' : '50%',
			render: () => <UnitSelect options={unitOptions} />,
		},
		/** 逸散率 */
		isEscape && {
			name: 'lossFactor',
			label: formatMessage({ id: 'site.setting.schema.lossFactor' }),
			width: '33%',
			type: 'number',
			max: 1,
			step: 0.01,
		},
		/** 換算為係數單位(純顯示) */
		{
			name: 'resourceUnit',
			// label: '換算為係數單位',
			// width: isEscape ? '67%' : '100%',
			render: () => <ResourceUnitDisplay {...{ amount, resourceUnit, unit, unitOptions, formatMessage }} />,
		},

		/** 佐證資料 */
		{
			name: 'evidences',
			label: formatMessage({ id: 'site.setting.schema.evidence' }),
			type: 'upload',
			url: services.file,
		},
		/** 更新時間 [隱藏欄位] */
		{ name: 'modifyDate', type: 'hidden' },
	].filter(i => i);
};

export default useEmissionActivityFormSchema;
