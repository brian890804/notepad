import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import chartSetting from '../utils/chartSetting';

const DonutPieChart = ({ date, type, resource }) => {
	const { formatMessage } = useIntl();
	const options = chartSetting(
		`${formatMessage(
			{ id: 'comparison.emission.pie.total' },
			{ text: type === 'emission' ? '' : formatMessage({ id: `comparison.${type}` }) }
		)}`,
		'pie',
		date,
		resource
	);

	return (
		<div className="siteComparison__body__chart__item">
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
};

DonutPieChart.defaultProps = {
	date: undefined,
	type: undefined,
	resource: undefined,
};

DonutPieChart.propTypes = {
	date: PropTypes.shape({
		startDate: PropTypes.string,
		endDate: PropTypes.string,
	}),
	type: PropTypes.string,
	resource: PropTypes.arrayOf(PropTypes.any),
};

export default DonutPieChart;
