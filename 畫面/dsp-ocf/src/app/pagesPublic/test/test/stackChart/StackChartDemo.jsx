/* eslint-disable */
import React from 'react';
// APi來的資料
import originalData from './originalData.json';
import data from './chartData.json';
import './stackChartDemo.scss';
import StackChart from '../../../../components/charts/stackChart/StackChart';
import useOperationation from '../../../../components/charts/utilities/useOperation';

const StackChartDemo = () => {
	// 可以用這個func來轉格式
	const { dataMonthConvertTypes } = useOperationation();
	console.info('原始API資料:', originalData);
	console.info('轉後(群組)資料:', dataMonthConvertTypes(originalData));
	console.info('吃的(一般)資料格式:', data);
	return (
		<div className="lineChartDemo">
			<StackChart title="有外框(群組)" resource={dataMonthConvertTypes(originalData)} chartType="stack" showLegend />
			<StackChart outFrame={false} title="沒外框(一般)" resource={data} chartType="stack" />
		</div>
	);
};
export default StackChartDemo;
