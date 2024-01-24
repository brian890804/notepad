import { getIntl } from '../../../../../../intl/IntlGlobalProvider';

export default () => undefined;

export const opBasicFormSchema = () => {
	const { formatMessage } = getIntl();

	return [
		/** 名稱 */
		{ label: formatMessage({ id: 'site.setting.schema.name' }), name: 'name', type: 'viewItem' },
		/** 描述 */
		{ label: formatMessage({ id: 'site.setting.schema.description' }), name: 'description', type: 'viewItem' },
		/** 標籤 */
		{ label: formatMessage({ id: 'site.setting.schema.tag' }), name: 'tags', type: 'viewItem' },
	].map(i => ({ ...i, disabled: true }));
};
