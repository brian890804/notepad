import React from 'react';
import { Tabs } from '@delta/dsp-ui/lib/antd';
import Locales from './locales/Locales';
import Request from './request/Request';
import MockData from './mockData/MockData';
import TestPage from './testPage/TestPage';
import DoublePiechart from './doublePiechart/DoublePiechart';

import './test.scss';
import LineChartDemo from './lineChart/LineChartDemo';
import StackChartDemo from './stackChart/StackChartDemo';
import SinglePieChartDemo from './singlePieChart/SinglePieChartDemo';

const Test = () => (
	<div className="test">
		<Tabs
			className="test__tabs"
			type="card"
			items={[
				{ key: 'mock', label: 'Mock data', children: <MockData /> },
				{ key: 'i18n', label: 'i18n test', children: <Locales /> },
				{ key: 'request', label: 'Request', children: <Request /> },
				{ key: 'doublePiechart', label: 'DoublePiechart', children: <DoublePiechart /> },
				{ key: 'lineChart', label: 'lineChart', children: <LineChartDemo /> },
				{ key: 'stackChart', label: 'stackChart', children: <StackChartDemo /> },
				{ key: 'singlePieChart', label: 'singlePieChart', children: <SinglePieChartDemo /> },
				{ key: 'test', label: 'TestPage', children: <TestPage /> },
			]}
		/>
	</div>
);

Test.propTypes = {};

export default Test;
