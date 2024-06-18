import React from 'react';
import { Button, Radio, Tooltip } from '@delta/dsp-ui/lib/antd';
import { InfoCircleOutlined, SettingOutlined } from '@delta/dsp-ui/lib/antd/icons';
import services from '../../../../../../config/services';
import { getIntl } from '../../../../../intl/IntlGlobalProvider';
import EmissionStarndardTree from './emissionStandardTree/EmissionStarndardTree';
import EmissionSourceTransfer from './emissionSourceTransfer/EmissionSourceTransfer';
import EmissionTagSelect from './emissionTagSelect/EmissionTagSelect';

const useEmissionFormShema = props => {
	const { form, sourceType, resource, siteId, emissionId, scopeId, changeScopeByUser } = props || {};
	const { tagSelectRef, setTagModalOpen, setOpenFactorTablesModal } = props || {};
	const { formatMessage } = getIntl();

	return [
		// 名稱
		{
			name: 'name',
			required: true,
			label: formatMessage({ id: 'site.setting.schema.name' }),
			type: 'apiAutocomplete',
			url: scopeId ? services.siteEmissionPredefined.replace('{scopeId}', scopeId) : undefined,
			mapper: resp => {
				const options = resp?.data?.result;
				// 確認是使用者自主切換才進行變動
				if (changeScopeByUser) {
					form.setFieldValue('name', options[0]?.name); // 切換標準時，直接將預設名稱的第一個帶入
					form.setFieldValue('tags', options[0]?.tags); // 並帶入預設的類別標籤
				}
				return options?.map(i => i?.name);
			},
		},
		// 標準
		{
			name: 'scopeId',
			required: true,
			label: formatMessage({ id: 'site.setting.schema.standard' }),
			render: () => <EmissionStarndardTree mode={emissionId ? 'edit' : 'add'} />,
		},
		// 逸散方式 (若選擇到 iso1.4 則會出現逸散方式提供選擇)
		scopeId === 6 && {
			name: 'lossMethod',
			required: true,
			width: '50%',
			label: (
				<span className="emissionFormModal__lossMethod">
					{/* 逸散方式 */}
					{formatMessage({ id: 'site.setting.schema.lossMethod' })}
					<Tooltip
						className="emissionFormModal__lossMethod__info"
						placement="right"
						title={formatMessage({ id: 'site.setting.schema.lossMethod.info' })}
					>
						<InfoCircleOutlined />
					</Tooltip>
				</span>
			),
			render: () => (
				<Radio.Group
					options={[
						{ label: formatMessage({ id: 'site.setting.schema.lossMethod.other' }), value: 'other' }, // 其他逸散
						{ label: formatMessage({ id: 'site.setting.schema.lossMethod.refrigerant' }), value: 'refrigerant' }, // 冷媒逸散
					]}
				/>
			),
		},
		// 來源
		{
			name: 'sourceType',
			// required: true,
			label: formatMessage({ id: 'site.setting.schema.source' }),
			url: services.dropdowns.replace('{cate}', 'emissionSourceType'),
			type: 'apiSelect',
		},
		sourceType && {
			name: 'emissionSources',
			render: () => <EmissionSourceTransfer sourceType={sourceType} siteId={siteId} />,
		},
		// 原燃物料或產品
		{
			name: 'resource',
			required: true,
			label: formatMessage({ id: 'site.setting.schema.resource' }),
			width: '50%',
			type: 'apiSelect',
			url: `${services.siteResourceAll.replace('{siteId}', siteId)}${scopeId ? `?scopeId=${scopeId}` : ''}`,
			mapper: resp => resp.data.result,
			showSearch: true,
			filterOption: (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
			formSuffix: (
				<Button
					onClick={() => setOpenFactorTablesModal(true)}
					type="link"
					icon={<InfoCircleOutlined />}
					disabled={resource?.value === undefined}
				>
					{formatMessage({ id: 'site.setting.emission.formModal.coefficientData' })}
				</Button>
			),
		},
		// 類別標籤
		{
			label: formatMessage({ id: 'site.setting.emission.tag' }),
			name: 'tags',
			width: '50%',
			formSuffix: <Button icon={<SettingOutlined style={{ fontSize: 14 }} />} type="link" onClick={() => setTagModalOpen(true)} />,
			render: () => <EmissionTagSelect ref={tagSelectRef} />,
		},
		// 計算方法
		{
			label: formatMessage({ id: 'site.setting.emission.calculationMethod' }),
			name: 'calculationMethod',
			width: '50%',
			type: 'input',
		},
		// 數據保管單位
		{
			label: formatMessage({ id: 'site.setting.emission.dataSourceDepartment' }),
			name: 'dataSourceDepartment',
			width: '50%',
			type: 'input',
		},
		// 起始日期
		{
			name: 'startDate',
			required: true,
			label: formatMessage({ id: 'site.setting.schema.startDate' }),
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
		{ name: 'siteId', type: 'hidden' },
		{ name: 'modifyDate', type: 'hidden' },
	].filter(i => i);
};
export default useEmissionFormShema;
