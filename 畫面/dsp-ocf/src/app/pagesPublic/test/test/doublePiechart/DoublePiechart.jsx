import React from 'react';
import PieChart from '../../../../components/charts/pieChart/PieChart';
import chartData from './chartData.json';

const DoublePiechart = () => (
	<PieChart
		title="標題標題"
		subtitle="副標題副標題"
		data={chartData}
		customerPercent={['50%', '50%']}
		tooltip={{
			headerFormat: null,
			pointFormatter() {
				const { name, percent } = this;
				return `<b style="font-size: 14px">${name}</b> ${percent} %`;
			},
		}}
		series={[
			{
				name: '哈哈', // 內圈 tooltip title
				dataLabels: { format: '<b>{point.name}</b>' }, // 圓餅圖內圈 label
			},
			{
				name: '嘿嘿', // 外圈 tooltip title
				dataLabels: {
					// 圓餅圖外圈 label
					format: '<b>{point.scopeName} ({point.percent}%)</b><br/><span style="opacity: 0.8">{y} KgCO2</span>',
				},
			},
		]}
	/>
);

export default DoublePiechart;
