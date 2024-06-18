import React from 'react';
import dayjs from 'dayjs';
import { getIntl } from '../intl/IntlGlobalProvider';

const FORMAT = 'YYYY-MM-DD';

export const getOverlapContent = overlapRanges =>
	overlapRanges?.map((item, idx) => {
		const id = idx;
		return (
			<div key={id}>
				{idx + 1}. {dayjs(item.startDate).format(FORMAT)} ~ {dayjs(item.endDate || new Date().now).format(FORMAT)}
			</div>
		);
	});

export const getNonOverlapContent = ({ general, location, market }, showTitle) => {
	const { formatMessage } = getIntl();
	return (
		<div>
			{showTitle && <div>{formatMessage({ id: 'common.time.leak.message' })}</div>}
			{general?.length > 0 && <div>{getOverlapContent(general)}</div>}
			{location?.length > 0 && (
				<div>
					<div>{formatMessage({ id: 'common.location.base' })}</div>
					{getOverlapContent(location)}
				</div>
			)}
			{market?.length > 0 && (
				<div>
					<div>{formatMessage({ id: 'common.market.base' })}</div>
					{getOverlapContent(market)}
				</div>
			)}
		</div>
	);
};

export const getMissingTimePeriodContent = (emissionMissing, resourceMissing) => {
	const { formatMessage } = getIntl();
	const { general: eGeneral, location: eLocation, market: eMarket } = emissionMissing || {};
	const { general, location, market } = resourceMissing || {};
	return (
		<div>
			{!!(eGeneral?.length || eLocation?.length || eMarket?.length) && (
				<>
					<div>{formatMessage({ id: 'common.time.leak.message.emission' })}</div>
					{eGeneral?.length > 0 && <div>{getOverlapContent(eGeneral)}</div>}
					{eLocation?.length > 0 && (
						<div>
							<div>{formatMessage({ id: 'common.location.base' })}</div>
							{getOverlapContent(eLocation)}
						</div>
					)}
					{eMarket?.length > 0 && (
						<div>
							<div>{formatMessage({ id: 'common.market.base' })}</div>
							{getOverlapContent(eMarket)}
						</div>
					)}
				</>
			)}
			{!!(general?.length || location?.length || market?.length) && (
				<>
					<div>{formatMessage({ id: 'common.time.leak.message.resource' })}</div>
					{general?.length > 0 && <div>{getOverlapContent(general)}</div>}
					{location?.length > 0 && (
						<div>
							<div>{formatMessage({ id: 'common.location.base' })}</div>
							{getOverlapContent(location)}
						</div>
					)}
					{market?.length > 0 && (
						<div>
							<div>{formatMessage({ id: 'common.market.base' })}</div>
							{getOverlapContent(market)}
						</div>
					)}
				</>
			)}
		</div>
	);
};
