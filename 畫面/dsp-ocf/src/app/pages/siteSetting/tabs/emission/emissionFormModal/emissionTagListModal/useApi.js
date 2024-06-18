import { useEffect, useCallback } from 'react';
import { DSPHandleAxiosError, DSPHandleFormError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { useIntl } from 'react-intl';
import services from '../../../../../../../config/services';
import { openNotification } from '../../../../../../utils/notification';

export default ({ refularForm, customForm, open, setActiveKey, onFinish }) => {
	const intl = useIntl();
	const { formatMessage } = intl;

	// 取得係數來源列表
	const { loading, axiosApi: getEmissionTags } = DSPUseAxios().useGet();
	// 更新係數來源列表
	const { loading: updating, axiosApi: updateEmissionTags } = DSPUseAxios().usePost();

	// 載入時取得類別標籤清單
	useEffect(() => {
		if (open) {
			getEmissionTags({ url: services.emissionTags, mapper: res => res.data.result })
				.then(data => {
					const regularTags = data?.filter(i => i?.isCustom === false);
					refularForm.setFieldsValue({ emissionTags: regularTags });
					const customTags = data?.filter(i => i?.isCustom);
					customForm.setFieldsValue({ emissionTags: customTags });
				})
				.catch(error => DSPHandleAxiosError({ error, intl }));
		}
	}, [open]);

	// 更新類別標籤清單
	const submitTags = useCallback(() => {
		customForm
			.validateFields()
			.then(data => {
				const regularTags = refularForm.getFieldValue('emissionTags');
				updateEmissionTags({
					url: services.emissionTags,
					data: (Array.isArray(regularTags) ? regularTags : []).concat(data?.emissionTags?.map(i => ({ ...i, isCustom: true }))),
				})
					.then(() => {
						onFinish(true);
						openNotification('success', formatMessage({ id: 'common.message.update.success' }));
					})
					.catch(error => DSPHandleAxiosError({ error, intl }));
			})
			.catch(error => {
				DSPHandleFormError({ form: customForm, error });
				setActiveKey('custom');
			});
	}, []);

	return { loading, updating, submitTags };
};
