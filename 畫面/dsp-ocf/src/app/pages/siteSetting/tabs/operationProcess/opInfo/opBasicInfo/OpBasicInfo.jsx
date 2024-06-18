import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { DSPHandleAxiosError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { DSPForm } from '@delta/dsp-ui';
import services from '../../../../../../../config/services';
import { opBasicFormSchema } from './opBasicFormSchema';

import './opBasicInfo.scss';

const OpBasicInfo = ({ opId }) => {
	const [form] = DSPForm.useForm();
	const intl = useIntl();

	const { axiosApi: getEmissionData, loading, data: dataSource } = DSPUseAxios().useGet();

	useEffect(() => {
		getEmissionData({ url: `${services.siteOperationProcess}/${opId}`, mapper: resp => resp?.data?.result }).catch(error => {
			DSPHandleAxiosError({ error, intl });
		});
	}, [opId]);

	useEffect(() => {
		form.setFieldsValue(dataSource);
	}, [dataSource]);

	return <DSPForm className="opBasicInfo" {...{ form, loading, formSchema: opBasicFormSchema() }} />;
};

OpBasicInfo.defaultProps = {
	opId: undefined,
};

OpBasicInfo.propTypes = {
	/** 活動 id */
	opId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default OpBasicInfo;
