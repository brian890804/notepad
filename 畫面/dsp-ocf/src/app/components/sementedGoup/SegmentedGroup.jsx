import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './segmentedGroup.scss';

const SegmentedGroup = ({ options, value, onChange }) => {
	if (!options?.length) return null;
	return (
		<div className="segmentedGroup">
			{options?.map(({ label, value: optionValue, disabled }) => (
				<div
					key={optionValue}
					onClick={() => (!disabled ? onChange({ label, value: optionValue }) : undefined)}
					className={classNames('segmentedGroup__item_wrapper', {
						'segmentedGroup__item_wrapper--active': value?.value === optionValue,
						'segmentedGroup__item_wrapper--disabled': disabled,
					})}
				>
					{label}
				</div>
			))}
		</div>
	);
};

SegmentedGroup.defaultProps = {
	value: undefined,
	options: undefined,
	onChange: () => undefined,
};

SegmentedGroup.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any })),
	// eslint-disable-next-line react/forbid-prop-types
	value: PropTypes.any,
	onChange: PropTypes.func,
};

export default SegmentedGroup;
