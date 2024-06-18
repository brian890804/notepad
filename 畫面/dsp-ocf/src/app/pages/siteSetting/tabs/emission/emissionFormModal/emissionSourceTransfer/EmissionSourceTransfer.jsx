import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DSPHandleAxiosError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { useIntl } from 'react-intl';
import { DSPTransfer } from '@delta/dsp-ui';
import services from '../../../../../../../config/services';

import './emissionSourceTransfer.scss';

const EmissionSourceTransfer = ({ sourceType, siteId, value, onChange }) => {
	const { loading: isFetchingEquipment, axiosApi: fetchEquipment, data: equipments } = DSPUseAxios().useGet();
	const { loading: isFetchingActivity, axiosApi: fetchActivity, data: activities } = DSPUseAxios().useGet();
	const intl = useIntl();

	useEffect(() => {
		if (!sourceType) return;
		if (sourceType?.value === 1) {
			fetchEquipment({
				url: services.siteEquipmentAll.replace('{siteId}', siteId),
				mapper: resp => resp.data?.result,
			}).catch(error => DSPHandleAxiosError({ error, intl }));
		} else {
			fetchActivity({
				url: services.siteOperationProcessAll.replace('{siteId}', siteId),
				mapper: resp => resp.data?.result,
			}).catch(error => DSPHandleAxiosError({ error, intl }));
		}
	}, [sourceType]);

	const resources = sourceType?.value === 1 ? equipments : activities;

	return (
		<DSPTransfer
			className="emissionSourceTransfer"
			loading={isFetchingActivity || isFetchingEquipment}
			dataSource={resources}
			{...{ value, onChange }}
		/>
	);
};

EmissionSourceTransfer.defaultProps = {
	sourceType: undefined,
	siteId: undefined,
	onChange: () => undefined,
	value: undefined,
};

EmissionSourceTransfer.propTypes = {
	sourceType: PropTypes.oneOfType([PropTypes.object]),
	siteId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onChange: PropTypes.func,
	value: PropTypes.arrayOf(PropTypes.object),
};

export default EmissionSourceTransfer;
