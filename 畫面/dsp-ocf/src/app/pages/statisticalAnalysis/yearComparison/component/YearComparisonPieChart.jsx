import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import PieChart from '../../../../components/charts/pieChart/PieChart';

const YearComparisonPieChart = ({ data, title, className }) => (
	<PieChart
		className={className}
		title={title}
		customerHeight="400px"
		titleStyle={{
			fontSize: '24px',
			fontWeight: 'bold',
			color: '#0087DC',
		}}
		tooltip={{
			headerFormat: null,
			pointFormatter() {
				const { name, y } = this;
				return `<b style="font-size: 14px">${name}</b> ${y.toLocaleString()} tCO2e`;
			},
		}}
		data={data}
		series={[
			{
				dataLabels: { format: '<b>{point.name}</b>' }, // 圓餅圖內圈 label
			},
			{
				dataLabels: {
					formatter() {
						const { point } = this;
						return `<b>${point.name}</b><br/>${Highcharts.numberFormat(point.y, 0)} tCO2e`;
					},
				},
			},
		]}
	/>
);
YearComparisonPieChart.defaultProps = {
	className: undefined,
	title: '',
	data: undefined,
};

YearComparisonPieChart.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.any),
};

export default YearComparisonPieChart;
