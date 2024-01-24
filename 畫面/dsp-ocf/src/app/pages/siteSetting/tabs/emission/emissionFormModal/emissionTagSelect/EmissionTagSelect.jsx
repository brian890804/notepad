import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { DSPHandleAxiosError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { Select, Spin } from '@delta/dsp-ui/lib/antd';
import { useIntl } from 'react-intl';
import services from '../../../../../../../config/services';

import './emissionTagSelect.scss';

const convertToLabelValue = data =>
	data?.map(item => ({ ...item, label: `${item?.name} (${item?.isCustom ? 'Custom' : 'Regular'})`, value: item?.id }));

const EmissionTagSelect = forwardRef((props, ref) => {
	const { value, onChange } = props;
	const intl = useIntl();
	const { formatMessage } = intl;
	const [currentValue, setCurrentValue] = useState();
	const [searchValue, setSearchValue] = useState();

	useEffect(() => setCurrentValue(convertToLabelValue(value)), [value]);

	// 取得排放源標籤列表
	const { loading, axiosApi: getEmissionTags, data: options } = DSPUseAxios().useGet();
	// 建立排放源標籤
	const { loading: creating, axiosApi: createTag } = DSPUseAxios().usePost();

	// 搜尋條件
	const filterOption = useCallback((input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()), [searchValue]);

	// 是否出現建立選項
	const showCreate = useMemo(() => !options?.some(item => item.label === searchValue), [searchValue]);

	// 取得下拉選單
	const fetchEmissionTags = useCallback(() => {
		getEmissionTags({ url: services.emissionTags, mapper: res => convertToLabelValue(res?.data?.result) }).catch(error =>
			DSPHandleAxiosError({ error, intl })
		);
	}, []);
	useEffect(() => fetchEmissionTags(), []);

	/** 將 function 給外部，提供外部打API */
	useImperativeHandle(ref, () => ({ fetchEmissionTags }));

	const handleChange = useCallback(
		result => {
			onChange(result);
			setCurrentValue(result);
		},
		[onChange]
	);

	return (
		<Select
			showSearch
			labelInValue
			{...{ filterOption, options, searchValue }}
			className="emissionTagSelect"
			mode="multiple"
			placeholder={formatMessage({ id: 'common.placeholder' }, { text: formatMessage({ id: 'site.setting.emission.tag' }) })}
			value={currentValue}
			notFoundContent={searchValue ? <></> : undefined}
			loading={loading || creating}
			onSearch={setSearchValue}
			onChange={(_, result) => handleChange(result)}
			dropdownRender={menu => (
				<Spin spinning={loading || creating}>
					{menu}
					{showCreate && searchValue && (
						<div
							className="emissionTagSelect__dropdown"
							onClick={() =>
								createTag({
									url: services.emissionTag,
									data: { name: searchValue, isCustom: true },
									mapper: resp => resp?.data?.result,
								})
									.then(id => {
										fetchEmissionTags();
										setSearchValue();
										handleChange(
											(Array.isArray(currentValue) ? currentValue : []).concat([
												{ id, value: id, name: searchValue, label: searchValue, isCustom: true },
											])
										);
									})
									.catch(error => DSPHandleAxiosError({ error, intl }))
							}
						>
							<span className="emissionTagSelect__dropdown__label">{formatMessage({ id: 'common.create' })}</span>
							<span>{searchValue}</span>
						</div>
					)}
				</Spin>
			)}
		/>
	);
});

EmissionTagSelect.defaultProps = {
	value: undefined,
	onChange: () => undefined,
};

EmissionTagSelect.propTypes = {
	value: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.number })),
	onChange: PropTypes.func,
};

export default EmissionTagSelect;
