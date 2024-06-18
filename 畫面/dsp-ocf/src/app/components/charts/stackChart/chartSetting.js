/* eslint-disable */
import { useIntl } from 'react-intl';

export default ({ resource, title, colors }) => {
	const { formatMessage } = useIntl();
	const i18nMonth = formatMessage({ id: 'common.unit.month' });
	const nowYear = resource.types.find(item => item.stack === 'current').year;
	const tooltip = {
		valueDecimals: 2,
		valueSuffix: ' (tCO2e)',
		shape: 'rect',
		backgroundColor: 'rgba(255, 255, 255, 0.9)', // 設置背景顏色
		borderColor: '#000', // 設置邊框顏色
		borderRadius: 5, // 設置邊框圓角
		headerFormat: '',
		pointFormatter() {
			const { y, series, color } = this;
			return `<span style="color:${color}">${series.userOptions.year}</span><br/><span style="color:${color}">●</span> ${
				series.name
			}: <b> ${Number(y.toFixed(2)).toLocaleString()} (tCO2e)</b><br/>`;
		},
	};

	const legend = {
		align: 'center',
		useHTML: true,
		enable: true,
		itemDistance: 10,
		itemStyle: {
			textOverflow: 'ellipsis',
		},
		symbolHeight: 8,
		labelFormatter() {
			// 在這裡進行自定義的 HTML 返回
			return `${this.name}`;
		},
	};

	const month = (() => {
		if (resource) {
			const startFrom = resource?.monthStep;
			const padTwoDigits = number => {
				return number < 10 ? `0${number}` : `${number}`;
			};
			return [
				...Array.from({ length: 12 }, (_, index) => {
					const newIndex = startFrom + index;
					const year = newIndex > 12 ? `${nowYear + 1}-` : `${nowYear}-`;
					return `${year}${padTwoDigits(newIndex % 12 || 12)}`;
				}),
			];
		} else {
			return Array.from({ length: 12 }, (_, index) => `${index}`);
		}
	})();

	const xAxis = {
		crosshair: false,
		categories: month,
		tickWidth: 0,
		fontWeight: '500',
		labels: {
			style: {
				fontSize: '12px',
				fontWeight: 'normal',
			},
		},
	};

	const yAxis = {
		min: 0,
		title: {
			text: '<div style="font-weight:bolder;font-size:14px;">碳排量</div><br/>tCO2e',
			rotation: 0,
			align: 'high',
			margin: 25,
			x: 25,
		},
	};

	const chart = {
		type: 'column',
		margin: [140],
		style: {
			fontWeight: '600', // 將標題文字設置為粗體
		},
		height: 500,
	};
	const plotOptions = {
		column: {
			stacking: 'normal',
		},
	};

	const series = (() => {
		if (resource) {
			if (resource.types[0]?.color >= 0) {
				// 針對群組的顏色設定
				resource.types.map(item => {
					if (item?.color >= 0) {
						return (item.color = colors[item.color]);
					}
					return { ...item };
				});
				const splineItems = [
					{
						year: nowYear,
						name: nowYear,
						type: 'spline',
						data: resource.types
							.filter(item => item.stack === 'current')
							.reduce((acc, curr) => {
								curr.data.forEach((value, index) => {
									acc[index] = (acc[index] || 0) + value;
								});
								return acc;
							}, []),
						tooltip: {
							pointFormatter() {
								const { y, series, color } = this;
								return `<span style="color:${color}">●</span> ${series.name}: <b> ${Number(
									y.toFixed(2)
								).toLocaleString()} (tCO2e)</b><br/>`;
							},
						},
					},
					{
						year: nowYear + 1,
						name: nowYear + 1,
						type: 'spline',
						data: resource.types
							.filter(item => item.stack === 'last')
							.reduce((acc, curr) => {
								curr.data.forEach((value, index) => {
									acc[index] = (acc[index] || 0) + value;
								});
								return acc;
							}, []),
						tooltip: {
							pointFormatter() {
								const { y, series, color } = this;
								return `<span style="color:${color}">●</span> ${series.name}: <b> ${Number(
									y.toFixed(2)
								).toLocaleString()} (tCO2e)</b><br/>`;
							},
						},
					},
				];
				return [...resource.types, ...splineItems];
			}
			return resource.types;
		}
		return [];
	})();

	const chartTitle = {
		text: title,
		verticalAlign: 'top',
		align: 'left',
		margin: 30,
		useHTML: true,
		widthAdjust: -(window.innerWidth / 6),
		style: {
			fontSize: '24px',
			fontWeight: 'bold',
			color: '#0087DC',
		},
	};

	const customData = {
		tooltip: resource?.months?.map(month => month),
	};
	const accessibility = {
		enabled: false,
	};
	return {
		chartProps: { chart, series, tooltip, legend, xAxis, yAxis, customData, accessibility, title: chartTitle, plotOptions },
	};
};
