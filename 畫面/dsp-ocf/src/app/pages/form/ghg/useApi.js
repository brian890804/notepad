import { useEffect, useCallback } from 'react';
import { DSPHandleAxiosError, DSPHandleFormError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { useIntl } from 'react-intl';
import services from '../../../../config/services';
import { factorTypes } from './ghgFormSchema';

export default ({ form, ghgId, isedit, goback }) => {
	const intl = useIntl();

	// 取得 GHG
	const { loading, axiosApi: getGhgFactorType } = DSPUseAxios().useGet();
	// 建立 GHG
	const { loading: creating, axiosApi: createGhgFactorType } = DSPUseAxios().usePost();
	// 更新 GHG
	const { loading: updating, axiosApi: updateGhgFactorType } = DSPUseAxios().usePut();
	// 取得 GHG 所有種類
	const { axiosApi: getGhgGroups, data: ghgGroups } = DSPUseAxios().useGet();
	useEffect(() => {
		getGhgGroups({ url: services.ghgGroupByType, mapper: resp => resp?.data?.result });
	}, []);

	// 進入後取得 GHG
	useEffect(() => {
		if (isedit) {
			getGhgFactorType({ url: `${services.ghgFactorType}/${ghgId}` })
				.then(resp => {
					const { result } = resp?.data || {};
					const { modifyDate, reference, referenceType, region, countryMarket, name, unit, factors } = result;
					// 為符合應用:多筆匯入，故將其格式轉換
					// DSPForm - FormList 格式，故將其內容轉為 陣列
					const data = { modifyDate, reference, referenceType, region, countryMarket };
					data.ghg = [{ name, unit, factors }];
					// console.info('data', data);
					form.setFieldsValue(data);
				})
				.catch(error => DSPHandleAxiosError({ error, intl }));
		}
	}, [isedit, ghgId]);

	// 建立/更新 GHG
	const handleSubmit = useCallback(() => {
		form.validateFields()
			.then(result => {
				// console.info('result', result);
				const { modifyDate, reference, referenceType, region, countryMarket, ghg } = result || {};
				const { name, unit, factors } = ghg?.[0] || {};
				// 將表單內容轉回來
				const data = {
					...{ modifyDate, reference, referenceType, region, countryMarket, name, unit },
					factors: factorTypes?.map((type, i) => ({ ...factors?.[i], name: type })),
				};
				// console.info('data', data);
				(isedit
					? updateGhgFactorType({ url: `${services.ghgFactorType}/${ghgId}`, data })
					: createGhgFactorType({ url: services.ghgFactorType, data })
				)
					.then(() => {
						goback(); // 更新成功後返回
					})
					.catch(error => DSPHandleAxiosError({ error, intl }));
			})
			.catch(error => DSPHandleFormError({ form, error }));
	}, [isedit]);

	return { loading: loading || creating || updating, ghgGroups, handleSubmit };
};
