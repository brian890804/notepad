import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DSPRegionTreeSelect } from '@delta/dsp-ui';
import { Select } from '@delta/dsp-ui/lib/antd';
import classNames from 'classnames';
import TagItem from './tagItem/TagItem';
import services from '../../../config/services';
import useApi from './useApi';

import './siteCompanySelect.scss';

const SiteCompanySelect = ({ placeholder, disabled, value, onChange }) => {
	const [currentValue, setCurrentValue] = useState(value);
	const [regionTreeOpen, setRegionTreeOpen] = useState(false);

	useEffect(() => setCurrentValue(value), [value]);

	// 依照區域樹取得所有據點，並將據點匯入
	const { loading, handleTreeSelect } = useApi({ currentValue, setCurrentValue, setRegionTreeOpen, onChange });

	return (
		<div className={classNames('siteCompanySelect', 'scrollbarSmall')}>
			<Select
				mode="multiple"
				className="siteCompanySelect__select"
				{...{ placeholder, loading }}
				disabled={loading || disabled}
				value={currentValue}
				dropdownStyle={{ display: 'none' }} // 隱藏初始下拉選單用RegionTreeSelect 取代
				tagRender={tagProps => (
					<TagItem
						tags={currentValue}
						{...tagProps}
						onChange={result => {
							setCurrentValue(result);
							onChange(result);
						}}
					/>
				)}
				onClick={() => setRegionTreeOpen(pre => !pre)}
			/>
			{/* 選取Regions 樹狀下拉 css 隱藏欄位並設定相對位置 */}
			{!disabled && (
				<DSPRegionTreeSelect
					value={[]}
					disabled={disabled}
					domain={services.domain}
					onChange={handleTreeSelect}
					open={regionTreeOpen}
					className="siteCompanySelect__treeSelect"
				/>
			)}
		</div>
	);
};

SiteCompanySelect.defaultProps = {
	placeholder: undefined,
	disabled: undefined,
	value: undefined,
	// value: [
	// 	{
	// 		value: 14,
	// 		label: 'DEEEE',
	// 		companies: [
	// 			{ value: 6, label: '乾坤科技股份有限公司 (CYNTEC CO.,LTD.)' },
	// 			{ value: 456, label: '測試公司' },
	// 		],
	// 	},
	// 	// { value: 15, label: 'TEST', companies: [{ value: 5, label: 'Delta Electronics' }] },
	// 	{
	// 		value: 5,
	// 		label: '陽光大樓',
	// 		companies: [{ value: 10, label: '乾坤科技股份有限公司 (CYNTEC CO.,LTD.)1221133asd' }],
	// 	},
	// ],
	onChange: () => undefined,
};

SiteCompanySelect.propTypes = {
	/** 提示文字 */
	placeholder: PropTypes.string,
	/** 是否禁用 */
	disabled: PropTypes.bool,
	/** 元件值 (據點 含 公司) */
	value: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.number,
			label: PropTypes.string,
			companies: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })),
		})
	),
	/** 變動後的 callback */
	onChange: PropTypes.func,
};

export default SiteCompanySelect;
