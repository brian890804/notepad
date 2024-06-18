const factorTableSchema = ({ formatMessage }) => [
	// 氣體
	{ name: 'name', label: formatMessage({ id: 'common.ghg' }), type: 'viewItem' },
	// 數量
	{ name: 'factor', label: formatMessage({ id: 'common.quantity' }), type: 'viewItem' },
	// 單位
	{ name: 'displayUnit', label: formatMessage({ id: 'common.unit' }), type: 'viewItem' },
];

export default factorTableSchema;
