/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import classNames from 'classnames';
import { DSPColors } from '@delta/dsp-ui';

import './pieChart.scss';

const Colors = [
	...[DSPColors.DELTA.Primary, DSPColors.DELTA.Accent, DSPColors.DELTA.Secondary],
	...[DSPColors.DELTA.PrimaryDark, DSPColors.DELTA.AccentDark, DSPColors.DELTA.SecondaryDark],
];

const PieChart = ({ className, title, subtitle, data, tooltip, series, titleStyle, customerHeight }) => {
	const { innerPieData, outterPieData } = useMemo(() => {
		const colors = Colors;
		const lighColors = Colors.map(i => `${i}AA`);
		const totalValue = data?.reduce((pre, cur) => pre + (cur?.value || 0), 0);
		const round = number => Math.round(number * 100) / 100;
		return {
			innerPieData: data?.map(({ children, value, ...props }, i) => ({
				...props,
				y: round(value),
				yLocaleString: round(value)?.toLocaleString(),
				percent: Math.round((value / totalValue) * 10000) / 100 > 100, // 計算內層總體百分比
				color: colors[i % 10],
			})),
			outterPieData: data
				?.map((item, i) =>
					item?.children?.map(({ value, ...props }) => ({
						...props,
						y: round(value),
						yLocaleString: round(value)?.toLocaleString(),
						percent: Math.round((value / totalValue) * 10000) / 100, // 計算外層總體百分比
						color: lighColors[i % 10],
					}))
				)
				?.filter(i => i)
				?.flat(),
		};
	}, [data]);

	return (
		<div className={classNames('pieChart', className)}>
			<HighchartsReact
				highcharts={Highcharts}
				options={{
					chart: { type: 'pie', height: customerHeight || '40%' },
					title: { text: title, align: 'left', style: { ...titleStyle } },
					subtitle: { text: subtitle, align: 'left' },
					// plotOptions: { pie: { shadow: false, center: ['50%', '50%'] } },
					tooltip: {
						valueSuffix: '%',
						...(tooltip || {}),
						// format: '<b style="font-size: 16px">{point.name}</b>',
						// pointFormat: 'zxcxc',
					},
					series: [
						{
							name: series?.[0]?.name,
							data: innerPieData,
							size: outterPieData?.length > 0 ? '45%' : '100%',
							dataLabels: {
								color: '#ffffff',
								distance: '-40%',
								style: { fontWeight: 'normal', fontSize: 16 },
								format: '<b>{point.name} ({point.percent}%)</b>',
								// format: '<b>{point.name} ({point.percent}%)</b><br/><span style="opacity: 0.8">{y}</span>',
								...(series?.[0]?.dataLabels || {}),
							},
						},
						outterPieData?.length > 0 && {
							name: series?.[1]?.name,
							data: outterPieData,
							size: '80%',
							innerSize: '59%',
							dataLabels: {
								align: 'right',
								style: { fontWeight: 'normal', fontSize: 14 },
								// filter: { property: 'y', operator: '>', value: 1 },
								format: '<b>{point.name} ({point.percent}%)</b>',
								...(series?.[1]?.dataLabels || {}),
							},
						},
					].filter(i => i),
				}}
			/>
		</div>
	);
};

PieChart.defaultProps = {
	className: undefined,
	title: '',
	subtitle: '',
	data: undefined,
	tooltip: undefined,
	series: undefined,
	titleStyle: undefined,
	customerHeight: undefined,
};

PieChart.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		})
	),
	tooltip: PropTypes.shape({
		headerFormat: PropTypes.func,
		pointFormatter: PropTypes.func,
	}),
	series: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			dataLabels: PropTypes.shape({ format: PropTypes.string }),
		})
	),
	titleStyle: PropTypes.objectOf(PropTypes.any),
	customerHeight: PropTypes.string,
};

export default PieChart;
