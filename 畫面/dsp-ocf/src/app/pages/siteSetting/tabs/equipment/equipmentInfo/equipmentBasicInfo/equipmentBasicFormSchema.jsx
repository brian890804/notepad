import { getIntl } from '../../../../../../intl/IntlGlobalProvider';

export default () => undefined;

export const equipmentBasicFormSchema = () => {
	const { formatMessage } = getIntl();

	return [
		/** 名稱 */
		{ label: formatMessage({ id: 'site.setting.schema.name' }), name: 'name', type: 'viewItem' },
		/** 標籤 */
		{ label: formatMessage({ id: 'site.setting.schema.tag' }), name: 'tags', type: 'viewItem' },
		/** 保管者 */
		{ label: formatMessage({ id: 'site.setting.schema.keeper' }), name: 'keeper', type: 'viewItem' },
		/** 廠商 */
		{ label: formatMessage({ id: 'site.setting.schema.manufacturers' }), name: 'factory', type: 'viewItem' },
		/** 型號 */
		{ label: formatMessage({ id: 'site.setting.schema.model' }), name: 'model', type: 'viewItem' },
		/** 區域 */
		{ label: formatMessage({ id: 'site.setting.schema.region' }), name: 'area', type: 'viewItem' },
		/** 數量 */
		{ label: formatMessage({ id: 'site.setting.schema.quantity' }), name: 'amount', type: 'viewItem' },
		/** 啟用時間 */
		{ label: formatMessage({ id: 'site.setting.schema.enabledTime' }), name: 'activateDate', type: 'viewItemTime' },
		/** 照片 */
		{ label: formatMessage({ id: 'common.photo' }), name: 'image', type: 'viewItemImage' },
	].map(i => ({ ...i, disabled: true }));
};
