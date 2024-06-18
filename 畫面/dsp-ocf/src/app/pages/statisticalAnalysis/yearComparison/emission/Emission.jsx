/* eslint-disable */
import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Form, Collapse } from '@delta/dsp-ui/lib/antd';
import { DSPEmptyHelper } from '@delta/dsp-ui';

import './emission.scss';
import useApi from './useApi';
import useCollapse from '../utilities/useCollapse';
import CardList from '../component/card/CardList';
import TitleSelect from '../../../../components/titleSelect/TitleSelect';
import LineChart from '../../../../components/charts/lineChart/LineChart';
import useOperation from '../../../../components/charts/utilities/useOperation';
import StackedChart from '../../../../components/charts/stackChart/StackChart';
import useCatchBounding from '../utilities/useCatchBounding';
import classNames from 'classnames';

const Emission = ({ form, chartData }) => {
	const { formatMessage } = useIntl();
	const containerRef = useRef();
	const { selectItemsMap } = useApi(form);
	const { overView, list, loading } = chartData ?? {};
	const { dataMonthConvertTypes } = useOperation();
	const { collapseStatus, handleCollapseChange } = useCollapse(list);
	// 當畫面scroll超過 上方所有類別的Card
	const { trigger } = useCatchBounding(containerRef);
	return (
		<section>
			<article className="emission">
				<section className="emission__term">
					{/* 規範 基準 GWP */}
					{selectItemsMap?.map(item => (
						<Form.Item name={item.key} key={item.key} hidden={!overView}>
							<TitleSelect {...item} />
						</Form.Item>
					))}
				</section>
				<CardList overView={overView} trigger={trigger} ref={containerRef} />
				<DSPEmptyHelper data={overView || {}} loading={loading} className="emission__content">
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
							<div className={classNames('emission__chart__groups', 'animation--fade-in')} key={totalOverview.scopeId}>
								<StackedChart
									showLegend
									chartType="stack"
									outFrame={false}
									title={`${totalOverview.title}${formatMessage({ id: 'yearComparison.emission.line' })}`}
									resource={dataMonthConvertTypes(totalOverview)}
								/>
								<Collapse
									className={'emission__chart__groups__collapse'}
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
											<div style={{ width: 'calc(50% - 18px)' }} key={detail.scopeId}>
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

Emission.defaultProps = {
	form: undefined,
	chartData: undefined,
};

Emission.propTypes = {
	form: PropTypes.objectOf(PropTypes.any),
	chartData: PropTypes.shape({
		list: PropTypes.arrayOf(PropTypes.any),
		overView: PropTypes.objectOf(PropTypes.any),
		loading: PropTypes.bool,
	}),
};
export default Emission;
