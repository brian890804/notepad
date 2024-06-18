import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';
import testData from './component/header/RegionSiteCompanyTreeSelectTest.json';
import Electricity from './electricity/Electricity';
import Emission from './emission/Emission';
import Energy from './energy/Energy';
import Garbage from './garbage/Garbage';
import Water from './water/Water';

export default ({ form, chartData }) => {
	const { formatMessage } = useIntl();
	const initialValues = {
		queryDate: dayjs(new Date().valueOf()),
		sites: testData,
	};

	const headerItems = [
		{
			key: 'emission',
			value: 'emission',
			label: formatMessage({ id: 'yearComparison.emission' }),
			render: <Emission form={form} chartData={chartData.emissionData} />,
		},
		{
			key: 'electricity',
			value: 'electricity',
			label: formatMessage({ id: 'yearComparison.electricity' }),
			render: <Electricity form={form} chartData={chartData.electricityData} />,
		},
		{
			key: 'energy',
			value: 'energy',
			label: formatMessage({ id: 'yearComparison.energy' }),
			render: <Energy form={form} chartData={chartData.energyData} />,
		},
		{
			key: 'water',
			value: 'water',
			label: formatMessage({ id: 'yearComparison.water' }),
			render: <Water form={form} chartData={chartData.waterData} />,
		},
		{
			key: 'garbage',
			value: 'garbage',
			label: formatMessage({ id: 'yearComparison.garbage' }),
			render: <Garbage form={form} chartData={chartData.garbageData} />,
		},
	];
	return { initialValues, headerItems };
};
