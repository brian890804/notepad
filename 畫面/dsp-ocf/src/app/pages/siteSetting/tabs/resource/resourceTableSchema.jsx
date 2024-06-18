import React from 'react';
import { DSPTableActions } from '@delta/dsp-ui';
import { Tooltip } from '@delta/dsp-ui/lib/antd';
import { InfoCircleFilled } from '@delta/dsp-ui/lib/antd/icons';
import { getIntl } from '../../../../intl/IntlGlobalProvider';
import { getMissingTimePeriodContent } from '../../../../utils/getDateOverlapContent';

export default () => undefined;

const checkResouceHaveMissingTimePeriod = resource => {
	const { isElectricity, emissionSourceMissingTimePeriod, missingTimePeriod } = resource;

	if (isElectricity) {
		const { location, market } = missingTimePeriod || {};
		const { location: eLocation, market: eMarket } = emissionSourceMissingTimePeriod || {};
		return !!(location?.length || market?.length || eLocation?.length || eMarket?.length);
	}

	return !!(emissionSourceMissingTimePeriod?.general?.length || missingTimePeriod?.general?.length);
};

export const resourceTableSchema = ({ handleActions }) => {
	const { formatMessage } = getIntl();

	return [
		/** 名稱 */
		{
			title: formatMessage({ id: 'site.setting.schema.name' }),
			key: 'name',
			dataIndex: 'name',
			render: (name, record) => (
				<div className="resource__list__name" onClick={() => handleActions('select', record)}>
					{checkResouceHaveMissingTimePeriod(record) && (
						<Tooltip title={getMissingTimePeriodContent(record.emissionSourceMissingTimePeriod, record.missingTimePeriod)}>
							<InfoCircleFilled style={{ color: 'red', fontSize: 18 }} />
						</Tooltip>
					)}
					{name}
				</div>
			),
		},
		/** 功能 */
		{
			title: formatMessage({ id: 'site.setting.schema.action' }),
			width: 60,
			dataIndex: 'privilege',
			key: 'privilege',
			fixed: 'right',
			render: (_, record) => <DSPTableActions privilege={{ edit: true, delete: true }} onClick={key => handleActions(key, record)} />,
		},
	];
};
