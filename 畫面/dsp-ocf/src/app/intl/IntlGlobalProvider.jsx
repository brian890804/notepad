import { useIntl, FormattedMessage } from 'react-intl';

let INTL;
const IntlGlobalProvider = ({ children }) => {
	INTL = useIntl();
	return children;
};

export const getIntl = () => ({
	formatMessage: (message, values) => INTL.formatMessage(message, values),

	getLocale: () => INTL.locale,

	checkExist: message => {
		const { messages } = INTL;
		return message in messages;
	},
	FormattedMessage,
});
export default IntlGlobalProvider;
