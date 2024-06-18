import { DSPForm } from '@delta/dsp-ui';
import { Col, Form, Row, Segmented } from '@delta/dsp-ui/lib/antd';
import { DSPHandleAxiosError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import services from '../../../../config/services';
import SiteChartContainer from './wrapper/SiteChartContainer';
import SiteComparisonHeader from './wrapper/SiteComparisonHeader';
import useApi from './wrapper/useApi';

import './siteComparison.scss';

const initialValues = {
	sites: [],
	rangeDate: [dayjs().startOf('y').valueOf(), dayjs().endOf('y').valueOf()],
};

const SiteComparison = () => {
	const intl = useIntl();
	const { formatMessage } = intl;
	const [form] = DSPForm.useForm();
	const {
		search: { type },
		navigateReplace,
	} = DSPUseNavAppendSearch();
	const { selectItemsMap, loading: selectionLoading } = useApi(form, type);

	/** 取得多據點比較的圖表資料 */
	const { axiosApi: getSiteComparisonEmission } = DSPUseAxios().usePost();
	const { axiosApi: getSiteComparisonElectricity } = DSPUseAxios().usePost();
	const { axiosApi: getSiteComparisonEnergy } = DSPUseAxios().usePost();
	const { axiosApi: getSiteComparisonWater } = DSPUseAxios().usePost();
	const { axiosApi: getSiteComparisonGarbage } = DSPUseAxios().usePost();

	const [chartData, setChartData] = useState({});

	const [state, setState] = useState({ chartLoading: false, isFilterUpdate: false });

	const { chartLoading, isFilterUpdate } = state;

	const axiosAPIs = useMemo(
		() => [
			{ type: 'emission', apiUrl: services.siteReportEmission, func: getSiteComparisonEmission },
			{ type: 'electricity', apiUrl: services.siteReportElectricity, func: getSiteComparisonElectricity },
			{ type: 'energy', apiUrl: services.siteReportEnergy, func: getSiteComparisonEnergy },
			{ type: 'water', apiUrl: services.siteReportWater, func: getSiteComparisonWater },
			{ type: 'garbage', apiUrl: services.siteReportGarbage, func: getSiteComparisonGarbage },
		],
		[getSiteComparisonEmission, getSiteComparisonElectricity, getSiteComparisonEnergy, getSiteComparisonWater, getSiteComparisonGarbage]
	);

	const headerItems = useMemo(
		() => [
			{
				value: 'emission',
				label: formatMessage({ id: 'yearComparison.emission' }),
			},
			{
				value: 'electricity',
				label: '電力',
			},
			{
				value: 'energy',
				label: formatMessage({ id: 'yearComparison.energy' }),
			},
			{
				value: 'water',
				label: formatMessage({ id: 'yearComparison.water' }),
			},
			{
				value: 'garbage',
				label: formatMessage({ id: 'yearComparison.garbage' }),
			},
		],
		[]
	);

	const handleAPICall = (tabType, payload) => {
		setState(prev => ({ ...prev, chartLoading: true }));
		setChartData(prev => ({ ...prev, [tabType]: {} }));

		const promise = axiosAPIs.find(v => v.type === tabType);
		if (promise) {
			promise
				.func({
					url: promise.apiUrl,
					data: payload,
					mapper: resp => resp?.data?.result,
				})
				.then(result => {
					setChartData(prev => ({ ...prev, [tabType]: result }));
					setState(prev => ({ ...prev, chartLoading: false, isFilterUpdate: true }));
				})
				.catch(error => {
					DSPHandleAxiosError({ error, intl });
					setState(prev => ({ ...prev, chartLoading: false }));
				});
		}
	};

	const handleTabClick = value => {
		const formData = form.getFieldsValue(['sites', 'rangeDate', [[value], 'ghgBased'], [[value], 'rootScopeId'], [[value], 'gwpId']]);
		const { ghgBased, rootScopeId, gwpId } = formData[value] || {};

		const payload = {
			startDate: formData.rangeDate[0],
			endDate: formData.rangeDate[1],
			...(ghgBased && { ghgBased: ghgBased.value }),
			...(rootScopeId && { rootScopeId: rootScopeId.value }),
			...(gwpId && { gwpId: gwpId.value }),
			siteIds: formData.sites?.map(s => s.value),
		};

		navigateReplace({ type: value });
		handleAPICall(value, payload);
	};

	const handleValuesChange = (changedValues, values) => {
		const { rangeDate } = changedValues;
		const { ghgBased, rootScopeId, gwpId } = changedValues[type] || {};

		if (rangeDate) {
			const rangeMonth = dayjs(rangeDate[1]).diff(rangeDate[0], 'month');

			if (rangeMonth >= 12) {
				form.setFieldsValue({ rangeDate: [rangeDate[0], dayjs(rangeDate[0]).add(11, 'M').valueOf()] });
			}
		}

		if (ghgBased || rootScopeId || gwpId) {
			const payload = {
				startDate: values.rangeDate[0],
				endDate: values.rangeDate[1],
				...(values[type].ghgBased && { ghgBased: values[type].ghgBased.value }),
				...(values[type].rootScopeId && { rootScopeId: values[type].rootScopeId.value }),
				...(values[type].gwpId && { gwpId: values[type].gwpId.value }),
				siteIds: values.sites?.map(s => s.value),
			};

			handleAPICall(type, payload);
		}
	};

	const handleSubmit = formData => {
		const { ghgBased, rootScopeId, gwpId } = formData[type] || {};

		const payload = {
			startDate: formData.rangeDate[0],
			endDate: formData.rangeDate[1],
			...(ghgBased && { ghgBased: ghgBased.value }),
			...(rootScopeId && { rootScopeId: rootScopeId.value }),
			...(gwpId && { gwpId: gwpId.value }),
			siteIds: formData.sites?.map(s => s.value),
		};

		handleAPICall(type, payload);
	};

	useEffect(() => {
		if (!type) {
			navigateReplace({ type: 'emission' });
		}
	}, []);

	return (
		<Form
			form={form}
			className="siteComparison"
			layout="horizontal"
			initialValues={initialValues}
			onValuesChange={handleValuesChange}
			onFinish={handleSubmit}
		>
			<SiteComparisonHeader isFilterUpdate={isFilterUpdate} />
			<div className="siteComparison__body">
				<Row>
					<Col xs={24}>
						<Segmented options={headerItems} value={type} block onChange={handleTabClick} />
					</Col>
				</Row>
				<Row>
					{headerItems.map(headerItem => {
						if (type === headerItem.value) {
							return (
								<Col key={headerItem.value} xs={24}>
									<SiteChartContainer
										{...{ form, type, chartData, selectItemsMap, isFilterUpdate }}
										loading={chartLoading || selectionLoading}
									/>
								</Col>
							);
						}
						return null;
					})}
				</Row>
			</div>
		</Form>
	);
};

export default SiteComparison;
