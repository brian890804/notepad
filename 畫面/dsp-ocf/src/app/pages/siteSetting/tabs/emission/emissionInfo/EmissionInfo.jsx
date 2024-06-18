import React, { useCallback, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Tabs } from '@delta/dsp-ui/lib/antd';
import { DSPHandleAxiosError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import EmissionBasicInfo from './emissionBasicInfo/EmissionBasicInfo';
import EmissionActivity from './emissionActivity/EmissionActivity';
import { getIntl } from '../../../../../intl/IntlGlobalProvider';
import services from '../../../../../../config/services';

import './emissionInfo.scss';

const EmissionInfo = () => {
	const {
		search: { emissionId, emissionTab },
		navigateReplace,
	} = DSPUseNavAppendSearch();

	const intl = getIntl();
	const { formatMessage } = intl;

	/** 取得排放源基本資料 */
	const { axiosApi: getEmissionData, loading, data: emissionData } = DSPUseAxios().useGet();
	const fetchEmission = useCallback(() => {
		getEmissionData({
			url: `${services.siteEmission}/${emissionId}`,
			mapper: resp => resp?.data?.result,
		}).catch(error => DSPHandleAxiosError({ error, intl }));
	}, [emissionId]);
	useEffect(() => fetchEmission(), [emissionId]);

	return (
		<Tabs
			className="emissionInfo"
			type="card"
			items={[
				{
					key: 'basicInfo',
					label: formatMessage({ id: 'site.setting.schema.basicInfo' }),
					children: <EmissionBasicInfo loading={loading} dataSource={emissionData} onFinish={fetchEmission} />,
				},
				{
					key: 'activity',
					label: formatMessage({ id: 'site.setting.schema.data.activity' }),
					children: <EmissionActivity emissionData={emissionData} />,
				},
			]}
			activeKey={emissionTab}
			onTabClick={key => navigateReplace({ emissionTab: key })}
		/>
	);
};

EmissionInfo.propTypes = {};

export default EmissionInfo;
