import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import axios from 'axios';
import { DSPGlobalConfig } from '@delta/dsp-ui/lib/utils';
import { DSPLoading } from '@delta/dsp-ui';
import services from '../../config/services';
import IntlGlobalProvider from './IntlGlobalProvider';

const IntlProvider = ({ children }) => {
	const [i18n, setI18n] = useState();
	const { getIntl, setContextRoot } = DSPGlobalConfig();
	const { getSupportLanguages, checkLanguageSupport, setLocale } = getIntl();

	/** 透過網址取得目前語系 */
	const location = window?.location;
	const { pathname } = location || {};
	const locale = useMemo(
		() =>
			pathname
				?.replace(services.getContextRoot, '') // 先濾掉網站名稱
				?.split('/') // 依照網址斜線分離出陣列
				?.filter(i => i)?.[0], // 理論上第一個 為語系
		[pathname]
	);
	useEffect(() => {
		/* 檢查 語系最常不會超過9字元 => https://github.com/ladjs/i18n-locales
		 * 檢查 本系統是否支援該語系 */
		if (locale?.length < 9 && getSupportLanguages().some(({ value }) => value === locale)) {
			axios
				.get(`${services.getLocale}/${locale}.json`)
				.then(response => {
					setI18n({ locale, messages: response.data });
					setLocale(locale);
					setContextRoot(services.getContextRoot);
				})
				/* 語系取得失敗時使用英文 */
				.catch(() => {
					axios.get(`${services.getLocale}/en-us.json`).then(response => setI18n({ locale: 'en-us', messages: response.data }));
				});
		} else {
			/* URL沒有語系 自動將語系帶上 */
			const browserLanguage = (
				navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage
			).toLowerCase();
			window.location.href = `${services.getContextRoot}${checkLanguageSupport(browserLanguage)}`;
		}
	}, [locale, location]);

	return i18n ? (
		<ReactIntlProvider key={i18n.locale} locale={i18n.locale} messages={i18n.messages}>
			<IntlGlobalProvider>{children}</IntlGlobalProvider>
		</ReactIntlProvider>
	) : (
		<DSPLoading />
	);
};

IntlProvider.defaultProps = {};

IntlProvider.propTypes = {
	children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IntlProvider;
