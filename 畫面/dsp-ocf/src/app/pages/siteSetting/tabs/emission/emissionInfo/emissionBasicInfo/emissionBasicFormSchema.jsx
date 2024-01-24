import React from 'react';
import { Button } from '@delta/dsp-ui/lib/antd';
import { getIntl } from '../../../../../../intl/IntlGlobalProvider';
import ScopeFormItem from './scopeFormItem/ScopeFormItem';

export default () => undefined;

export const emissionBasicFormSchema = ({ setOpenFactorTableModal }) => {
	const { formatMessage } = getIntl();

	return [
		/** 設施名稱 */
		{ label: formatMessage({ id: 'site.setting.schema.name' }), name: 'name', type: 'viewItem' },
		/** 標準 */
		{
			label: formatMessage({ id: 'site.setting.schema.standard' }),
			name: 'scopeId',
			render: () => <ScopeFormItem />,
		},
		/** 來源 */
		{ label: formatMessage({ id: 'site.setting.schema.source' }), name: 'sourceType', type: 'viewItem' },
		/** 原燃物料或產品 */
		{ label: formatMessage({ id: 'site.setting.schema.resource' }), name: 'resource', type: 'viewItem' },
		/** 係數 */
		{
			label: formatMessage({ id: 'site.setting.schema.coefficient' }),
			key: 'factors',
			render: () => (
				<Button disabled={false} onClick={() => setOpenFactorTableModal(true)}>
					{formatMessage({ id: 'site.setting.emission.formModal.coefficientData' })}
				</Button>
			),
		},
		/** 原燃物料單位 */
		{ label: formatMessage({ id: 'site.setting.schema.resource.unit' }), name: 'resourceUnit', type: 'viewItem' },
		/** 類別標籤 */
		{ label: formatMessage({ id: 'site.setting.emission.tag' }), name: 'tags', type: 'viewItem' },
		// 計算方法
		{ label: formatMessage({ id: 'site.setting.emission.calculationMethod' }), name: 'calculationMethod', type: 'viewItem' },
		// 數據保管單位
		{ label: formatMessage({ id: 'site.setting.emission.dataSourceDepartment' }), name: 'dataSourceDepartment', type: 'viewItem' },
		/** 起始日期 */
		{ label: formatMessage({ id: 'site.setting.schema.startDate' }), name: 'startDate', type: 'viewItemTime' },
		/** 結束日期 */
		{ label: formatMessage({ id: 'site.setting.schema.endDate' }), name: 'endDate', type: 'viewItemTime' },
	].map(i => ({ ...i, disabled: true }));
};
