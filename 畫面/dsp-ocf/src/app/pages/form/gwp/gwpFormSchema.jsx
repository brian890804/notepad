import React from 'react';
import { DSPRegionTreeSelect } from '@delta/dsp-ui';
import { SettingOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { Button } from '@delta/dsp-ui/lib/antd';
import services from '../../../../config/services';
import ReferenceSelect from '../common/referenceSelect/ReferenceSelect';
import { getIntl } from '../../../intl/IntlGlobalProvider';

const gwpFormSchema = props => {
	const { isImport, ghgTypes, referenceeSelectRef, setReferenceModalOpen } = props || {};
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
			name: 'gwp',
			label: isImport ? formatMessage({ id: 'factorDB.modal.coefficient' }) : null,
			type: 'formList',
			editable: !!isImport, // 編輯中，代表只有一筆(不可多筆編輯)
			required: true,
			variant: 'card',
			columns: [
				/** 係數名稱 */
				{ label: formatMessage({ id: 'factorDB.modal.coefficientSourceName' }), name: 'name', type: 'input', required: true },
				/** 係數 */
				Array.isArray(ghgTypes) && {
					name: 'factors',
					label: formatMessage({ id: 'factorDB.modal.coefficient' }),
					type: 'singleRowTable',
					tableLayout: 'fixed',
					columns: [
						// ...ghgTypes.slice(0, 20).map(({ label }, i) => ({
						...ghgTypes.map(({ label }, i) => ({
							name: [i, 'factor'],
							label: () => <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>{label}</div>,
							type: 'number',
							width: 100,
						})),
					],
				},
			].filter(i => i),
		},
	];
};

export default gwpFormSchema;
