import React, { useEffect, useState } from 'react';
import { DSPColors } from '@delta/dsp-ui';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './chart.scss';
import classNames from 'classnames';
import chartSetting from './chartSetting';

const StackChart = ({ outFrame, colors, style, title, resource, className, showLegend }) => {
	const [options, setOptions] = useState();
	const { chartProps } = chartSetting({ resource, title, colors, showLegend });

	useEffect(() => {
		setOptions({
			lang: 'zh-TW',
			...chartProps,
		});
	}, []);

	return (
		<section title={title} className={classNames(`stack-chart ${outFrame && 'outframe'}`, className)} style={style}>
			{options?.series?.length > 0 && <HighchartsReact highcharts={Highcharts} options={options} />}
		</section>
	);
};

StackChart.defaultProps = {
	outFrame: true,
	title: undefined,
	resource: undefined,
	style: undefined,
	// [color0,color1,color2,]
	colors: [
		...[DSPColors.DELTA.Primary, DSPColors.DELTA.Accent, DSPColors.DELTA.Secondary],
		...[DSPColors.DELTA.PrimaryDark, DSPColors.DELTA.AccentDark, DSPColors.DELTA.SecondaryDark],
	],
	className: undefined,
	showLegend: false,
};

StackChart.propTypes = {
	outFrame: PropTypes.bool,
	title: PropTypes.string,
	resource: PropTypes.objectOf(PropTypes.any),
	style: PropTypes.objectOf(PropTypes.object),
	colors: PropTypes.arrayOf(PropTypes.string),
	className: PropTypes.string,
	showLegend: PropTypes.bool,
};

export default StackChart;
