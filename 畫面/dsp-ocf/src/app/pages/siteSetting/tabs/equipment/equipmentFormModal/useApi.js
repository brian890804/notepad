import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { DSPHandleAxiosError, DSPHandleFormError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import services from '../../../../../../config/services';
import { openNotification } from '../../../../../utils/notification';

const useApi = ({ form, open, siteId, equipmentId, onFinish }) => {
	const intl = useIntl();
	const { formatMessage } = intl;
	const { loading, axiosApi: fetchEquipment } = DSPUseAxios().useGet();
	const { loading: createLoading, axiosApi: createEquipment } = DSPUseAxios().usePost();
	const { loading: updateLoading, axiosApi: updateEquipment } = DSPUseAxios().usePut();

	/** 取得設施資料 */
	useEffect(() => {
		if (equipmentId && open) {
			fetchEquipment({ url: `${services.siteEquipment}/${equipmentId}`, mapper: resp => resp?.data?.result })
				.then(data => form.setFieldsValue(data))
				.catch(error => DSPHandleAxiosError({ error, intl }));
		} else {
			form.resetFields();
		}
	}, [equipmentId, open]);

	/** 新增/編輯設施 */
	const handleSubmit = useCallback(() => {
		form.validateFields()
			.then(result => {
				const data = { ...result, siteId };
				(equipmentId
					? updateEquipment({ url: `${services.siteEquipment}/${equipmentId}`, data })
					: createEquipment({ url: services.siteEquipment, data })
				)
					.then(() => {
						onFinish(true);
						openNotification(
							'success',
							equipmentId
								? formatMessage({ id: 'common.message.update.success' })
								: formatMessage({ id: 'common.message.add.success' })
						);
					})
					.catch(error => DSPHandleAxiosError({ intl, error }));
			})
			.catch(error => DSPHandleFormError({ form, error }));
	}, [siteId, equipmentId]);

	return { loading: loading || createLoading || updateLoading, handleSubmit };
};

export default useApi;
