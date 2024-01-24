export default {};
export const STANDARDS = [
	{
		label: 'ISO',
		value: 'iso',
		children: [
			{
				label: '1 直接溫室氣體',
				value: '1',
				children: [
					{ label: '1.1 固定燃燒直接排放', value: '1.1' },
					{ label: '1.2 移動燃燒直接排放', value: '1.2' },
					{ label: '1.3 工業製程之直接製程排放及移除', value: '1.3' },
					{ label: '1.4 土地利用變更和森林 (LULUCF) 的直接排放和移除', value: '1.4' },
					{ label: '1.5 土地利用變更和森林 (LULUCF) 的直接排放和移除', value: '1.5' },
				],
			},
			{
				label: '2 輸入能源間溫室氣體排放',
				value: '2',
				children: [
					{ label: '2.1 輸入電力的間接排放', value: '2.1' },
					{ label: '2.2 輸入能源的間接排放', value: '2.2' },
				],
			},
			{ label: '3 運輸之間排放', value: '3', disabled: true },
			{ label: '4 其他組織提供之產品間接排放', value: '4', disabled: true },
			{ label: '5 使用組織產品所衍生的間接排放', value: '5', disabled: true },
			{ label: '6 來自其他來源之間接排放', value: '6', disabled: true },
		],
	},
	{
		label: 'GHG',
		value: 'ghg',
		children: [
			{
				label: '範疇一',
				value: 'a',
				children: [
					{ label: '1.1 固定燃燒直接排放', value: 'a1' },
					{ label: '1.2 移動燃燒直接排放', value: 'a2' },
					{ label: '1.3 工業製程之直接製程排放及移除', value: 'a3' },
					{ label: '1.4 土地利用變更和森林 (LULUCF) 的直接排放和移除', value: 'a4' },
					{ label: '1.5 土地利用變更和森林 (LULUCF) 的直接排放和移除', value: 'a5' },
				],
			},
			{
				label: '範疇二',
				value: 'b',
				children: [
					{ label: '2.1 輸入電力的間接排放', value: 'b1' },
					{ label: '2.2 輸入能源的間接排放', value: 'b2' },
				],
			},
			{
				label: '範疇三',
				value: 'c',
				children: [
					{ label: 'C1 購買的產品與服務', value: 'c1' },
					{ label: 'C2 資本貨物', value: 'c2' },
					{ label: 'C3 燃料與能源相關活動', value: 'c3' },
					{ label: 'C4 上游運輸及配送', value: 'c4' },
					{ label: 'C5 營運產生的廢棄物', value: 'c5' },
					{ label: 'C6 商務旅行', value: 'c6' },
					{ label: 'C7 員工通勤', value: 'c7' },
					{ label: 'C8 上游租賃資產', value: 'c8' },
					{ label: 'C9 下游運輸及配送', value: 'c9' },
					{ label: 'C10 銷售產品的加工', value: 'c10' },
					{ label: 'C11 售出產品的使用', value: 'c11' },
					{ label: 'C12 售出產品的最終處置', value: 'c12' },
					{ label: 'C13 下游租賃資產', value: 'c13' },
					{ label: 'C14 加盟', value: 'c14' },
					{ label: 'C15 投資', value: 'c15' },
				],
				disabled: true,
			},
		],
	},
];
