import React from 'react';
import data from './chartData.json';
import './chartDemo.scss';
import LineChart from '../../../../components/charts/lineChart/LineChart';

const LineChartDemo = () => (
	// 之後stack chart會整合在這邊
	<div className="lineChartDemo">
		<LineChart title="有外框" resource={data} />
		<LineChart outFrame={false} title="沒外框" resource={data} />
		{/* type!==init 的時候右上角有detail、hover後tooltip會不同 */}
		<LineChart type="other" title="右上角有detail" resource={data} />
	</div>
);
export default LineChartDemo;
