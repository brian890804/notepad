import { useCallback, useEffect } from 'react';
import { DSPHandleAxiosError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { useIntl } from 'react-intl';
import services from '../../../config/services';
import { openNotification } from '../../utils/notification';

// 去除相同的值
const filterValue = (v, i, a) => a.findIndex(t => t.value === v.value) === i;

export default ({ currentValue, setCurrentValue, setRegionTreeOpen, onChange }) => {
	const intl = useIntl();
	const { formatMessage } = intl;

	const { loading, axiosApi: fetchSitesList } = DSPUseAxios().useGet();

	// 點到涵蓋範圍下拉選單外就會關閉DropDown
	useEffect(() => {
		const handleClickOutside = e => {
			const targetElement = e.target.classList;
			if (targetElement.length > 0 && !targetElement[0]?.includes('ant-select')) setRegionTreeOpen(false);
		};
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	// Region 選擇後
	const handleTreeSelect = useCallback(
		result => {
			setRegionTreeOpen();
			const regionId = result?.value;
			fetchSitesList({ url: services.siteAll, config: { params: { regionId } } })
				.then(resp => {
					const sites = resp?.data?.result;
					if (sites?.length > 0) {
						// 將舊的與匯入的合併，並去除相同的值
						const mergeResult = [...(Array.isArray(currentValue) ? currentValue : []), ...sites].filter(filterValue);
						setCurrentValue(mergeResult);
						onChange(mergeResult);
						openNotification('success', formatMessage({ id: 'common.message.export.success' }));
					} else {
						openNotification('error', formatMessage({ id: 'project.import.site.empty' }));
					}
				})
				.catch(error => DSPHandleAxiosError({ error, intl }));
		},
		[currentValue, setRegionTreeOpen, setCurrentValue, onChange]
	);

	return { loading, handleTreeSelect };
};
