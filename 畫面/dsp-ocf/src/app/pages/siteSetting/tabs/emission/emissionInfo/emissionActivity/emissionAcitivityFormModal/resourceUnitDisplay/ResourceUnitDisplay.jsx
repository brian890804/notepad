import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Tooltip } from '@delta/dsp-ui/lib/antd';
import { InfoCircleOutlined } from '@delta/dsp-ui/lib/antd/icons';

import './resourceUnitDisplay.scss';

const ResourceUnitDisplay = ({ amount, unit, resourceUnit, unitOptions }) => {
	const { formatMessage } = useIntl();
	if (amount && unit && resourceUnit) {
		const transValue = amount * unitOptions?.find(i => i?.value === unit?.value)?.rate || 0;
		return (
			<div className="resourceUnitDisplay">
				<div className="resourceUnitDisplay__approximately">≈</div>
				<div className="resourceUnitDisplay__value">{transValue?.toLocaleString()}</div>
				<div className="resourceUnitDisplay__unit">{resourceUnit?.label}</div>
				<Tooltip
					placement="right"
					title={formatMessage({ id: 'site.setting.schema.unit.display.hint' }, { resourceUnit: resourceUnit?.label })}
				>
					<InfoCircleOutlined />
				</Tooltip>
			</div>
		);
	}
	return null;
};

ResourceUnitDisplay.defaultProps = {
	amount: undefined,
	resourceUnit: undefined,
	unit: undefined,
	unitOptions: undefined,
};

ResourceUnitDisplay.propTypes = {
	/** 數量 */
	amount: PropTypes.number,
	/** 資源的單位 */
	resourceUnit: PropTypes.shape({ label: PropTypes.string, value: PropTypes.number }),
	/** 選擇的單位 */
	unit: PropTypes.shape({ label: PropTypes.string, value: PropTypes.number, rate: PropTypes.number }),
	/** 單位轉換清單 */
	unitOptions: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.number, rate: PropTypes.number })),
};

export default ResourceUnitDisplay;
