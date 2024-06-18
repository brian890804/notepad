import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
// import { Button } from '@delta/dsp-ui/lib/antd';
// import { ReloadOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import MonthRangePicker from './monthRangePicker/MonthRangePicker';
import services from '../../../../../config/services';
import TitleSelect from '../../../../components/titleSelect/TitleSelect';

const useOverviewFormSchema = ({ form, handleSubmit }) => {
	const { formatMessage } = useIntl();

	const { axiosApi: getScopeOption, loading: scopeLoading, data: scopeOptions } = DSPUseAxios().useGet();
	const { axiosApi: getGWPOption, loading: gwpLoading, data: gwpOptions } = DSPUseAxios().useGet();
	const ghgBasedOptions = [
		{ label: formatMessage({ id: 'common.both' }), value: 'both' },
		{ label: formatMessage({ id: 'common.location.base' }), value: 'location' },
		{ label: formatMessage({ id: 'common.market.base' }), value: 'market' },
	];

	useEffect(() => {
		getScopeOption({ url: services.scope, mapper: resp => resp?.data?.result });
		getGWPOption({ url: services.dropdowns.replace('{cate}', 'gwp'), mapper: resp => resp?.data?.result });
	}, []);

	useEffect(() => {
		if (scopeOptions?.length > 0 && gwpOptions?.length > 0) {
			const formValues = { scope: scopeOptions[0], ghgBased: ghgBasedOptions[0], gwp: gwpOptions[0] };
			form.setFieldsValue(formValues);
			handleSubmit({ ...formValues, rangeDate: form.getFieldValue('rangeDate') });
		}
	}, [scopeOptions, gwpOptions]);

	return [
		// 起訖月份
		{
			label: formatMessage({ id: 'project.schema.statistics.interval' }),
			name: 'rangeDate',
			width: 300,
			required: true,
			render: () => <MonthRangePicker />,
		},
		// 規範
		{
			name: 'scope',
			width: 'fit-content',
			required: true,
			// type: 'select',
			loading: scopeLoading,
			options: scopeOptions,
			render: () => <TitleSelect title={formatMessage({ id: 'yearComparison.rootScope' })} />,
		},
		// 基準
		{
			name: 'ghgBased',
			width: 'fit-content',
			required: true,
			// type: 'select',
			options: ghgBasedOptions,
			render: () => <TitleSelect title={formatMessage({ id: 'yearComparison.ghgBased' })} />,
		},
		// GWP版本
		{
			name: 'gwp',
			width: 'fit-content',
			required: true,
			// type: 'select',
			loading: gwpLoading,
			options: gwpOptions,
			render: () => <TitleSelect title={formatMessage({ id: 'yearComparison.gwp.version' })} />,
		},
		// { name: 'submit', width: 40, render: () => <Button icon={<ReloadOutlined />} onClick={handleSubmit} /> },
	];
};

export default useOverviewFormSchema;
