import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from '@delta/dsp-ui/lib/antd';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';

const MonthRangePicker = ({ value, onChange }) => {
	const { formatMessage } = useIntl();
	const [currentValue, setCurrentValue] = useState();
	useEffect(() => setCurrentValue(value?.map(i => (Number.isInteger(i) ? dayjs(i) : null))), [value]);

	return (
		<DatePicker.RangePicker
			picker="month"
			// format="YYYY-MM-DD"
			placeholder={[formatMessage({ id: 'common.start.date' }), formatMessage({ id: 'common.end.date' })]}
			value={currentValue}
			onChange={result => {
				const [startTime, endTime] = result || [undefined, undefined];
				const finalResult = result ? [startTime?.startOf('M'), endTime?.endOf('M')] : result;
				onChange(finalResult?.length === 2 ? [finalResult[0]?.valueOf(), finalResult[1]?.valueOf()] : finalResult);
				setCurrentValue(finalResult);
			}}
		/>
	);
};

MonthRangePicker.defaultProps = {
	value: undefined,
	onChange: () => undefined,
};

MonthRangePicker.propTypes = {
	value: PropTypes.arrayOf(PropTypes.number),
	onChange: PropTypes.func,
};

export default MonthRangePicker;
