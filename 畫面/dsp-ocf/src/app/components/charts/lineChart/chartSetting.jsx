/* eslint-disable */
import React from 'react';
import { useIntl } from 'react-intl';
import Card from './card/Card';
import useOperation from '../utilities/useOperation';

export default ({ resource, type, title, showLegend, showXUnit }) => {
	const { formatMessage } = useIntl();
	const i18nMonth = formatMessage({ id: 'common.unit.month' });
	const { isPositiveInteger, convertPercent, convertTimestampToMoth } = useOperation();
	const formatTooltipItem = item => {
		const { title, currentAmount, lastAmount } = item || {};
		const value = convertPercent(currentAmount.toFixed(2), lastAmount.toFixed(2), 'string');
		const judgeNumberColor = isPositiveInteger(currentAmount, lastAmount) ? 'green' : 'red';
		return `<div style="font-size:12px;font-weight:600;">
		  <div style="font-weight:900;">${title}：</div><br/>
		  ${formatMessage({ id: 'yearComparison.calculate.time' })}：${currentAmount.toFixed(2)}
		  ${value ? `(<div style="color:${judgeNumberColor}">${value}</div>)` : ''}
		  <br/>
		  ${formatMessage({ id: 'yearComparison.lastYear' })}：${lastAmount.toFixed(2)}
		</div><br/>`;
	};

	const getCustomItem = function () {
		const pointIndex = this.point.index;
		const { tooltip: tip } = this?.series?.chart?.options?.customData ?? {};
		return tip?.[pointIndex]?.scopes;
	};

	const getTypeInitTooltipHTML = function (items) {
		const html = items?.map(item => formatTooltipItem(item))?.join('');
		return `<div style="color:rgb(0, 135, 220);font-size:18px;margin-bottom:10px">${this.x}</div><br/>${html}`;
	};

	const tooltip = {
		valueDecimals: 2,
		valueSuffix: ' (tCO2e)',
		enabled: true,
		shape: 'rect',
		shared: true,
		backgroundColor: 'rgba(255, 255, 255, 0.9)', // 設置背景顏色
		borderColor: '#000', // 設置邊框顏色
		borderRadius: 5, // 設置邊框圓角
		headerFormat: `<div style="color:rgb(0, 135, 220); font-weight:bold;">{point.key}</div><br/>`,
		pointFormatter() {
			const { series, y } = this;
			return `${series.name}: <b></b> ${Number(y.toFixed(2)).toLocaleString()} tCO2e</b><br/>`;
		},
		formatter: function (e) {
			const items = getCustomItem.call(this); // 使用call来传递正确的上下文
			if (type === 'init') {
				return getTypeInitTooltipHTML.call(this, items, e);
			}
			return e.defaultFormatter.call(this, e);
		},
	};

	const legend = {
		align: type === 'init' ? 'right' : 'left',
		floating: true,
		enabled: showLegend,
		verticalAlign: 'top',
		symbolHeight: type === 'init' ? 17 : 13, // 圖例符號的高度
		symbolPadding: 5, // 圖例符號與文字的間距
		symbolRadius: 4, // 圖例符號的圓角半徑
		symbol: 'square', // 圖例符號的形狀（'circle', 'square', 'diamond', 'triangle' 等）
		itemStyle: {
			fontSize: type === 'init' ? 18 : 14,
			fontWeight: 'bold',
		},
		x: type === 'init' ? 0 : -5,
		y: type === 'init' ? -8 : 30,
		labelFormatter() {
			// 在這裡進行自定義的 HTML 返回
			if (type === 'init') {
				return `${this.name}<br/><span style="font-size:10px;">(${convertTimestampToMoth(this.userOptions?.startDate)}~${
					convertTimestampToMoth(this.userOptions.endDate) || ''
				})</span>`;
			}
			return `${this.name}`;
		},
	};

	const month = (() => {
		if (resource) {
			const unitShow = showXUnit ? i18nMonth : '';
			const months = resource.months ?? [];
			return [...months.map(item => `${item.month}${unitShow}`)];
		}
		return Array.from({ length: 12 }, (_, index) => `${index}`);
	})();

	const xAxis = {
		crosshair: false,
		categories: month,
		tickWidth: 0,
		fontWeight: '500',
		labels: {
			style: {
				fontSize: '12px',
				fontWeight: 'normal',
			},
		},
	};

	const yAxis = {
		min: 0,
		title: {
			text: '<div style="font-weight:bolder;font-size:14px;">排碳量</div><br/>tCO2e',
			rotation: 0,
			align: 'low',
			textAlign: 'right',
			offset: 0,
			y: 30,
		},
	};

	const chart = {
		type: 'column',
		margin: [type === 'init' ? 100 : 140, 20, 60, 80],
		style: {
			fontWeight: '600', // 將標題文字設置為粗體
		},
	};

	const series = (() => {
		if (resource) {
			const { lastInfo, months = [], currentInfo } = resource ?? {};
			return [
				// 前面流一個空的因 xAxis 對不上 hover 後顯示粗體會有問題
				{
					name: formatMessage({ id: 'yearComparison.calculate.last' }),
					startDate: lastInfo?.startDate,
					endDate: lastInfo?.endDate,
					data: [...months.map(item => item.lastAmount)],
				},
				{
					name: formatMessage({ id: 'yearComparison.calculate.now' }),
					startDate: currentInfo?.startDate,
					data: [...months.map(item => item.currentAmount)],
				},
			];
		}
		return [];
	})();

	const typeRnder = () => {
		if (type !== 'init') {
			const handleAccumulator = numbers => {
				return numbers?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
			};
			return (
				<div className="line-chart__detail">
					<Card
						type={'small'}
						showContainer={false}
						{...{
							value: {
								lastYearCalculated: handleAccumulator(series[0]?.data),
								currentCalculated: handleAccumulator(series[1]?.data),
							},
							date: {
								currentStartDate: resource?.currentInfo?.startDate,
								currentEndDate: resource?.currentInfo?.endDate,
								lastStartDate: resource?.lastInfo?.startDate,
								lastEndDate: resource?.lastInfo?.endDate,
							},
						}}
					/>
				</div>
			);
		}
		return '';
	};

	const chartTitle = {
		text: title,
		verticalAlign: 'top',
		align: 'left',
		useHTML: true,
		widthAdjust: -(window.innerWidth / 6),
		style: {
			fontSize: '24px', // 使用 rem 單位
			fontWeight: 'bold', // 將標題文字設置為粗體
			color: '#0087DC',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			margin: '0 auto',
		},
	};

	const customData = {
		tooltip: resource?.months?.map(month => month),
	};
	const accessibility = {
		enabled: false,
	};
	return {
		chartProps: { chart, series, tooltip, legend, xAxis, yAxis, customData, accessibility, title: chartTitle },
		typeRnder,
	};
};
