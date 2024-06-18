import React from 'react';
import PropTypes from 'prop-types';

const GHGItem = ({ value }) => <div>{value?.label}</div>;

GHGItem.defaultProps = {
	value: undefined,
};

GHGItem.propTypes = {
	value: PropTypes.shape({ label: PropTypes.string, value: PropTypes.number }),
};

export default GHGItem;
