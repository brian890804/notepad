/* eslint-disable */
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { DSPHandleAxiosError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import services from '../../../../config/services';

export default () => {
	const {
		search: { type },
	} = DSPUseNavAppendSearch();
	const intl = useIntl();
	// 碳排
	const { axiosApi: fetchEmissionOverView, data: emissionOverView, loading: emissiontOverViewLoading } = DSPUseAxios().usePost();
	const { axiosApi: fetchEmissionList, data: emissionList, loading: emissiontlistLoading } = DSPUseAxios().usePost();
	// 電力
	const { axiosApi: fetchElectricity, data: electricity, loading: electricitywLoading } = DSPUseAxios().usePost();
	// 能源
	const { axiosApi: fetchEnergy, data: energy, loading: energyLoading } = DSPUseAxios().usePost();
	// 水資源
	const { axiosApi: fetchWater, data: water, loading: waterLoading } = DSPUseAxios().usePost();
	// 廢棄物
	const { axiosApi: fetcGarbage, data: garbage, loading: garbageLoading } = DSPUseAxios().usePost();

	const emissionData = {
		overView: emissionOverView,
		list: emissionList,
		loading: emissiontOverViewLoading || emissiontlistLoading,
	};

	const electricityData = {
		overView: electricity?.overview,
		list: electricity?.scopes,
		loading: electricitywLoading,
	};

	const energyData = {
		overView: energy?.overview,
		list: energy?.scopes,
		loading: energyLoading,
	};

	const waterData = {
		overView: water?.overview,
		list: water?.scopes,
		loading: waterLoading,
	};

	const garbageData = {
		overView: garbage?.overview,
		list: garbage?.scopes,
		loading: garbageLoading,
	};

	const chartData = {
		emissionData,
		electricityData,
		energyData,
		waterData,
		garbageData,
	};

	const handleEmissionSubmit = useCallback(values => {
		const data = {
			...values,
			rootScopeId: values?.rootScopeId?.value,
			ghgBased: values?.ghgBased?.value,
			gwpId: values?.gwpId?.value,
		};

		fetchEmissionOverView({
			url: services.yearEmissionOverview,
			data: data,
			mapper: resp => resp.data.result,
		}).catch(error => DSPHandleAxiosError({ error, intl }));

		fetchEmissionList({
			url: services.yearEmissionList,
			data: data,
			mapper: resp => resp.data.result,
		}).catch(error => DSPHandleAxiosError({ error, intl }));
	}, []);

	const handleElectricitySubmit = useCallback(values => {
		const data = {
			...values,
			ghgBased: values?.ghgBased?.value,
		};
		fetchElectricity({
			url: services.yearElectricity,
			data: data,
			mapper: resp => resp.data.result,
		}).catch(error => DSPHandleAxiosError({ error, intl }));
	}, []);

	const handleEnergySubmit = useCallback(values => {
		const data = {
			...values,
			ghgBased: values?.ghgBased?.value,
			gwpId: values?.gwpId?.value,
		};
		fetchEnergy({
			url: services.yearEnergy,
			data: data,
			mapper: resp => resp.data.result,
		}).catch(error => DSPHandleAxiosError({ error, intl }));
	}, []);

	const handleWaterSubmit = useCallback(values => {
		const data = {
			...values,
			gwpId: values?.gwpId?.value,
		};
		fetchWater({
			url: services.yearWater,
			data: data,
			mapper: resp => resp.data.result,
		}).catch(error => DSPHandleAxiosError({ error, intl }));
	}, []);

	const handleGarbageSubmit = useCallback(values => {
		const data = {
			...values,
			gwpId: values?.gwpId?.value,
		};
		fetcGarbage({
			url: services.yearGarbage,
			data: data,
			mapper: resp => resp.data.result,
		}).catch(error => DSPHandleAxiosError({ error, intl }));
	}, []);

	const handleSubmit = useCallback(
		values => {
			let temp = { ...values };
			temp = { ...temp, ...temp[type] };
			delete temp[type];
			switch (type) {
				case 'emission':
					return handleEmissionSubmit(temp);
				case 'electricity':
					return handleElectricitySubmit(temp);
				case 'energy':
					return handleEnergySubmit(temp);
				case 'water':
					return handleWaterSubmit(temp);
				case 'garbage':
					return handleGarbageSubmit(temp);
				default:
					break;
			}
		},
		[type]
	);

	const handleValuesChange = (changedValues, allValues) => {
		const conformList = ['ghgBased', 'rootScopeId', 'gwpId'];
		if (changedValues?.[type]) {
			const value = Object.keys(changedValues?.[type])[0];
			if (conformList.some(item => item === value)) handleSubmit(allValues);
		}
	};

	return { handleSubmit, chartData, handleValuesChange };
};
