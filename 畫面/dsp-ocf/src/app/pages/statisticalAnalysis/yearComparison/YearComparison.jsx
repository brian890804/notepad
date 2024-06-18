/* eslint-disable */
import React from 'react';
import { ConfigProvider, Form } from '@delta/dsp-ui/lib/antd';
import './yearComparison.scss';
import YearComparisonHeader from './component/header/YearComparisonHeader';
import YearComparisonTabs from './component/tabs/YearComparisonTabs';
import useApi from './useApi';
import useFormSchema from './useFormSchema';
import { useState } from 'react';
import { useEffect } from 'react';
import { DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';

let firstIn = false;
const YearComparison = () => {
	const {
		search: { type },
	} = DSPUseNavAppendSearch();
	const [isUpdate, setIsUpdate] = useState(false);
	const { handleSubmit, chartData, handleValuesChange } = useApi();
	const [form] = Form.useForm();
	const { initialValues, headerItems } = useFormSchema({ form, chartData });
	useEffect(() => {
		if (isUpdate) {
			if (firstIn) {
				(async () => {
					await new Promise(resolve => setTimeout(resolve, 300));
					await handleSubmit(form.getFieldsValue());
				})();
			}
			firstIn = true;
		}
	}, [isUpdate, type]);

	return (
		<ConfigProvider
			theme={{
				components: {
					DatePicker: {
						colorTextPlaceholder: '#8c8c8c',
						colorIcon: '#8c8c8c',
					},
				},
				token: {
					colorBorder: 'rgba(0, 0, 0, 0.2)',
				},
			}}
		>
			<Form
				form={form}
				onFinish={handleSubmit}
				className="yearComparison"
				initialValues={{ ...initialValues }}
				onValuesChange={handleValuesChange}
			>
				<YearComparisonHeader setIsUpdate={setIsUpdate} />
				<div className="yearComparison__body">
					<YearComparisonTabs headerItems={headerItems} />
				</div>
			</Form>
		</ConfigProvider>
	);
};
YearComparison.propTypes = {};

export default YearComparison;
