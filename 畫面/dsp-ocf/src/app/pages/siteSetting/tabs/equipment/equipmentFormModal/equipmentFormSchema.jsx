import { getIntl } from '../../../../../intl/IntlGlobalProvider';

export default () => undefined;

export const equipmentFormSchema = () => {
	const { formatMessage } = getIntl();

	return [
		[
			/** 名稱 */
			{
				name: 'name',
				required: true,
				label: formatMessage({ id: 'site.setting.schema.name' }),
				type: 'input',
			},
			/** 保管者 */
			{
				name: 'keeper',
				label: formatMessage({ id: 'site.setting.schema.keeper' }),
				type: 'input',
			},
			/** 廠商 */
			{
				name: 'factory',
				label: formatMessage({ id: 'site.setting.schema.manufacturers' }),
				type: 'input',
			},
			/** 型號 */
			{
				name: 'model',
				label: formatMessage({ id: 'site.setting.schema.model' }),
				type: 'input',
			},
			/** 區域 */
			{
				name: 'area',
				label: formatMessage({ id: 'site.setting.schema.area' }),
				type: 'input',
			},
			/** 數量 */
			{
				name: 'amount',
				required: true,
				label: formatMessage({ id: 'site.setting.schema.quantity' }),
				type: 'number',
			},
			/** 標籤 */
			{
				name: 'tags',
				label: formatMessage({ id: 'site.setting.schema.tag' }),
				type: 'tag',
			},
			/** 啟用時間 */
			{
				name: 'activateDate',
				required: true,
				label: formatMessage({ id: 'site.setting.schema.enabledTime' }),
				type: 'datePicker',
			},
			/** 更新時間 [隱藏欄位] */
			{ name: 'modifyDate', type: 'hidden' },
		],
		[{ name: 'image', label: formatMessage({ id: 'site.list.schema.image' }), type: 'uploadImage' }],
	];
};
