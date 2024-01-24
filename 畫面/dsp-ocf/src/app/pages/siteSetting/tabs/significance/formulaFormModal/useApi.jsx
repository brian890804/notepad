import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { DSPHandleAxiosError, DSPHandleFormError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import { FORMULA_ITEM_TYPE, insertFormulaItemsId } from './utils';
import { openNotification } from '../../../../../utils/notification';
import services from '../../../../../../config/services';

const useApi = ({ form, open, onFinish }) => {
	const { loading: fetching, axiosApi: fetchFormula } = DSPUseAxios().useGet();
	const { loading: updating, axiosApi: updateFormula } = DSPUseAxios().usePut();
	const intl = useIntl();

	const {
		params: { siteId },
	} = DSPUseNavAppendSearch();

	useEffect(() => {
		if (!open) return;
		form?.resetFields();

		fetchFormula({
			url: services.siteSignfiacanceAssessmentScore.replace('{siteId}', siteId),
			mapper: resp => resp?.data?.result,
		})
			.then(data => {
				if (!data) return;
				form?.setFieldsValue({ formula: insertFormulaItemsId(data.formula), threshold: data.threshold });
			})
			.catch(error => DSPHandleAxiosError({ error, intl }));
	}, [open]);

	const handleSubmit = () => {
		form?.validateFields()
			.then(data => {
				const payload = {
					formula: data.formula.filter(({ type, content }) => !(type === FORMULA_ITEM_TYPE.NUMBER && !content)),
					threshold: data.threshold,
				};
				updateFormula({
					url: services.siteSignfiacanceAssessmentScore.replace('{siteId}', siteId),
					data: payload,
				})
					.then(() => {
						onFinish(true);
						openNotification('success', intl.formatMessage({ id: 'common.message.update.success' }));
					})
					.catch(error => DSPHandleAxiosError({ error, intl }));
			})
			.catch(error => DSPHandleFormError({ form, error }));
	};

	return { loading: updating || fetching, handleSubmit };
};

export default useApi;
