import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import chartSetting from '../utils/chartSetting';

const StackedChart = ({ date, type, resource }) => {
	const { formatMessage } = useIntl();
	const options = chartSetting(
		`${formatMessage(
			{ id: 'comparison.emission.column.total' },
			{ text: type === 'emission' ? '' : formatMessage({ id: `comparison.${type}` }) }
		)}`,
		'column',
		date,
		resource
	);

	return (
		<div className="siteComparison__body__chart__item">
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
};

StackedChart.defaultProps = {
	date: undefined,
	type: undefined,
	resource: undefined,
};

StackedChart.propTypes = {
	date: PropTypes.shape({
		startDate: PropTypes.string,
		endDate: PropTypes.string,
	}),
	type: PropTypes.string,
	resource: PropTypes.arrayOf(PropTypes.any),
};

export default StackedChart;
