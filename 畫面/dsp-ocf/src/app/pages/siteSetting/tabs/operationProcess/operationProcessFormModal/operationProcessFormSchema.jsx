import { getIntl } from '../../../../../intl/IntlGlobalProvider';

export default () => undefined;

export const operationProcessFormSchema = () => {
	const { formatMessage } = getIntl();

	return [
		/** 名稱 */
		{
			name: 'name',
			required: true,
			label: formatMessage({ id: 'site.setting.schema.name' }),
			type: 'input',
		},
		/** 描述 */
		{
			name: 'description',
			label: formatMessage({ id: 'site.setting.schema.description' }),
			type: 'textarea',
		},
		/** 標籤 */
		{
			name: 'tags',
			label: formatMessage({ id: 'site.setting.schema.tag' }),
			type: 'tag',
		},
		/** 更新時間 [隱藏欄位] */
		{ name: 'modifyDate', type: 'hidden' },
	];
};
