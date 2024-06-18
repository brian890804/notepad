/* eslint-disable */
import React from 'react';
import SinglePieChart from '../../../../components/charts/singlePieChart/SinglePieChart';
// APi來的資料
import originalData from './originalData.json';
const SinglePieChartDemo = () => {
	return (
		<div className="lineChartDemo">
			<SinglePieChart title={'圓餅圖'} resource={originalData} />
		</div>
	);
};
export default SinglePieChartDemo;
