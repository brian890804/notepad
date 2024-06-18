import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DSPForm } from '@delta/dsp-ui';
import useSiteFormSchema from './useSiteFormSchema';

import './siteBasicinfo.scss';

const SiteBasicinfo = ({ siteData, loading }) => {
	const [form] = DSPForm.useForm();

	useEffect(() => form.setFieldsValue(siteData), [siteData]);

	return <DSPForm className="siteBasicinfo" {...{ form, loading }} formSchema={useSiteFormSchema()} layout="vertical" />;
};

SiteBasicinfo.defaultProps = {
	siteData: undefined,
	loading: undefined,
};

SiteBasicinfo.propTypes = {
	/** 據點資料 */
	siteData: PropTypes.objectOf(PropTypes.any),
	/** 是否載入中 */
	loading: PropTypes.bool,
};

export default SiteBasicinfo;
