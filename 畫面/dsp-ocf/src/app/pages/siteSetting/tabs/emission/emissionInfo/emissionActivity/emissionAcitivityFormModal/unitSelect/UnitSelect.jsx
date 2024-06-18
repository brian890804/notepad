import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@delta/dsp-ui/lib/antd';

const UnitSelect = ({ options, value, placeholder, onChange }) => (
	<Select {...{ options, value, placeholder }} onChange={v => onChange(options?.find(i => i?.value === v))} />
);

UnitSelect.defaultProps = {
	options: undefined,
	value: undefined,
	placeholder: undefined,
	onChange: () => undefined,
};

UnitSelect.propTypes = {
	/** 單位轉換清單 */
	options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.number, rate: PropTypes.number })),
	/** 單位的值 */
	value: PropTypes.shape({ label: PropTypes.string, value: PropTypes.number, rate: PropTypes.number }),
	/** 提示文字 */
	placeholder: PropTypes.string,
	/** 變動單位 */
	onChange: PropTypes.func,
};

export default UnitSelect;
