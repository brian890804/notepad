export default {
	result: {
		totalProgress: 66.666,
		chartData: [
			{
				name: '類別1',
				scopeName: '類別1 直接溫室氣體排放與移除',
				value: 4500.01,
				children: [
					{ name: '1.1', scopeName: '1.1 固定燃燒直接排放' },
					{ name: '1.2', scopeName: '1.2 移動燃燒直接排放' },
					{ name: '1.3', scopeName: '1.3 工業製程之直接製程排放及移除' },
					{ name: '1.4', scopeName: '1.4 人為系統中溫室氣體釋放產生的直接逸散排放' },
					{ name: '1.5', scopeName: '1.5 土地利用變更和森林(LULUCF)直接製程排放及移除' },
				],
			},
			{
				name: '類別2',
				scopeName: '類別2 輸入能源間溫室 氣體排放',
				value: 2500.23,
				children: [
					{ name: '2.1', scopeName: '2.1 輸入電力的間接排放' },
					{ name: '2.2', scopeName: '2.2 輸入能源的間接排放' },
				],
			},
			{
				name: '類別3',
				scopeName: '類別3 運輸之間排放',
				value: 1000.78,
				children: [
					{ name: '3.1', scopeName: '3.1 上游運輸及配送' },
					{ name: '3.2', scopeName: '3.2 下游運輸與配送' },
					{ name: '3.3', scopeName: '3.3 員工通勤' },
					{ name: '3.4', scopeName: '3.4 客戶和訪客運輸' },
					{ name: '3.5', scopeName: '3.5 商務旅行' },
				],
			},
			{
				name: '類別4',
				scopeName: '類別4 組織使用其他組織提供之產品間接排放',
				value: 1000.47,
				children: [
					{ name: '4.1', scopeName: '4.1 購買的商品' },
					{ name: '4.2', scopeName: '4.2 購買的資本財' },
					{ name: '4.3', scopeName: '4.3 固態及液態廢棄物處置' },
					{ name: '4.4', scopeName: '4.4 上游租賃設備資產' },
					{ name: '4.5', scopeName: '4.5 購買的服務' },
				],
			},
			{
				name: '類別5',
				scopeName: '類別5 使用組織產品所衍生的間接排放',
				value: 1000.87,
				children: [
					{ name: '5.1', scopeName: '5.1 售出產品使用階段' },
					{ name: '5.2', scopeName: '5.2 下游租賃資產' },
					{ name: '5.3', scopeName: '5.3 售出產品廢棄處理' },
					{ name: '5.4', scopeName: '5.4 加盟/投資' },
				],
			},
		].map(i => ({
			...i,
			children: i?.children?.map(item => ({ ...item, value: i?.value / i?.children?.length })),
		})),
	},
};
