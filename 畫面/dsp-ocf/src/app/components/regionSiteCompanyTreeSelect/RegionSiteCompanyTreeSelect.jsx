import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Select, TreeSelect } from '@delta/dsp-ui/lib/antd';
import classNames from 'classnames';
import { DownOutlined } from '@delta/dsp-ui/lib/antd/icons';
import SiteTag from '../siteTag/SiteTag';
import { handleDeSelectValue, handleSelectValue } from './utils';
import DropdownRender from './dropdownRender/DropdownRender';
import useApi from './useApi';

import './regionSiteCompanyTreeSelect.scss';

const RegionSiteCompanyTreeSelect = ({ className, placeholder, maxTagCount, value, removeCompany, disabled, onChange }) => {
	const [treeSelectValue, setTreeSelectValue] = useState();
	const [currentValue, setCurrentValue] = useState();
	const [searchValue, setSearchValue] = useState();
	const [treeSelectOpen, setTreeSelectOpen] = useState(false);

	/** 取得樹狀 */
	const { loading, treeData } = useApi({ searchValue, removeCompany });

	// 點到涵蓋範圍下拉選單外就會關閉DropDown
	useEffect(() => {
		const handleClickOutside = e => {
			const targetElement = e.target.classList;
			if (targetElement.length > 0 && !targetElement[0]?.includes('ant-select')) setTreeSelectOpen(false);
		};
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	/** 初始值放入 */
	useEffect(() => {
		setCurrentValue(value);
		// setTreeSelectValue(value);
		setTreeSelectValue(
			value
				?.map(i => {
					/* 將外面給的值(據點)打入 treeSelect 以顯示勾選
					 * 有 companies 代表特別勾選，無 companies 代表選整個據點 */
					if (i?.companies?.length > 0) {
						return i?.companies.map(company => ({
							label: company.label,
							value: `${i?.value}-${company?.value}-company`,
						}));
					}
					return { label: i?.label, value: i?.value };
				})
				.flat()
		);
	}, [value]);
	// useEffect(() => onChange(currentValue), [currentValue]);
	// useEffect(() => console.info('treeSelectValue', treeSelectValue), [treeSelectValue]);

	const handleChange = useCallback(
		result => {
			setCurrentValue(result);
			onChange(result);
		},
		[onChange]
	);

	return (
		<div className={classNames(className, 'regionSiteCompanyTreeSelect')}>
			<Select
				mode="multiple"
				className="regionSiteCompanyTreeSelect__select"
				showSearch={false}
				{...{ placeholder, loading, maxTagCount, disabled }}
				value={currentValue}
				dropdownStyle={{ display: 'none' }}
				tagRender={({ value: siteId }) => {
					const item = currentValue?.find(i => i?.value === siteId);
					return (
						<SiteTag color="blue" key={item?.value} title={item?.label} companies={item?.companies}>
							{`${item?.label} ${item?.companies?.length > 0 ? `(${item?.companies?.length})` : ''}`}
						</SiteTag>
					);
				}}
				onClick={() => setTreeSelectOpen(pre => !pre)}
			/>
			<TreeSelect
				treeLine
				treeDefaultExpandAll
				treeCheckable
				labelInValue
				treeIcon
				{...{ disabled, searchValue }}
				popupMatchSelectWidth={false}
				open={treeSelectOpen}
				className="regionSiteCompanyTreeSelect__treeSelect"
				popupClassName="regionSiteCompanyTreeSelect__treeSelect__pop"
				switcherIcon={<DownOutlined />}
				filterTreeNode={(input, node) => node?.title?.toLowerCase().includes(input?.toLowerCase())}
				value={treeSelectValue}
				maxTagCount={1}
				onChange={setTreeSelectValue}
				onSelect={(_, node) => handleChange(handleSelectValue(node, currentValue))}
				onDeselect={(_, node) => handleChange(handleDeSelectValue(node, currentValue))}
				dropdownRender={originNode => (
					<DropdownRender
						{...{ treeData, loading, originNode, searchValue, setSearchValue }}
						onChange={sites => {
							setTreeSelectValue(sites?.map(i => i?.children)?.flat());
							handleChange(
								sites.map(i => ({
									label: i?.title,
									value: i?.id,
									companies: i?.children?.map(company => ({
										label: company?.title,
										value: company?.id,
									})),
								}))
							);
						}}
					/>
				)}
				{...{ loading, placeholder, treeData }}
			/>
		</div>
	);
};

RegionSiteCompanyTreeSelect.defaultProps = {
	className: undefined,
	placeholder: undefined,
	maxTagCount: undefined,
	value: undefined,
	removeCompany: undefined,
	disabled: undefined,
	onChange: () => undefined,
};

RegionSiteCompanyTreeSelect.propTypes = {
	/** CSS Name */
	className: PropTypes.string,
	/** 提示文字 */
	placeholder: PropTypes.string,
	/** 內容最大數量 */
	maxTagCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // string for responsive
	/** 目前的值 */
	value: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		})
	),
	/** 是否移除 company node */
	removeCompany: PropTypes.bool,
	/** 是否禁用 */
	disabled: PropTypes.bool,
	/** 變動後的 callback */
	onChange: PropTypes.func,
};

export default RegionSiteCompanyTreeSelect;
