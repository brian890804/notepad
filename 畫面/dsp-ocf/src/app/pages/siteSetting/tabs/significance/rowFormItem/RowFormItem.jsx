import React from 'react';
import PropTypes from 'prop-types';
import { DSPFormItem } from '@delta/dsp-ui';

const RowFormItem = ({ name, type, value, options, children }) => {
	if (!value?.isIdentify?.value && type !== 'radio') return '-'; // 若排放源鑑別為"否"，且又不是 radio 選單，則顯示 '-'

	/** TODO 待等需求確認 */
	// const disabled = new RegExp(/^1\s|^1./g).test(value?.scopeName);

	if (children) return <DSPFormItem name={name} render={() => children} />;
	return <DSPFormItem {...{ name, type, options }} popupMatchSelectWidth={false} />;
};

RowFormItem.defaultProps = {
	name: undefined,
	type: 'select',
	value: undefined,
	options: undefined,
	children: undefined,
};

RowFormItem.propTypes = {
	name: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
	type: PropTypes.string,
	value: PropTypes.shape({
		isIdentify: PropTypes.shape({ label: PropTypes.string, value: PropTypes.bool }),
		scopeName: PropTypes.string,
	}),
	options: PropTypes.arrayOf(
		PropTypes.shape({ label: PropTypes.string, value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]) })
	),
	children: PropTypes.node,
};

export default RowFormItem;
