/* eslint-disable */
import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Form } from '@delta/dsp-ui/lib/antd';
import { DSPEmptyHelper } from '@delta/dsp-ui';

import './energy.scss';
import useApi from './useApi';
import TitleSelect from '../../../../components/titleSelect/TitleSelect';
import useGetBounding from '../utilities/useCatchBounding';
import CardList from '../component/card/CardList';
import LineChart from '../../../../components/charts/lineChart/LineChart';
import useOperation from '../../../../components/charts/utilities/useOperation';
import StackedChart from '../../../../components/charts/stackChart/StackChart';
import classNames from 'classnames';
import YearComparisonPieChart from '../component/YearComparisonPieChart';

const Energy = ({ form, chartData }) => {
	const { formatMessage } = useIntl();
	const containerRef = useRef();
	const { selectItemsMap } = useApi(form);
	const { overView, list, loading } = chartData ?? {};
	const { dataMonthConvertTypes, covertToDoublePieData } = useOperation();
	// 當畫面scroll超過 上方所有類別的Card
	const { trigger } = useGetBounding(containerRef);
	return (
		<article className="energy">
			<section className="energy__term">
				{selectItemsMap?.map(item => (
					<Form.Item name={item.key} key={item.key} hidden={!overView}>
						<TitleSelect {...item} />
					</Form.Item>
				))}
			</section>
			<CardList overView={overView} trigger={trigger} ref={containerRef} />
			<DSPEmptyHelper data={list || {}} loading={loading} className="energy__content">
				<YearComparisonPieChart
					className={classNames('animation--fade-in', 'energy__pie')}
					title={'年度比較圓餅圖'}
					data={covertToDoublePieData(overView?.scopes)}
				/>
				{overView && (
					<StackedChart
						className={'animation--fade-in'}
						chartType="stack"
						title={formatMessage({ id: 'yearComparison.emission.total' })}
						resource={dataMonthConvertTypes(overView?.scopeOverview)}
					/>
				)}
				{list?.map(item => {
					const { scopeOverview: totalOverview } = item ?? {};
					return (
						<LineChart
							className={'animation--fade-in'}
							showLegend
							key={totalOverview?.title}
							type="other"
							chartType="stack"
							title={`${totalOverview.title}${formatMessage({ id: 'yearComparison.emission.line' })}`}
							resource={totalOverview}
						/>
					);
				})}
			</DSPEmptyHelper>
		</article>
	);
};

Energy.defaultProps = {
	form: undefined,
	chartData: undefined,
};

Energy.propTypes = {
	form: PropTypes.objectOf(PropTypes.any),
	chartData: PropTypes.shape({
		list: PropTypes.arrayOf(PropTypes.any),
		overView: PropTypes.objectOf(PropTypes.any),
		loading: PropTypes.bool,
	}),
};
export default Energy;
