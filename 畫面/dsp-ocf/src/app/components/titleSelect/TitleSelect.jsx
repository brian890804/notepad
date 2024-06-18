import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select } from '@delta/dsp-ui/lib/antd';

const TitleSelect = ({ title, value, options, onChange }) => {
	const [currentValue, setCurrentValue] = useState();

	useEffect(() => {
		setCurrentValue(value);
	}, [value]);

	return (
		<Select
			labelInValue
			optionLabelProp="label"
			value={
				typeof currentValue === 'object'
					? { label: title ? `${title}: ${currentValue?.label}` : currentValue?.label, value: currentValue?.value }
					: currentValue
			}
			{...{ options, onChange }}
		/>
	);
};

TitleSelect.defaultProps = {
	title: undefined,
	value: undefined,
	options: undefined,
	onChange: () => undefined,
};

TitleSelect.propTypes = {
	title: PropTypes.string,
	value: PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}),
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		})
	),
	onChange: PropTypes.func,
};

export default TitleSelect;
