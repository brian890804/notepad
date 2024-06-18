import { DSPHandleAxiosError, DSPHandleFormError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import services from '../../../../../../../../config/services';
import { openNotification } from '../../../../../../../utils/notification';

export default ({ form, emissionId, emissionData, activityId, open, setFormValues, onFinish }) => {
	const intl = useIntl();
	const { formatMessage } = intl;
	const { loading, axiosApi: fetchActivityData } = DSPUseAxios().useGet();
	const { loading: createLoading, axiosApi: createActivityData } = DSPUseAxios().usePost();
	const { loading: updateLoading, axiosApi: updateActivityData } = DSPUseAxios().usePut();

	/** 取得單一活動數據 */
	useEffect(() => {
		if (activityId && open) {
			const isRefrigerant = emissionData?.lossMethod === 'refrigerant'; // 逸散方式 是否為 冷媒逸散
			fetchActivityData({ url: `${services.siteEmissionActivity}/${activityId}`, mapper: resp => resp?.data?.result })
				.then(data => {
					const formData = {
						...data,
						calcMethod: isRefrigerant ? data.calcMethod : undefined, // 若逸散方式被改為"非冷媒逸散"，則將計算方法清空
						calculateRange: data?.startDate && data?.endDate ? [data?.startDate, data?.endDate] : undefined,
					};
					form.setFieldsValue(formData);
					setFormValues(formData);
				})
				.catch(error => DSPHandleAxiosError({ intl, error }));
		}
	}, [activityId, open]);

	const handleSubmit = useCallback(() => {
		form.validateFields()
			.then(result => {
				const { calculateRange, ...otherProps } = result || {};
				const data = {
					...otherProps,
					emissionSourceId: emissionId,
					startDate: calculateRange?.[0],
					endDate: calculateRange?.[1],
				};
				(activityId
					? updateActivityData({ url: `${services.siteEmissionActivity}/${activityId}`, data })
					: createActivityData({ url: services.siteEmissionActivity, data })
				)
					.then(() => {
						onFinish(true);
						openNotification(
							'success',
							activityId
								? formatMessage({ id: 'common.message.update.success' })
								: formatMessage({ id: 'common.message.add.success' })
						);
					})
					.catch(error => DSPHandleAxiosError({ intl, error }));
			})
			.catch(error => DSPHandleFormError({ form, error }));
	}, [emissionId, activityId]);

	return { loading: loading || createLoading || updateLoading, handleSubmit };
};
