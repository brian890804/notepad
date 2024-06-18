import { useIntl } from 'react-intl';

import { colorColumn, tooltipFormatter, generateSeries } from './chartOptions';

const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default (chartTitle, chartType, date, resource) => {
	const { locale, formatMessage } = useIntl();

	let childList = 0;

	if (resource && chartType === 'column') {
		childList = resource[0]?.siteList?.map(site => site.childList)[0];
	}
	const title = {
		text: chartTitle,
		align: 'left',
		verticalAlign: 'top',
		margin: 30,
		style: {
			fontSize: '24px',
			fontWeight: 'bold',
			color: '#0087DC',
		},
	};

	const tooltip = {
		useHTML: true,
		shape: 'rect',
		formatter() {
			const calculateBaseText = `${formatMessage({ id: 'site.setting.schema.calculateRange' })}：${date.startDate}~${date.endDate}`;
			return tooltipFormatter(resource, chartType, calculateBaseText, this);
		},
	};

	const legend = {
		align: 'center',
		useHTML: true,
		floating: true,
		enable: true,
		itemDistance: 10,
		itemStyle: {
			textOverflow: 'ellipsis',
		},
		symbolHeight: 10,
		labelFormatter() {
			return `<div class='siteComparison__body__chart__legend'> \
					<span style='color:${this.color}'></span><span>${this.name}</span> \
					</div>`;
		},
	};

	const xAxis = {
		categories: resource?.map((data, index) => {
			const padTwoDigits = number => (number < 10 ? `0${number}` : `${number}`);
			const nowYear = Number(date.startDate.substring(0, 4));
			const dateString = date.startDate.substring(5, 7);
			const newIndex = Number(dateString) + index;
			const year = newIndex > 12 ? `${nowYear + 1}-` : `${nowYear}-`;
			return locale.includes('en-us') ? year + Months[data.month - 1] : `${year + padTwoDigits(data.month)}`;
		}),
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

	const series = generateSeries(resource, chartType);

	const chartOptions = {
		lang: 'zh-TW',
		accessibility: {
			enabled: false,
		},
		credits: {
			enabled: false,
		},
		chart: {
			type: chartType,
			margin: [80, 120, chartType === 'pie' ? 40 : 120, 120],
			style: {
				fontWeight: '600',
			},
			height: 500,
		},
		title,
		tooltip,
		series,
	};

	const columnOptions = {
		legend,
		xAxis,
		yAxis,
		colors: colorColumn.slice(0, childList.length),
		plotOptions: {
			column: {
				stacking: 'normal',
			},
		},
	};

	const pieOptions = {
		plotOptions: {
			pie: {
				center: ['50%', '50%'],
				dataLabels: {
					enable: true,
					style: {
						textOverflow: 'ellipsis',
					},
				},
			},
		},
		responsive: {
			rules: [
				{
					condition: {
						minWidth: 400,
						maxWidth: 700,
					},
					chartOptions: {
						chart: {
							margin: [60, 50, 0, 50],
						},
						series: [
							{},
							{
								id: 'outside',
								dataLabels: {
									distance: 10,
									format: '<strong>{point.custom.name}：</strong> <span style="opacity: 0.7">{point.percent}%</span>',
								},
							},
						],
					},
				},
			],
		},
	};

	return {
		...chartOptions,
		...(chartType === 'column' && { ...columnOptions }),
		...(chartType === 'pie' && { ...pieOptions }),
	};
};
