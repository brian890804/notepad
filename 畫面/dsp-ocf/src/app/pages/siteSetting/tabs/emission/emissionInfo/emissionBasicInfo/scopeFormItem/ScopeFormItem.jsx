import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Spin } from '@delta/dsp-ui/lib/antd';
import { DSPHandleAxiosError, DSPNestedUtil, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import services from '../../../../../../../../config/services';
import { getIntl } from '../../../../../../../intl/IntlGlobalProvider';

import './scopeFormItem.scss';

const ScopeFormItem = ({ value }) => {
	const intl = getIntl();

	const { axiosApi: getScope, data } = DSPUseAxios().useGet();

	useEffect(() => {
		getScope({ url: services.scope, mapper: resp => resp?.data?.result }).catch(error => {
			DSPHandleAxiosError({ error, intl });
		});
	}, []);

	const paths = useMemo(
		() =>
			DSPNestedUtil()
				.findPathNodes(data, value)
				?.map(i => i?.label)
				?.join(' > '),
		[data, value]
	);

	return <div className="scopeFormItem">{paths || <Spin size="small" spinning />}</div>;
};

ScopeFormItem.defaultProps = {
	value: undefined,
};

ScopeFormItem.propTypes = {
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ScopeFormItem;
