import React from 'react';
import { DSPFormItem, DSPRegionTreeSelect } from '@delta/dsp-ui';
import { Button } from '@delta/dsp-ui/lib/antd';
import { SettingOutlined } from '@delta/dsp-ui/lib/antd/icons';
import services from '../../../../config/services';
import ReferenceSelect from '../common/referenceSelect/ReferenceSelect';
import { getIntl } from '../../../intl/IntlGlobalProvider';

export const factorTypes = ['CO2', 'CH4', 'N2O', 'HFCs', 'PFCs', 'SF6', 'NF3'];

const ghgFormSchema = props => {
	const { isImport, ghgGroups, referenceeSelectRef, setReferenceModalOpen } = props || {};
	const { formatMessage } = getIntl();

	return [
		/** 修改時間 */
		{ name: 'modifyDate', type: 'hidden' },
		// 分類
		{
			label: formatMessage({ id: 'factorDB.modal.type' }),
			name: 'referenceType',
			required: true,
			type: 'apiSelect',
			url: services.dropdowns.replace('{cate}', 'referenceType'),
			width: '50%',
		},
		// 係數來源
		{
			label: formatMessage({ id: 'factorDB.modal.reference' }),
			name: 'reference',
			required: true,
			width: '50%',
			formSuffix: (
				<Button icon={<SettingOutlined style={{ fontSize: 14 }} />} type="link" onClick={() => setReferenceModalOpen(true)} />
			),
			render: () => <ReferenceSelect ref={referenceeSelectRef} />,
		},
		// 區域
		{
			label: formatMessage({ id: 'factorDB.modal.site' }),
			name: 'region',
			width: '50%',
			render: () => <DSPRegionTreeSelect domain={services.domain} />,
		},
		/** 國家/市場 */
		{
			name: 'countryMarket',
			label: formatMessage({ id: 'factorDB.modal.country' }),
			width: '50%',
			type: 'apiSelect',
			url: services.dropdowns.replace('{cate}', 'countryMarket'),
			showSearch: true,
			filterOption: (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
		},
		// 係數
		{
			name: 'ghg',
			label: isImport ? formatMessage({ id: 'factorDB.modal.coefficient' }) : null,
			type: 'formList',
			editable: !!isImport, // 編輯中，代表只有一筆(不可多筆編輯)
			required: true,
			variant: 'card',
			columns: [
				/** 係數名稱 */
				{
					name: 'name',
					label: formatMessage({ id: 'factorDB.modal.coefficientSourceName' }),
					width: '50%',
					required: true,
					type: 'input',
				},
				/** 單位 */
				{
					name: 'unit',
					label: formatMessage({ id: 'factorDB.modal.unit' }),
					width: '50%',
					type: 'apiSelect',
					required: true,
					url: services.dropdowns.replace('{cate}', 'unit'),
				},
				// 係數
				{
					name: 'factors',
					label: formatMessage({ id: 'factorDB.modal.coefficient' }),
					type: 'singleRowTable',
					tableLayout: 'fixed',
					columns: [
						...factorTypes.map((type, i) => ({
							label: preName => (
								<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
									{type}
									{['HFCs', 'PFCs'].includes(type) && (
										<DSPFormItem
											name={[preName, i, 'ghg'].flat()}
											type="select"
											size="small"
											showSearch
											filterOption={(input, option) => option?.label?.toLowerCase()?.includes(input?.toLowerCase())}
											options={ghgGroups?.[type]}
										/>
									)}
								</div>
							),
							width: 120,
							name: [i, 'factor'],
							type: 'number',
						})),
					],
				},
			],
		},
	];
};

export default ghgFormSchema;
