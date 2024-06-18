/* eslint-disable */
import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Form, Collapse } from '@delta/dsp-ui/lib/antd';
import { DSPEmptyHelper } from '@delta/dsp-ui';

import './water.scss';
import useApi from './useApi';
import useCollapse from '../utilities/useCollapse';
import CardList from '../component/card/CardList';
import TitleSelect from '../../../../components/titleSelect/TitleSelect';
import LineChart from '../../../../components/charts/lineChart/LineChart';
import useOperation from '../../../../components/charts/utilities/useOperation';
import StackedChart from '../../../../components/charts/stackChart/StackChart';
import useCatchBounding from '../utilities/useCatchBounding';
import classNames from 'classnames';
import PieChart from '../../../../components/charts/pieChart/PieChart';
import YearComparisonPieChart from '../component/YearComparisonPieChart';
import { useMemo } from 'react';

const Water = ({ form, chartData }) => {
	const { formatMessage } = useIntl();
	const containerRef = useRef();
	const { selectItemsMap } = useApi(form);
	const { overView, list, loading } = chartData ?? {};
	const { dataMonthConvertTypes, covertToDoublePieData, concatSameKeyData } = useOperation();
	const { collapseStatus, handleCollapseChange } = useCollapse(list);
	// 當畫面scroll超過 上方所有類別的Card
	const { trigger } = useCatchBounding(containerRef);
	const pieData = useMemo(() => concatSameKeyData('name', covertToDoublePieData(list?.flatMap(item => item?.scopesDetails))), [list]);
	return (
		<section>
			<article className="water">
				<section className="water__term">
					{/* 規範 基準 GWP */}
					{selectItemsMap?.map(item => (
						<Form.Item name={item.key} key={item.key} hidden={!overView}>
							<TitleSelect {...item} />
						</Form.Item>
					))}
				</section>
				<CardList overView={overView} trigger={trigger} ref={containerRef} />
				<DSPEmptyHelper data={overView || {}} loading={loading} className="water__content">
					<div className={classNames('water__chart__groups', 'water__chart__pie', 'animation--fade-in')}>
						<div className="water__chart__groups__title">年度總類別比較</div>
						<YearComparisonPieChart data={covertToDoublePieData(overView?.scopes)} />
						<YearComparisonPieChart data={pieData} />
					</div>
					{/* 總探排量長條圖 */}
					{overView && (
						<StackedChart
							showLegend
							chartType="stack"
							className={'animation--fade-in'}
							title={formatMessage({ id: 'yearComparison.emission.total' })}
							resource={dataMonthConvertTypes(overView?.scopeOverview)}
						/>
					)}
					{/* 下方長條圖 */}
					{list?.map(item => {
						const { scopeOverview: totalOverview, scopesDetails: details } = item ?? undefined;
						return (
							<div className={classNames('water__chart__groups', 'animation--fade-in')} key={totalOverview.title}>
								<StackedChart
									showLegend
									chartType="stack"
									outFrame={false}
									title={`${totalOverview.title}${formatMessage({ id: 'yearComparison.emission.line' })}`}
									resource={dataMonthConvertTypes(totalOverview)}
								/>
								<Collapse
									className={'water__chart__groups__collapse'}
									onChange={e => handleCollapseChange(totalOverview.title, e.length > 0)}
								>
									<Collapse.Panel
										key={totalOverview.title}
										showArrow={false}
										header={`${
											collapseStatus?.[totalOverview.title]
												? formatMessage({ id: 'yearComparison.collapse.fold' })
												: formatMessage({ id: 'yearComparison.collapse.expand' })
										}`}
									>
										{details.map(detail => (
											<div style={{ width: 'calc(50% - 18px)' }} key={detail.title}>
												<LineChart type="other" title={detail.title} resource={detail} showLegend />
											</div>
										))}
									</Collapse.Panel>
								</Collapse>
							</div>
						);
					})}
				</DSPEmptyHelper>
			</article>
		</section>
	);
};

Water.defaultProps = {
	form: undefined,
	chartData: undefined,
};

Water.propTypes = {
	form: PropTypes.objectOf(PropTypes.any),
	chartData: PropTypes.shape({
		list: PropTypes.arrayOf(PropTypes.any),
		overView: PropTypes.objectOf(PropTypes.any),
		loading: PropTypes.bool,
	}),
};
export default Water;
