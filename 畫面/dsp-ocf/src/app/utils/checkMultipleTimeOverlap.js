import dayjs from 'dayjs';

const FORMAT = 'YYYY-MM-DD';

const checkMultipleTimeOverlap = (timeIntervals = []) => {
	const sortedIntervals = timeIntervals
		.map(({ startDate, endDate }) => ({ startDate: dayjs(startDate).valueOf(), endDate: dayjs(endDate || new Date().now).valueOf() }))
		.sort((a, b) => a.startDate - b.startDate);

	const nonOverlappingIntervals = [];

	// eslint-disable-next-line no-plusplus
	for (let i = 1; i < sortedIntervals.length; i++) {
		if (sortedIntervals[i].startDate <= sortedIntervals[i - 1].endDate) {
			return {
				isOverlap: true,
				overlapRanges: [
					{
						startDate: dayjs(sortedIntervals[i - 1].startDate).format(FORMAT),
						endDate: dayjs(sortedIntervals[i - 1].endDate).format(FORMAT),
					},
					{
						startDate: dayjs(sortedIntervals[i].startDate).format(FORMAT),
						endDate: dayjs(sortedIntervals[i].endDate).format(FORMAT),
					},
				],
			};
		}

		if (sortedIntervals[i].startDate > sortedIntervals[i - 1].endDate + 1) {
			const nonOverlappingInterval = {
				startDate: dayjs(sortedIntervals[i - 1].endDate).add(1, 'day').format(FORMAT), // prettier-ignore
				endDate: dayjs(sortedIntervals[i].startDate).subtract(1, 'day').format(FORMAT),
			};
			nonOverlappingIntervals.push(nonOverlappingInterval);
		}
	}

	return { isOverlap: false, nonOverlapRanges: nonOverlappingIntervals };
};

export default checkMultipleTimeOverlap;
