import { useIntl } from 'react-intl';
import { useEffect } from 'react';
import { DSPHandleAxiosError, DSPHandleFormError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import { convertEvaluationTableColumn, convertEvaluationTableData, convertFormValueToPayload, setColumnTitle } from './utils';
import { openNotification } from '../../../../../../utils/notification';
import services from '../../../../../../../config/services';

const useApi = ({ open, form, handleCancel, handleRemoveRow, handleRemoveColumn }) => {
	const { loading: fetching, axiosApi: fetchEvaluationTable, data: evaluationTable } = DSPUseAxios().useGet();
	const { loading: updating, axiosApi: updateEvaluationTable } = DSPUseAxios().usePut();

	const intl = useIntl();
	const { formatMessage } = intl;

	const {
		params: { siteId },
	} = DSPUseNavAppendSearch();

	const getEvaluationTable = () => {
		fetchEvaluationTable({
			url: services.siteSignfiacancEvaluationTable.replace('{siteId}', siteId),
			mapper: resp => {
				const { columns, rows } = resp.data.result || {};
				const convertedData = convertEvaluationTableData(columns, rows);
				const convertedColumns = setColumnTitle(convertEvaluationTableColumn(columns, handleRemoveColumn, handleRemoveRow), false);
				return { columns: convertedColumns, rows: convertedData };
			},
		}).catch(error => DSPHandleAxiosError({ error, intl }));
	};

	useEffect(() => {
		if (!open) {
			const { columns, rows } = evaluationTable || {};
			handleCancel(columns, rows);
			return;
		}
		getEvaluationTable();
	}, [open]);

	const handleSubmit = ({ onFinish }) => {
		form.validateFields()
			.then(values => {
				const payload = convertFormValueToPayload(values);
				updateEvaluationTable({
					url: services.siteSignfiacancEvaluationTable.replace('{siteId}', siteId),
					data: payload,
				})
					.then(() => {
						onFinish();
						getEvaluationTable();
						openNotification('success', formatMessage({ id: 'common.message.update.success' }));
					})
					.catch(error => DSPHandleAxiosError({ error, intl }));
			})
			.catch(error => DSPHandleFormError({ error, form }));
	};

	return { loading: fetching, updating, evaluationTable, handleSubmit };
};

export default useApi;
