import { useEffect, useCallback } from 'react';
import { DSPHandleAxiosError, DSPHandleFormError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { useIntl } from 'react-intl';
import services from '../../../../../config/services';

export default ({ form, open, onFinish }) => {
	const intl = useIntl();

	// 取得係數來源列表
	const { loading, axiosApi: getReference } = DSPUseAxios().useGet();
	// 更新係數來源列表
	const { loading: updating, axiosApi: updateReference } = DSPUseAxios().usePost();

	// 載入時取得規範清單
	useEffect(() => {
		if (open) {
			getReference({ url: services.dropdowns.replace('{cate}', 'reference'), mapper: res => res.data.result })
				.then(data => form.setFieldsValue({ reference: data }))
				.catch(error => DSPHandleAxiosError({ error, intl }));
		}
	}, [open]);

	// 更新規範清單
	const submitReference = useCallback(() => {
		form.validateFields()
			.then(data => {
				updateReference({ url: services.dropdowns.replace('{cate}', 'reference'), data: data?.reference })
					.then(() => onFinish(true))
					.catch(error => DSPHandleAxiosError({ error, intl }));
			})
			.catch(error => DSPHandleFormError({ form, error }));
	}, []);

	return { loading, updating, submitReference };
};
