import React from 'react';
import PropTypes from 'prop-types';
import { DSPFormItem } from '@delta/dsp-ui';
import TitleSelect from '../../../../components/titleSelect/TitleSelect';

const ComparisonFilterSelect = ({ item }) => <DSPFormItem name={item.key} render={() => <TitleSelect {...item} />} />;

ComparisonFilterSelect.defaultProps = {
	item: undefined,
};

ComparisonFilterSelect.propTypes = {
	/** 篩選規範的夏拉項目 */
	item: PropTypes.shape({
		key: PropTypes.arrayOf(PropTypes.any),
		options: PropTypes.arrayOf(PropTypes.object),
	}),
};

export default ComparisonFilterSelect;
