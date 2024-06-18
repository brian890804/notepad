import { DSPHandleAxiosError, DSPHandleFormError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { useEffect, useCallback } from 'react';
import { getIntl } from '../../../../../intl/IntlGlobalProvider';
import services from '../../../../../../config/services';
import { openNotification } from '../../../../../utils/notification';

const useApi = ({ form, open, setOpen, emissionId, siteId, onFinish, setScopeId }) => {
	const { loading, axiosApi: fetchEmission } = DSPUseAxios().useGet();
	const { loading: isCreating, axiosApi: createEmission } = DSPUseAxios().usePost();
	const { loading: isUpdating, axiosApi: updateEmission } = DSPUseAxios().usePut();

	const intl = getIntl();
	const { formatMessage } = intl;

	/** 取得排放源資料 */
	useEffect(() => {
		if (open) form?.resetFields();

		// [編輯] 取得資料並倒入
		if (emissionId && open) {
			fetchEmission({ url: `${services.siteEmission}/${emissionId}`, mapper: resp => resp.data?.result })
				.then(data => {
					// setResourceId(data.resource?.value);
					setScopeId(data.scopeId);
					form?.setFieldsValue(data);
				})
				.catch(error => DSPHandleAxiosError({ error, intl: getIntl() }));
		}
	}, [form, emissionId, siteId, open]);

	useEffect(() => {
		if (open) form.setFieldsValue({ siteId });
		else setScopeId(); // 關閉視窗還原清除
	}, [form, siteId, open]);

	const onSuccess = useCallback(
		(title, message) => {
			openNotification('success', title, message);
			onFinish();
			setOpen();
		},
		[onFinish, setOpen]
	);

	/** 新增/編輯排放源 */
	const handleSubmit = () => {
		form.validateFields()
			.then(data => {
				if (emissionId) {
					updateEmission({ url: `${services.siteEmission}/${emissionId}`, data })
						.then(() => onSuccess(formatMessage({ id: 'common.message.update.success' })))
						.catch(error => DSPHandleAxiosError({ error, intl }));
				} else {
					createEmission({ url: services.siteEmission, data })
						.then(() => onSuccess(formatMessage({ id: 'common.message.add.success' })))
						.catch(error => DSPHandleAxiosError({ error, intl }));
				}
			})
			.catch(error => DSPHandleFormError({ form, error }));
	};

	return {
		loading: loading || isCreating || isUpdating,
		handleSubmit,
	};
};

export default useApi;
