import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { DSPHandleAxiosError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { Select, Spin } from '@delta/dsp-ui/lib/antd';
import { useIntl } from 'react-intl';
import services from '../../../../../config/services';

import './referenceSelect.scss';

const ReferenceSelect = forwardRef((props, ref) => {
	const { value, onChange } = props;
	const intl = useIntl();
	const { formatMessage } = intl;
	const [currentValue, setCurrentValue] = useState();
	const [searchValue, setSearchValue] = useState();

	useEffect(() => setCurrentValue(value), [value]);

	// 取得係數來源列表
	const { loading, axiosApi: getReference, data: options } = DSPUseAxios().useGet();
	// 建立係數來源名稱
	const { loading: creating, axiosApi: createReference } = DSPUseAxios().usePost();

	// 搜尋條件
	const filterOption = useCallback((input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()), [searchValue]);

	// 是否出現建立選項
	const showCreate = useMemo(() => !options?.some(item => item.label === searchValue), [searchValue]);

	// 取得下拉選單
	const fetchReference = useCallback(() => {
		getReference({ url: services.dropdowns.replace('{cate}', 'reference'), mapper: res => res?.data?.result }).catch(error =>
			DSPHandleAxiosError({ error, intl })
		);
	}, []);
	useEffect(() => fetchReference(), []);

	/** 將 function 給外部，提供外部打API */
	useImperativeHandle(ref, () => ({ fetchReference }));

	return (
		<Select
			showSearch
			labelInValue
			{...{ filterOption, options, searchValue, onChange }}
			className="referenceSelect"
			placeholder={formatMessage({ id: 'common.placeholder' }, { text: formatMessage({ id: 'factorDB.modal.reference' }) })}
			// optionFilterProp="children"
			value={currentValue}
			notFoundContent={searchValue ? <></> : undefined}
			loading={loading || creating}
			onSearch={setSearchValue}
			dropdownRender={menu => (
				<Spin spinning={loading || creating}>
					{menu}
					{showCreate && searchValue && (
						<div
							className="referenceSelect__dropdown"
							onClick={() =>
								createReference({
									url: services.dropdown.replace('{cate}', 'reference'),
									data: { label: searchValue },
									mapper: resp => resp?.data?.result,
								})
									.then(createId => {
										fetchReference();
										setSearchValue();
										onChange({ value: createId, label: searchValue });
									})
									.catch(error => DSPHandleAxiosError({ error, intl }))
							}
						>
							<span className="referenceSelect__dropdown__label">Create </span>
							<span>{searchValue}</span>
						</div>
					)}
				</Spin>
			)}
		/>
	);
});

ReferenceSelect.defaultProps = {
	value: undefined,
	onChange: () => undefined,
};

ReferenceSelect.propTypes = {
	value: PropTypes.shape({ label: PropTypes.string, value: PropTypes.number }),
	onChange: PropTypes.func,
};

export default ReferenceSelect;
