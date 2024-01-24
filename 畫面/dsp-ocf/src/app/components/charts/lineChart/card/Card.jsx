/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import useOperation from '../../utilities/useOperation';

const Card = ({ type, title, value, date, showContainer, style, scrollToChartTitle, trigger, total }) => {
	const { formatMessage } = useIntl();
	const { currentCalculated, lastYearCalculated } = value;
	const { currentStartDate, currentEndDate, lastStartDate, lastEndDate } = date;
	const { convertPercent, convertTimestampToMoth, convertProportion } = useOperation();
	const moveScrollY = () => {
		if (scrollToChartTitle) {
			const windowElement = document.querySelector('.home__body');
			const targetElement = document.querySelector(`section[title="${scrollToChartTitle}"]`);
			if (targetElement) {
				windowElement.scrollTo({
					top: targetElement.offsetTop - (trigger ? 300 : 200),
					behavior: 'smooth',
				});
			}
		}
	};
	const proportion = convertProportion(total, currentCalculated + lastYearCalculated);
	return (
		<article
			className={classNames(
				'year-card',
				{ 'year-card--show-container': showContainer },
				{ 'year-card--small': type === 'small' },
				{ 'year-card--medium': type === 'medium' },
				{ 'year-card--sticky': trigger }
			)}
			style={style}
			onClick={moveScrollY}
		>
			<div className={classNames('year-card__tip', { 'year-card__tip--show': trigger && type === 'medium' })}>
				{formatMessage({ id: 'yearComparison.calculateInterval' })}
				{`${convertTimestampToMoth(currentStartDate)}~${convertTimestampToMoth(currentEndDate)}`}
			</div>
			<div className={classNames({ 'year-card__row': trigger })}>
				<div className="year-card__title" title={`${title}${proportion}`}>
					<div className="year-card__title__description">{title}</div>
					<div className="year-card__title__proportion">{proportion}</div>
				</div>
				<section className="year-card__content">
					<div className="year-card__content__top ">
						<div className="year-card__content__top__left" style={{ flex: '0 0 35%', minWidth: 0 }}>
							<div className="year-card__content__title">{formatMessage({ id: 'yearComparison.calculateInterval' })}</div>
							<div className="year-card__content__date">{`(${convertTimestampToMoth(
								currentStartDate
							)}~ ${convertTimestampToMoth(currentEndDate)})`}</div>
						</div>
						<div className="year-card__content__top__center" style={{ flex: '0 0 35%' }}>
							<div className="year-card__content__value" title={currentCalculated?.toFixed(2)}>
								{Number(currentCalculated?.toFixed(2)).toLocaleString()}
							</div>
							<div className="year-card__content__unit">tCO2e</div>
						</div>
						<div
							style={{ flex: '0 0 30%' }}
							className="year-card__content__increase"
							title={convertPercent(currentCalculated, lastYearCalculated, 'tooltip')}
						>
							{convertPercent(currentCalculated, lastYearCalculated, trigger && 'icon')}
						</div>
					</div>
					<div className="year-card__divider">&nbsp;</div>
					<div className="year-card__content__bottom ">
						<div className="year-card__content__bottom__left" style={{ flex: '0 0 35%' }}>
							<div className="year-card__content__title">{formatMessage({ id: 'yearComparison.lastYear' })}</div>
							<div className="year-card__content__date">{`(${convertTimestampToMoth(lastStartDate)}~${convertTimestampToMoth(
								lastEndDate
							)})`}</div>
						</div>
						<div className="year-card__content__bottom__center" style={{ flex: '0 0 35%' }}>
							<div className="year-card__content__value" title={currentCalculated?.toFixed(2)}>
								{Number(lastYearCalculated?.toFixed(2)).toLocaleString()}
							</div>
							<div className="year-card__content__unit"> tCO2e</div>
						</div>
						<div style={{ flex: '0 0 30%' }} className="year-card__content__increaser" />
					</div>
				</section>
			</div>
		</article>
	);
};

Card.defaultProps = {
	type: 'small',
	title: undefined,
	value: undefined,
	date: undefined,
	showContainer: true,
	style: undefined,
	scrollToChartTitle: undefined,
	trigger: false,
	total: undefined,
};
Card.propTypes = {
	type: PropTypes.string,
	title: PropTypes.string,
	//currentCalculated lastYearCalculated (num)
	value: PropTypes.object,
	// currentStartDate currentEndDate lastStartDate lastEndDate (string)
	date: PropTypes.object,
	showContainer: PropTypes.bool,
	style: PropTypes.object,
	scrollToChartTitle: PropTypes.string,
	trigger: PropTypes.bool,
	total: PropTypes.number,
};

export default Card;
