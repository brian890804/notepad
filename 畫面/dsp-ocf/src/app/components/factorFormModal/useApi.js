/* eslint-disable */
import { DSPHandleAxiosError, DSPHandleFormError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import services from '../../../config/services';
import { openNotification } from '../../utils/notification';
import checkMultipleTimeOverlap from '../../utils/checkMultipleTimeOverlap';
import { getNonOverlapContent, getOverlapContent } from '../../utils/getDateOverlapContent';

const useApi = ({ form, open, factorId, factorTables, onFinish, onSubmit }) => {
	const [referenceId, setReferenceId] = useState(); // 規範 id
	const [tableFactorTypeId, setTableFactorTypeId] = useState(); // 綁定係數表id

	const intl = useIntl();
	const { formatMessage } = intl;
	const { loading: tableLoading, axiosApi: fetchFactorTable } = DSPUseAxios().useGet();
	const { loading: isFetchingFactor, axiosApi: fetchFactor } = DSPUseAxios().useGet();
	const { loading: isCreatingFactor, axiosApi: createFactor } = DSPUseAxios().usePost();
	const { loading: isUpdatingFactor, axiosApi: updateFactor } = DSPUseAxios().usePut();

	useEffect(() => {
		if (!open) {
			setReferenceId();
			setTableFactorTypeId();
			form?.resetFields();
		}
	}, [open]);

	/** 依照 factorTableId 取得 factor table 並塞入 */
	useEffect(() => {
		if (tableFactorTypeId) {
			fetchFactorTable({ url: `${services.ghgFactorTable}/${tableFactorTypeId}`, mapper: resp => resp?.data?.result })
				.then(result => {
					form.setFieldValue(['table', 'factors'], result?.factors);
					form.setFieldValue(['table', 'unit'], result?.unit);
				})
				.catch(error => DSPHandleAxiosError({ error, intl }));
		}
	}, [tableFactorTypeId]);

	/** 若有 factorId 視為編輯，故取得係數資料 */
	useEffect(() => {
		if (factorId && open) {
			fetchFactor({ url: `${services.resourceFactor}/${factorId}`, mapper: resp => resp.data.result })
				.then(data => {
					const { table } = data || {};
					const { reference } = table || {};
					setReferenceId(reference?.value);
					setTableFactorTypeId(table?.factorType?.value);
					form?.setFieldsValue({ ...data, table });
				})
				.catch(error => DSPHandleAxiosError({ error, intl }));
		}
	}, [factorId, open]);

	const handleSubmit = () => {
		form.validateFields()
			.then(result => {
				/** 如果有自訂的 submit 事件，即執行並直接結束流程 */
				if (onSubmit) {
					onSubmit(result);
					return;
				}

				const { table, ...data } = result || {}; // 取出不需要回傳 server 的參數
				data.table = { ...table, id: table?.id || table?.factorType?.value }; // [編輯] 有id為原本為主 [新增綁定] 無id則視為新增綁定(協助帶入id)
				const factors = (Array.isArray(factorTables) ? factorTables : []).concat([data]);
				const filtered = factors.filter(i => i.ghgBased === data.ghgBased && (factorId ? i.id !== data.id : true));
				const { isOverlap, nonOverlapRanges, overlapRanges } = checkMultipleTimeOverlap(filtered);

				// 如果時間區間有重疊，跳 error 並且不新增
				if (isOverlap) {
					const overlapContent = getOverlapContent(overlapRanges);
					openNotification('error', formatMessage({ id: 'common.time.overlap' }), overlapContent);
					return;
				}

				// 如果時間區間未重疊但有缺少的時間區段，跳 error 並且不新增
				if (nonOverlapRanges?.length > 0) {
					const nonOverlapContent = getNonOverlapContent({ [data.ghgBased]: nonOverlapRanges });
					openNotification('error', formatMessage({ id: 'common.time.leak' }), nonOverlapContent);
					return;
				}

				(factorId
					? updateFactor({ url: `${services.resourceFactor}/${factorId}`, data }) // 更新係數表
					: createFactor({ url: services.resourceFactor, data })
				)
					.then(() => {
						onFinish(true);
						openNotification(
							'success',
							formatMessage({ id: factorId ? 'common.message.update.success' : 'common.message.add.success' })
						);
					})
					.catch(error => DSPHandleAxiosError({ intl, error }));
			})
			.catch(error => DSPHandleFormError({ form, error }));
	};

	return {
		loading: tableLoading || isFetchingFactor || isCreatingFactor || isUpdatingFactor,
		handleSubmit,
		referenceId,
		setReferenceId,
		tableFactorTypeId,
		setTableFactorTypeId,
	};
};

export default useApi;
