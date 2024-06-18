import React from 'react';
import { useIntl } from 'react-intl';
import { DSPRegionTreeView } from '@delta/dsp-ui';

const useSiteFormSchema = () => {
	const { formatMessage } = useIntl();

	return [
		[
			{ name: 'id', label: 'site id', type: 'hidden' },
			// 據點名稱
			{ name: 'name', label: formatMessage({ id: 'site.list.schema.name' }), width: '50%', type: 'viewItemBorder' },
			// 據點代碼
			{ name: 'code', label: formatMessage({ id: 'site.list.schema.code' }), width: '50%', type: 'viewItemBorder' },
			[
				// 區域
				{ name: 'region', label: formatMessage({ id: 'site.list.schema.region' }), render: () => <DSPRegionTreeView /> },
				// 國家/市場
				{ name: 'countryMarket', label: formatMessage({ id: 'site.list.schema.countryMarket' }), type: 'viewItemBorder' },
				// 城市
				{ name: 'city', label: formatMessage({ id: 'site.list.schema.city' }), type: 'viewItemBorder' },
				// 完整地址
				{ name: 'address', label: formatMessage({ id: 'site.list.schema.address' }), type: 'viewItemBorder' },
			],
			[
				{
					name: 'image',
					label: formatMessage({ id: 'site.list.schema.image' }),
					type: 'viewItemImage',
					className: 'siteBasicinfo__image',
				},
			],
		],
		// 類型
		{ name: 'type', label: formatMessage({ id: 'site.list.schema.type' }), width: '50%', type: 'viewItemBorder' },
		// 狀態
		{ name: 'property', label: formatMessage({ id: 'site.list.schema.property' }), width: '50%', type: 'viewItemBorder' },
		// 使用面積
		{ name: 'floorArea', label: formatMessage({ id: 'site.list.schema.floorArea' }), width: '50%', type: 'viewItemBorder' },
		// 人數
		{ name: 'occupantCapacity', label: formatMessage({ id: 'site.list.schema.peopleNumber' }), width: '50%', type: 'viewItemBorder' },
		// 據點介紹
		{ name: 'description', label: formatMessage({ id: 'site.list.schema.description' }), width: '50%', type: 'viewItemBorder' },
		// 備註
		{ name: 'note', label: formatMessage({ id: 'site.list.schema.note' }), width: '50%', type: 'viewItemBorder' },
		// 開始使用時間
		{ name: 'startDate', label: formatMessage({ id: 'site.list.schema.startDate' }), width: '50%', type: 'viewItemTime', border: true },
		// 更新時間
		{
			name: 'modifyDate',
			label: formatMessage({ id: 'site.list.schema.modifyDate' }),
			width: '50%',
			type: 'viewItemTime',
			border: true,
		},
		// 公司
		{
			name: 'companies',
			label: formatMessage({ id: 'site.list.schema.companies' }),
			type: 'formList',
			editable: false,
			columns: [
				{ label: formatMessage({ id: 'site.list.schema.companies' }), name: 'company', type: 'viewItem' },
				{ label: formatMessage({ id: 'common.start.date' }), name: 'startDate', type: 'viewItemTime' },
				{ label: formatMessage({ id: 'common.end.date' }), name: 'endDate', type: 'viewItemTime' },
			],
		},
	];
};

export default useSiteFormSchema;
