import React from 'react';
// import PropTypes from 'prop-types';
import { Tabs } from '@delta/dsp-ui/lib/antd';
import { DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import EquipmentBasicInfo from './equipmentBasicInfo/EquipmentBasicInfo';
import Emission from '../../emission/Emission';
import { getIntl } from '../../../../../intl/IntlGlobalProvider';
import './equipmentInfo.scss';

const EmissionInfo = () => {
	const {
		params: { siteId },
		search: { emissionTab, equipmentId },
		navigateReplace,
	} = DSPUseNavAppendSearch();

	const { formatMessage } = getIntl();

	return (
		<Tabs
			className="equipmentInfo"
			type="card"
			items={[
				{
					key: 'basicInfo',
					label: formatMessage({ id: 'site.setting.schema.basicInfo' }),
					children: <EquipmentBasicInfo equipmentId={equipmentId} />,
				},
				{
					key: 'activity',
					label: formatMessage({ id: 'site.setting.related.emission' }),
					children: <Emission {...{ siteId, equipmentId }} />,
				},
			]}
			activeKey={emissionTab}
			onTabClick={key => navigateReplace({ emissionTab: key })}
		/>
	);
};

EmissionInfo.propTypes = {};

export default EmissionInfo;
