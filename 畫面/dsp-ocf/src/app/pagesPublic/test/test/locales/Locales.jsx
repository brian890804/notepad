import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Segmented } from '@delta/dsp-ui/lib/antd';
import { DSPI18n } from '@delta/dsp-ui';
import { DSPGlobalConfig } from '@delta/dsp-ui/lib/utils';

import './locales.scss';

const Locales = () => {
	const { getLocale, setLocale } = DSPGlobalConfig().getIntl();
	const [currentLocale, setCurrentLocale] = useState(getLocale());

	return (
		<div className="locales">
			<Segmented
				block
				value={currentLocale}
				options={['en-us', 'zh-tw', 'zh-cn']}
				onChange={locale => {
					setLocale(locale);
					setCurrentLocale(locale);
				}}
			/>
			<DSPI18n />
		</div>
	);
};

Locales.propTypes = {};

export default Locales;
