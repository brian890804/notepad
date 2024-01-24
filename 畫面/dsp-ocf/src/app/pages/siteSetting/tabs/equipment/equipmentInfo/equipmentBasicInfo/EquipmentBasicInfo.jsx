import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { DSPHandleAxiosError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { DSPForm } from '@delta/dsp-ui';
import services from '../../../../../../../config/services';
import { equipmentBasicFormSchema } from './equipmentBasicFormSchema';

import './equipmentBasicInfo.scss';

const EquipmentBasicInfo = ({ equipmentId }) => {
	const [form] = DSPForm.useForm();
	const intl = useIntl();

	const { axiosApi: getEquipmentData, loading, data: dataSource } = DSPUseAxios().useGet();

	useEffect(() => {
		getEquipmentData({ url: `${services.siteEquipment}/${equipmentId}`, mapper: resp => resp?.data?.result }).catch(error => {
			DSPHandleAxiosError({ error, intl });
		});
	}, [equipmentId]);

	useEffect(() => {
		form.setFieldsValue(dataSource);
	}, [dataSource]);

	return <DSPForm className="equipmentBasicInfo" {...{ form, loading, formSchema: equipmentBasicFormSchema() }} />;
};

EquipmentBasicInfo.defaultProps = {
	equipmentId: undefined,
};

EquipmentBasicInfo.propTypes = {
	/** 設施 id */
	equipmentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default EquipmentBasicInfo;
