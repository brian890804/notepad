import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { DSPHandleAxiosError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import services from '../../../../../../config/services';
import { openNotification } from '../../../../../utils/notification';

const useApi = ({ form, open, siteId, OPId, onFinish }) => {
	const intl = useIntl();
	const { formatMessage } = intl;
	const { loading, axiosApi: fetchOperationProcess } = DSPUseAxios().useGet();
	const { loading: createLoading, axiosApi: createOperationProcess } = DSPUseAxios().usePost();
	const { loading: updateLoading, axiosApi: updateOperationProcess } = DSPUseAxios().usePut();

	/** 取得活動資料 */
	useEffect(() => {
		if (OPId && open) {
			fetchOperationProcess({
				url: `${services.siteOperationProcess}/${OPId}`,
				mapper: resp => resp?.data?.result,
			})
				.then(data => form.setFieldsValue(data))
				.catch(error => DSPHandleAxiosError({ error, intl }));
		} else {
			form.resetFields();
		}
	}, [OPId, open]);

	/** 新增/編輯活動 */
	const handleSubmit = () => {
		form.validateFields()
			.then(result => {
				const data = { ...result, siteId };
				(OPId
					? updateOperationProcess({ url: `${services.siteOperationProcess}/${OPId}`, data })
					: createOperationProcess({ url: services.siteOperationProcess, data })
				)
					.then(() => {
						onFinish(true);
						openNotification(
							'success',
							OPId
								? formatMessage({ id: 'common.message.update.success' })
								: formatMessage({ id: 'common.message.add.success' })
						);
					})
					.catch(error => DSPHandleAxiosError({ intl, error }));
			})
			.catch(error => DSPHandleAxiosError({ error, intl }));
	};

	return { loading: loading || createLoading || updateLoading, handleSubmit };
};

export default useApi;
