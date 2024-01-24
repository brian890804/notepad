import React from 'react';
// import PropTypes from 'prop-types';
import { Tabs } from '@delta/dsp-ui/lib/antd';
import { DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import OpBasicInfo from './opBasicInfo/OpBasicInfo';
import Emission from '../../emission/Emission';
import { getIntl } from '../../../../../intl/IntlGlobalProvider';

import './opInfo.scss';

const OpInfo = () => {
	const {
		params: { siteId },
		search: { emissionTab, opId },
		navigateReplace,
	} = DSPUseNavAppendSearch();

	const { formatMessage } = getIntl();

	return (
		<Tabs
			className="opInfo"
			type="card"
			items={[
				{
					key: 'basicInfo',
					label: formatMessage({ id: 'site.setting.schema.basicInfo' }),
					children: <OpBasicInfo opId={opId} />,
				},
				{
					key: 'activity',
					label: formatMessage({ id: 'site.setting.related.emission' }),
					children: <Emission {...{ siteId, opId }} />,
				},
			]}
			activeKey={emissionTab}
			onTabClick={key => navigateReplace({ emissionTab: key })}
		/>
	);
};

OpInfo.propTypes = {};

export default OpInfo;
