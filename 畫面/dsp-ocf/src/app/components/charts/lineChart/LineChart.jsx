/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './chart.scss';
import chartSetting from './chartSetting';

const LineChart = ({ outFrame, colors, type, style, title, resource, showLegend, showXUnit, className }) => {
	const [options, setOptions] = useState();
	const { chartProps, typeRnder } = chartSetting({ resource, title, type, showLegend, showXUnit });

	const getColor = (() => {
		if (Array.isArray(colors) && colors?.length) {
			return { colors };
		}
		return { colors: ['#8c8c8c', '#5EB6F0'] };
	})();

	useEffect(() => {
		setOptions({
			lang: 'zh-TW',
			...chartProps,
			...getColor,
		});
	}, []);

	return (
		<section title={title} className={classNames(`line-chart ${outFrame && 'outframe'}`, className)} style={style}>
			{options?.series?.length > 0 && (
				<>
					<HighchartsReact highcharts={Highcharts} options={options} />
					{/* 右上角會顯示detail */}
					{typeRnder()}
				</>
			)}
		</section>
	);
};

LineChart.defaultProps = {
	outFrame: true,
	title: undefined,
	resource: undefined,
	style: undefined,
	colors: undefined,
	showLegend: false,
	type: 'init',
	showXUnit: true,
	className: undefined,
};

LineChart.propTypes = {
	outFrame: PropTypes.bool,
	title: PropTypes.string,
	resource: PropTypes.objectOf(PropTypes.any),
	style: PropTypes.objectOf(PropTypes.any),
	colors: PropTypes.arrayOf(PropTypes.any),
	showLegend: PropTypes.bool,
	type: PropTypes.string,
	showXUnit: PropTypes.bool,
	className: PropTypes.string,
};

export default LineChart;
