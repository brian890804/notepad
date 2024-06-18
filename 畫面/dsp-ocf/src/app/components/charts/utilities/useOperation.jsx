/* eslint-disable*/
import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@delta/dsp-ui/lib/antd/icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import classNames from 'classnames';
import { isArray, isNumber } from 'lodash-es';
import addIcon from '../../../../assets/images/yearComparion/add.png';
import reduceIcon from '../../../../assets/images/yearComparion/reduce.png';
import './useOperation.scss';

export default () => {
	const isPositiveInteger = (current, last) => Math.sign((current - last) / last);

	const convertPercent = (current, last, returnType = 'init') => {
		const operation = Number(Math.abs(((current - last) / last) * 100).toFixed(2));
		const isPositive = isPositiveInteger(current, last);
		const resultNumber = Number.isNaN(operation) || operation === Infinity || operation <= 0 ? 0 : operation.toLocaleString();
		if (resultNumber === 0) {
			return '';
		} else {
			switch (returnType) {
				case 'string':
					return `${isPositive <= 0 ? '↓' : '↑'}${resultNumber}%`;
				case 'icon':
					return (
						<div
							className={classNames(`percent`, {
								'percent--decrease': isPositive <= 0,
							})}
						>
							{isPositive <= 0 ? <img src={reduceIcon} alt="reduce" /> : <img src={addIcon} alt="add" />}
							{isPositive <= 0 ? `-` : '+'}
							<div className="percent__number">{`${resultNumber}%`}</div>
						</div>
					);
				case 'tooltip':
					return `${resultNumber}%`;
				case 'number':
					return resultNumber;
				default:
					return (
						<div
							className={classNames(`percent`, {
								'percent--decrease': isPositive <= 0,
							})}
						>
							{isPositive <= 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
							<div className="percent__number">{`${resultNumber}%`}</div>
						</div>
					);
			}
		}
	};

	const isTimestamp = timestamp => {
		const date = new Date(timestamp);

		return !isNaN(date.getTime()) && date.getTime() === timestamp;
	};

	const convertTimestampToMoth = timestamp => {
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		dayjs.extend(utc);
		dayjs.extend(timezone);
		dayjs.tz.setDefault(timeZone);

		if (isTimestamp(timestamp)) {
			const date = dayjs.unix(timestamp / 1000).tz(timeZone);
			const formattedDate = date.format('YYYY-MM');
			return formattedDate;
		}
	};

	const convertProportion = (total, current) => {
		if (isNumber(total) && isNumber(current)) {
			const count = ((current / total) * 100).toFixed(2);
			if (count > 0) return ` (${count.toLocaleString()}%)`;
		}

		return '';
	};

	const dataMonthConvertTypes = items => {
		const { months, currentInfo } = items ?? {};
		const temp = {};
		// by month api 轉 LineChart chartType stack 格式
		months?.forEach(dataItem => {
			dataItem.scopes?.forEach((item, index) => {
				const { title, currentAmount, lastAmount } = item ?? {};
				if (title in temp) {
					// 有建立過的物件就新增
					if ('current' in temp[title]) temp[title].current.data.push(currentAmount);
					if ('last' in temp[title]) temp[title].last.data.push(lastAmount);
				} else {
					// 建立物件
					temp[title] = {
						current: {
							name: title,
							data: [currentAmount],
							stack: 'current',
							id: title,
							color: index,
							year: new Date(currentInfo.startDate).getFullYear(),
						},
						last: {
							name: title,
							data: [lastAmount],
							stack: 'last',
							linkedTo: title,
							color: index,
							year: new Date(currentInfo.startDate).getFullYear() - 1,
						},
					};
				}
			});
		});
		if (months?.length) {
			const types = Object.values(temp).flatMap(item => ['last', 'current'].map(property => item[property]));
			return { monthStep: months[0].month, types };
		}
		return {};
	};

	const covertToPieData = array => {
		if (isArray(array)) {
			const firstCount = array?.map(item => {
				return { currentData: { name: item.title, y: item.currentAmount }, lastData: { name: item.title, y: item.lastAmount } };
			});
			const result = {
				current: firstCount.map(data => data?.currentData),
				last: firstCount.map(data => data?.lastData),
			};
			return result;
		}
		return {};
	};

	const covertToDoublePieData = array => {
		if (isArray(array)) {
			const firstCount = array?.map(item => {
				return {
					currentData: { name: item.title, scopeName: item.title, value: item.currentAmount },
					lastData: { name: item.title, scopeName: item.title, value: item.lastAmount },
				};
			});
			const result = [
				{
					name: '今年',
					value: firstCount.reduce((acc, cur) => {
						return acc + cur.currentData.value;
					}, 0),
					children: firstCount
						.map(data => data?.currentData)
						.filter(data => data.value !== 0)
						.reverse(),
				},
				{
					name: '去年',
					value: firstCount.reduce((acc, cur) => {
						return acc + cur.lastData.value;
					}, 0),
					children: firstCount.map(data => data?.lastData).filter(data => data.value !== 0),
				},
			];
			return result;
		}
		return [];
	};

	const concatSameKeyData = (key, list) => {
		const mergedData = [];
		list?.forEach(item => {
			const existingItemIndex = mergedData.findIndex(existing => existing[key] === item[key]);
			if (existingItemIndex !== -1) {
				// 如果找到了相同 "name" 的项，将 "children" 合并
				mergedData[existingItemIndex].children = mergedData[existingItemIndex].children.concat(item.children);
			} else {
				// 如果没有找到相同 "name" 的项，直接添加到结果中
				mergedData.push(item);
			}
		});
		return mergedData;
	};

	const judgeNumber = {
		isPositiveInteger,
		convertPercent,
		convertTimestampToMoth,
		convertProportion,
	};

	const judgeData = {
		dataMonthConvertTypes,
		covertToPieData,
		covertToDoublePieData,
		concatSameKeyData,
	};

	return { ...judgeNumber, ...judgeData };
};
