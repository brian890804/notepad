/* eslint-disable */
import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import './cardList.scss';
import Card from '../../../../../components/charts/lineChart/card/Card';

const CardList = forwardRef(({ overView, trigger }, ref) => {
	const { current } = ref ?? {};
	return (
		<>
			<section className={classNames('card-list__groups')} ref={ref}>
				<Model overView={overView} />
			</section>
			{/* 滑到一定程度後貼在螢幕最上方的飄浮Card */}
			<section
				className={classNames(
					'card-list__groups',
					{ 'card-list__groups--sticky': true },
					{ 'card-list__groups--hidden': !trigger }
				)}
				style={{ right: current?.offsetRight }}
			>
				<Model overView={overView} trigger />
			</section>
		</>
	);
});

CardList.defaultProps = { overView: undefined, trigger: false };
CardList.propTypes = {
	overView: PropTypes.objectOf(PropTypes.any),
	trigger: PropTypes.bool,
};

const Model = ({ overView, trigger }) => {
	const { formatMessage } = useIntl();
	const { total, scopes } = overView ?? {};
	return (
		<>
			{/* 總碳排量Card */}
			{/* 特別只有子類別是7的時候才會把隱藏總類別 */}
			<div
				className={classNames('card-list__groups__item', { 'card-list__groups__item--hidden': overView && scopes.length === 7 })}
				style={{ flex: '0 1 25%' }}
			>
				{overView && (
					<Card
						trigger={trigger}
						scrollToChartTitle={formatMessage({ id: 'yearComparison.emission.total' })}
						type={scopes?.length > 3 ? 'medium' : 'small'}
						style={{ flex: '0 1 100%' }}
						{...{
							title: formatMessage({ id: 'yearComparison.totla.emission' }),
							value: {
								currentCalculated: total?.currentAmount,
								lastYearCalculated: total?.lastAmount,
							},
							date: {
								currentStartDate: total?.currentInfo?.startDate,
								currentEndDate: total?.currentInfo?.endDate,
								lastStartDate: total?.lastInfo?.startDate,
								lastEndDate: total?.lastInfo?.endDate,
							},
						}}
					/>
				)}
			</div>
			{/* 其他類別Card */}
			<div
				className={classNames('card-list__groups__item', {
					'card-list__groups__item--space': scopes?.length >= 3 && scopes?.length !== 7,
				})}
				style={{ flex: scopes?.length !== 7 ? `0 1 75%` : 1 }}
			>
				{/* 特別只有子類別是7的時候才會把總類別變小張並放入同個區塊 */}
				{overView && scopes?.length === 7 && (
					<Card
						trigger={trigger}
						scrollToChartTitle={formatMessage({ id: 'yearComparison.emission.total' })}
						type={'small'}
						style={{ flex: `1  1  calc(25% - 20px)` }}
						{...{
							title: formatMessage({ id: 'yearComparison.totla.emission' }),
							value: {
								currentCalculated: total?.currentAmount,
								lastYearCalculated: total?.lastAmount,
							},
							date: {
								currentStartDate: total?.currentInfo?.startDate,
								currentEndDate: total?.currentInfo?.endDate,
								lastStartDate: total?.lastInfo?.startDate,
								lastEndDate: total?.lastInfo?.endDate,
							},
						}}
					/>
				)}
				{scopes?.map(item => {
					const { currentAmount, lastAmount, currentInfo, lastInfo } = item ?? {};
					const { total } = overView ?? {};
					return (
						<Card
							total={total?.currentAmount + total?.lastAmount}
							key={item.title}
							trigger={trigger}
							type={'small'}
							scrollToChartTitle={`${item.title}${formatMessage({
								id: 'yearComparison.emission.line',
							})}`}
							style={{
								flex: scopes?.length === 2 ? 1 : scopes?.length === 7 ? '1 1 calc(25% - 20px)' : '1 1 30%',
							}}
							{...{
								title: item.title,
								value: {
									currentCalculated: currentAmount,
									lastYearCalculated: lastAmount,
								},
								date: {
									currentStartDate: currentInfo?.startDate,
									currentEndDate: currentInfo?.endDate,
									lastStartDate: lastInfo?.startDate,
									lastEndDate: lastInfo?.endDate,
								},
							}}
						/>
					);
				})}
			</div>
		</>
	);
};

Model.defaultProps = { overView: undefined, trigger: false };
Model.propTypes = {
	overView: PropTypes.objectOf(PropTypes.any),
	trigger: PropTypes.bool,
};

export default CardList;
