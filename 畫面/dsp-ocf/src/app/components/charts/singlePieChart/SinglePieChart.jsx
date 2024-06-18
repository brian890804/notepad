import React, { useEffect, useState } from 'react';
import { DSPColors } from '@delta/dsp-ui';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './chart.scss';
import chartSetting from './chartSetting';

const SinglePieChart = ({ outFrame, colors, style, title, resource }) => {
	const [options, setOptions] = useState();
	const { chartProps } = chartSetting({ resource, title });

	useEffect(() => {
		setOptions({
			lang: 'zh-TW',
			...chartProps,
			colors,
		});
	}, []);

	return (
		<section title={title} className={`pie-chart ${outFrame && 'outframe'}`} style={style}>
			{options?.series?.length > 0 && <HighchartsReact highcharts={Highcharts} options={options} />}
		</section>
	);
};

SinglePieChart.defaultProps = {
	outFrame: true,
	title: undefined,
	resource: undefined,
	style: undefined,
	// [color0,color1,color2,]
	colors: [
		...[DSPColors.DELTA.Primary, DSPColors.DELTA.Accent, DSPColors.DELTA.Secondary],
		...[DSPColors.DELTA.PrimaryDark, DSPColors.DELTA.AccentDark, DSPColors.DELTA.SecondaryDark],
	],
};

SinglePieChart.propTypes = {
	outFrame: PropTypes.bool,
	title: PropTypes.string,
	resource: PropTypes.arrayOf(PropTypes.any),
	style: PropTypes.objectOf(PropTypes.any),
	colors: PropTypes.arrayOf(PropTypes.string),
};

export default SinglePieChart;
