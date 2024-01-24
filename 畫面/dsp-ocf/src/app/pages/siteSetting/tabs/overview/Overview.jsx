import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Empty, Spin } from '@delta/dsp-ui/lib/antd';
import { DSPForm } from '@delta/dsp-ui';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';
import useOverviewFormSchema from './useOverviewFormSchema';
import useApi from './useApi';
import PieChart from '../../../../components/charts/pieChart/PieChart';

import './overview.scss';

const Overview = ({ siteId }) => {
	const [form] = DSPForm.useForm();
	const { formatMessage } = useIntl();

	const { handleSubmit, locationLoading, locationData, marketLoading, marketData } = useApi({ siteId });

	const hasData = useMemo(() => locationData?.chartData?.length > 0 || marketData?.chartData?.length > 0, [locationData, marketData]);

	const renderPieChart = useCallback(
		({ subtitle, data }) => (
			<PieChart
				// 組織填寫進度
				// title={Number.isNaN(progress) ? '' : `${formatMessage({ id: 'site.setting.overview.fill.progress' })} ${progress}%`}
				title={subtitle}
				data={data}
				tooltip={{
					headerFormat: null,
					pointFormatter() {
						const { scopeName, percent, y } = this;
						return `${scopeName ? `<b style="font-size: 14px">${scopeName}</b><br>` : ''}
					<b>${formatMessage({ id: 'site.setting.overview.emission' })}: ${percent} %</b><br>
					<b>${y.toLocaleString()} tCO2e</b>`;
					},
				}}
				series={[
					{
						// 比例
						name: formatMessage({ id: 'common.proportaion' }), // 內圈 tooltip title
						dataLabels: { format: '<b>{point.name}</b>' }, // 圓餅圖內圈 label
					},
					{
						// 排放比例
						name: formatMessage({ id: 'site.setting.overview.emission.proportaion' }), // 外圈 tooltip title
						dataLabels: {
							// 圓餅圖外圈 label
							format: `<b>{point.scopeName} ({point.percent}%)</b><br/>
							<span style="opacity: 0.8">{point.yLocaleString} tCO2e</span>`,
						},
					},
				]}
			/>
		),
		[]
	);

	return (
		<Spin wrapperClassName={classNames('site-overview', 'scrollbarSmall')} spinning={locationLoading || marketLoading}>
			<DSPForm
				form={form}
				className="site-overview__header"
				formSchema={useOverviewFormSchema({ form, handleSubmit })}
				// initialValues={{ rangeDate: [dayjs().add(-11, 'M').startOf('M').valueOf(), dayjs().endOf('M').valueOf()] }}
				initialValues={{ rangeDate: [dayjs().startOf('y').valueOf(), dayjs().endOf('y').valueOf()] }}
				onValuesChange={(_, values) => handleSubmit(values)}
			/>
			{hasData ? (
				<div className="site-overview__body">
					{/* Location */}
					{locationData?.chartData?.length > 0 &&
						renderPieChart({
							progress: locationData?.totalProgress,
							subtitle: formatMessage({ id: 'common.location.base' }),
							data: locationData?.chartData,
						})}
					{/* Market */}
					{marketData?.chartData?.length > 0 &&
						renderPieChart({
							progress: marketData?.totalProgress,
							subtitle: formatMessage({ id: 'common.market.base' }),
							data: marketData?.chartData,
						})}
				</div>
			) : (
				<Empty className="site-overview__empty" />
			)}
		</Spin>
	);
};

Overview.defaultProps = {
	siteId: undefined,
};

Overview.propTypes = {
	siteId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Overview;
