import { useEffect } from 'react';
import { DSPHandleAxiosError, DSPHandleFormError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { useIntl } from 'react-intl';
import services from '../../../../../../config/services';
import { openNotification } from '../../../../../utils/notification';
import { getIntl } from '../../../../../intl/IntlGlobalProvider';

const useApi = ({ form, resourceId, siteId, open, setIsElectricity, onFinish }) => {
	const { loading: isFetchingResource, axiosApi: fetchResource } = DSPUseAxios().useGet();
	const { loading: isCreating, axiosApi: createResource } = DSPUseAxios().usePost();
	const { loading: isUpdating, axiosApi: updateResource } = DSPUseAxios().usePut();

	const intl = useIntl();
	const { formatMessage } = intl;

	/** 如果有 resourceId 代表為編輯模式 */
	useEffect(() => {
		if (resourceId && open) {
			fetchResource({ url: `${services.resource}/${resourceId}`, mapper: resp => resp?.data?.result })
				.then(data => {
					form?.setFieldsValue(data);
					setIsElectricity(data?.isElectricity);
				})
				.catch(error => DSPHandleAxiosError({ error, intl: getIntl() }));
		} else {
			form?.resetFields();
		}
	}, [resourceId, open]);

	const handleSubmit = () => {
		form.validateFields()
			.then(result => {
				const { factorTables, nonOverlapContent, ...data } = result || {};
				data.siteId = siteId;
				data.factorTables = factorTables?.map(({ idx, ...props }) => props);

				if (nonOverlapContent) {
					openNotification('error', formatMessage({ id: 'common.time.leak' }), nonOverlapContent);
					return;
				}

				(resourceId
					? updateResource({ url: `${services.resource}/${resourceId}`, data })
					: createResource({ url: services.resource, data })
				)
					.then(() => {
						onFinish(true);
						openNotification(
							'success',
							resourceId
								? formatMessage({ id: 'common.message.update.success' })
								: formatMessage({ id: 'common.message.add.success' })
						);
					})
					.catch(error => DSPHandleAxiosError({ intl, error }));
			})
			.catch(error => DSPHandleFormError({ form, error }));
	};

	return { isFetchingResource, loading: isCreating || isUpdating, handleSubmit };
};

export default useApi;
