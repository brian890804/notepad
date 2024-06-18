import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { DSPHandleAxiosError, DSPHandleFormError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import services from '../../../../../config/services';
import { openNotification } from '../../../../utils/notification';

const useApi = ({ form, open, exportMode, projectId, onFinish, onExport }) => {
	const intl = useIntl();
	const { formatMessage } = intl;
	const { loading, axiosApi: fetchProject } = DSPUseAxios().useGet();
	const { loading: createLoading, axiosApi: createProject } = DSPUseAxios().usePost();
	const { loading: updateLoading, axiosApi: updateProject } = DSPUseAxios().usePut();

	/** 取得專案資料 */
	useEffect(() => {
		if (projectId && open) {
			fetchProject({ url: `${services.project}/${projectId}`, mapper: resp => resp?.data?.result })
				.then(data => {
					form.setFieldsValue({
						...data,
						calculateRange: data?.startDate && data?.endDate ? [data?.startDate, data?.endDate] : undefined,
					});
				})
				.catch(error => DSPHandleAxiosError({ error, intl }));
		} else {
			form.resetFields();
		}
	}, [projectId, open]);

	/** 新增/編輯專案 */
	const handleSubmit = useCallback(() => {
		form.validateFields()
			.then(result => {
				const { calculateRange, ...otherProps } = result || {};
				const data = { ...otherProps, startDate: calculateRange?.[0], endDate: calculateRange?.[1] };

				/** 若是匯出模式，則將內容拋出即可 */
				if (exportMode) {
					onExport(data);
					return;
				}

				(projectId
					? updateProject({ url: `${services.project}/${projectId}`, data })
					: createProject({ url: services.project, data })
				)
					.then(() => {
						onFinish(true);
						openNotification(
							'success',
							projectId
								? formatMessage({ id: 'common.message.update.success' })
								: formatMessage({ id: 'common.message.add.success' })
						);
					})
					.catch(error => DSPHandleAxiosError({ intl, error }));
			})
			.catch(error => DSPHandleFormError({ form, error }));
	}, [projectId]);

	return { loading: loading || createLoading || updateLoading, handleSubmit };
};

export default useApi;
