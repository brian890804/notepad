import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { DSPForm, DSPEmptyHelper } from '@delta/dsp-ui';
import { Row, Col } from '@delta/dsp-ui/lib/antd';
import ComparisonFilterSelect from './ComparisonFilterSelect';
import StackedChart from '../chart/StackedChart';
import DonutPieChart from '../chart/DonutPieChart';
import useOperation from '../../../../components/charts/utilities/useOperation';

const SiteChartContainer = ({ form, type, chartData, selectItemsMap, isFilterUpdate, loading }) => {
	const { convertTimestampToMoth } = useOperation();
	const { stackedList, donutList, donutTopLevelList, donutBottomLevelList } = chartData?.[type] || {};
	const rangeDate = DSPForm.useWatch('rangeDate', form);

	const [date, setDate] = useState();

	const isChartExisting = useMemo(() => {
		if (!stackedList && !donutList) return false;
		if (!(stackedList || donutTopLevelList || donutBottomLevelList)) return false;
		return true;
	}, [stackedList, donutList, donutTopLevelList, donutBottomLevelList]);

	useEffect(() => {
		if (rangeDate) {
			const startDate = convertTimestampToMoth(rangeDate[0]);
			const endDate = convertTimestampToMoth(rangeDate[1]);
			setDate({ startDate, endDate });
		}
	}, [rangeDate]);

	return (
		<>
			<Row
				gutter={[{ xs: 0, md: 10 }, 10]}
				className="siteComparison__body__filter"
				style={{ display: isFilterUpdate ? '' : 'none' }}
			>
				{selectItemsMap?.map(selectItem => (
					<Col key={selectItem.key} xs={24} md={selectItem.span}>
						<ComparisonFilterSelect item={selectItem} />
					</Col>
				))}
			</Row>
			<DSPEmptyHelper className="siteComparison__body__chart" data={isChartExisting || []} loading={loading}>
				{stackedList && (
					<Row gutter={10}>
						<Col span={24}>
							<StackedChart date={date} type={type} resource={stackedList} />
						</Col>
					</Row>
				)}
				{donutList && (
					<Row gutter={[{ xs: 0, lg: 10 }, 10]} wrap>
						<Col xs={24} lg={24}>
							<DonutPieChart date={date} type={type} resource={donutList} />
						</Col>
					</Row>
				)}
				{(donutTopLevelList || donutBottomLevelList) && (
					<Row gutter={[{ xs: 0, lg: 10 }, 10]} wrap>
						{donutTopLevelList && (
							<Col xs={24} lg={donutBottomLevelList ? 12 : 24}>
								<DonutPieChart date={date} type={type} resource={donutTopLevelList} />
							</Col>
						)}
						{donutBottomLevelList && (
							<Col xs={24} lg={donutTopLevelList ? 12 : 24}>
								<DonutPieChart date={date} type={type} resource={donutBottomLevelList} />
							</Col>
						)}
					</Row>
				)}
			</DSPEmptyHelper>
		</>
	);
};

SiteChartContainer.defaultProps = {
	form: undefined,
	type: undefined,
	chartData: undefined,
	selectItemsMap: undefined,
	isFilterUpdate: undefined,
	loading: undefined,
};

SiteChartContainer.propTypes = {
	/** 篩選條件的表單 */
	form: PropTypes.objectOf(PropTypes.any),
	/** 切換的 Tab 類型 */
	type: PropTypes.string,
	/** 圖表資料 */
	chartData: PropTypes.shape({
		stackedList: PropTypes.arrayOf(PropTypes.any),
		donutList: PropTypes.arrayOf(PropTypes.any),
		donutTopLevelList: PropTypes.arrayOf(PropTypes.any),
		donutBottomLevelList: PropTypes.arrayOf(PropTypes.any),
	}),
	/** 類別的篩選條件 */
	selectItemsMap: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.arrayOf(PropTypes.string),
			title: PropTypes.string,
			span: PropTypes.number,
			options: PropTypes.arrayOf(PropTypes.any),
		})
	),
	/** 是否為更新狀態 */
	isFilterUpdate: PropTypes.bool,
	/** 資料 loading */
	loading: PropTypes.bool,
};

export default SiteChartContainer;
