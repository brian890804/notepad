import { useEffect, useCallback } from 'react';
import { DSPHandleAxiosError, DSPHandleFormError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { useIntl } from 'react-intl';
import services from '../../../../config/services';
// import { factorTypes } from './gwpFormSchema';

export default ({ form, gwpId, isedit, goback }) => {
	const intl = useIntl();

	// 取得 GWP
	const { loading, axiosApi: getGwpFactors } = DSPUseAxios().useGet();
	// 建立 GWP
	const { loading: creating, axiosApi: createGwpFactor } = DSPUseAxios().usePost();
	// 更新 GWP
	const { loading: updating, axiosApi: updateGwpFactor } = DSPUseAxios().usePut();
	// 取得全部 ghg 種類
	const { axiosApi: getAllGHG, data: ghgTypes } = DSPUseAxios().useGet();
	useEffect(() => {
		getAllGHG({ url: services.ghgAll, mapper: resp => resp?.data?.result })
			.then(types => {
				if (!isedit) form.setFieldsValue({ gwp: [{ factors: types?.map(ghg => ({ ghg })) }] });
			})
			.catch(error => {
				DSPHandleAxiosError({ error, intl });
			});
	}, []);

	// 進入後取得 GWP
	useEffect(() => {
		if (isedit) {
			getGwpFactors({ url: `${services.gwpFactor}/${gwpId}` })
				.then(resp => {
					const { result } = resp?.data || {};
					const { modifyDate, reference, referenceType, region, countryMarket, name, factors } = result;
					// 為符合應用:多筆匯入，故將其格式轉換
					// DSPForm - FormList 格式，故將其內容轉為 陣列
					const data = { modifyDate, reference, referenceType, region, countryMarket };
					data.gwp = [{ name, factors }];
					form.setFieldsValue(data);
				})
				.catch(error => DSPHandleAxiosError({ error, intl }));
		}
	}, [isedit, gwpId]);

	// 建立/更新 GWP
	const handleSubmit = useCallback(() => {
		form.validateFields()
			.then(result => {
				const { modifyDate, reference, referenceType, region, countryMarket, gwp } = result || {};
				const { name, factors } = gwp?.[0] || {};
				// 將表單內容轉回來
				const data = { modifyDate, reference, referenceType, region, countryMarket, name, factors };

				(isedit
					? updateGwpFactor({ url: `${services.gwpFactor}/${gwpId}`, data })
					: createGwpFactor({ url: services.gwpFactor, data })
				)
					.then(() => {
						goback(); // 更新成功後返回
					})
					.catch(error => DSPHandleAxiosError({ error, intl }));
			})
			.catch(error => DSPHandleFormError({ form, error }));
	}, [isedit, ghgTypes]);

	return {
		ghgTypes,
		loading: loading || creating || updating || !ghgTypes || ghgTypes?.length === 0, // ghgTypes 在沒取到前都是 loading 不給填
		handleSubmit,
	};
};
