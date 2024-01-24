import MockAdapter from 'axios-mock-adapter';
import { DSPGlobalConfig } from '@delta/dsp-ui/lib/utils';
// import services from '../../config/services';
// import yearElectricity from './data/year-electriccity';
// import siteOverview from './data/site-overview';
// import unitRates from './data/unit-rates';

/**
 * This sets the mock adapter on the default instance
 * 透過攔截 Axios 的請求，塞入 sample data
 * */

export default () => {
	const mock = new MockAdapter(DSPGlobalConfig().getAxios(), { delayResponse: 1000 });

	// const capacity = [
	// 	{ value: 2, label: 'L', rate: 1 },
	// 	{ value: 6, label: 'KL', rate: 1000 },
	// 	{ value: 5, label: 'M³', rate: 1 },
	// 	{ value: 8, label: 'KM³', rate: 1 },
	// 	{ value: 10, label: 'Gallon', rate: 1 },
	// 	{ value: 11, label: 'Imperial Gallon', rate: 1 },
	// ];

	// const weight = [
	// 	{ value: 4, label: 'TON', rate: 1 },
	// 	{ value: 1, label: 'Kg', rate: 1 },
	// ];

	// const electricity = [
	// 	{ value: 3, label: 'MWh', rate: 1 },
	// 	{ value: 9, label: 'KWh', rate: 1 },
	// ];

	mock
		// .onPost(services.yearElectricity)
		// .reply(200, yearElectricity)
		// .onGet(services.siteOverview)
		// .reply(200, siteOverview)
		// 液體單位轉換
		// .onGet(`${services.unitRates}?resourceUnit=2`)
		// .reply(200, capacity)
		// 重量單位轉換
		// .onGet(`${services.unitRates}?resourceUnit=1`)
		// .reply(200, weight)
		// 電力單位轉換
		// .onGet(`${services.unitRates}?resourceUnit=3`)
		// .reply(200, electricity)
		.onAny()
		.passThrough();
};
