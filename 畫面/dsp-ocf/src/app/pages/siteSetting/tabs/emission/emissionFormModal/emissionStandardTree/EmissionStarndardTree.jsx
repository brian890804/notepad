import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Space } from '@delta/dsp-ui/lib/antd';
import { DSPNestedUtil } from '@delta/dsp-ui/lib/utils';
import { DSPApiSelect } from '@delta/dsp-ui';
import SegmentedGroup from '../../../../../../components/sementedGoup/SegmentedGroup';
import useApi from './useApi';
import './emissionStandardTree.scss';

const FIELD_TYPE = { STANDARD: 'standard', CATEGORY: 'category', SUBCATEGORY: 'subCategory', ELECTRIC: 'electric' };
const ACTION_TYPE = { EDIT: 'edit', ADD: 'add' };

const findOption = (options, target) => options?.find(item => item.value === target?.value)?.children || [];

const EmissionStarndardTree = ({ value, onChange, mode }) => {
	const { formatMessage } = useIntl();
	const [options, setOptions] = useState({
		standard: undefined,
		category: undefined,
		subCategory: undefined,
		electric: undefined,
	});
	const [selectedOption, setSelectedOption] = useState({
		standard: undefined,
		category: undefined,
		subCategory: undefined,
		electric: undefined,
	});
	const [hasSetInitValue, setHasSetInitValue] = useState();
	const [userClick, setUserClick] = useState(mode !== ACTION_TYPE.EDIT);
	const [isElectric, setIsElectric] = useState();

	const { fetchingStandardTree, standardTree } = useApi();
	const { findPathNodes } = DSPNestedUtil();

	useEffect(() => {
		if (mode === ACTION_TYPE.EDIT) setUserClick(false);
	}, [mode]);

	/** 解析 API 返回的 Tree  */
	useEffect(() => {
		if (options.standard) return;
		/** 設定完標準樹後自動選定第一個 subCategory */
		const defaultStandard = standardTree?.[0];
		const defaultCategory = defaultStandard?.children?.[0];

		const categoryOptions = findOption(standardTree, defaultStandard);
		const subCategoryOptions = findOption(categoryOptions, defaultCategory);

		setOptions({ standard: standardTree, category: categoryOptions, subCategory: subCategoryOptions });
		setSelectedOption({ standard: defaultStandard, category: defaultCategory });
	}, [standardTree, options.standard]);

	/** 第一層標準變更後設定第二層分類的列表，切換標準時自動選定第一個分類選項 */
	useEffect(() => {
		if (!selectedOption.standard || !options.standard) return;
		const categoryOptions = findOption(options.standard, selectedOption.standard);
		setOptions(state => ({ ...state, category: categoryOptions }));
		if (mode === ACTION_TYPE.EDIT && !userClick) return;
		setSelectedOption(state => ({ ...state, category: categoryOptions?.[0] || [] }));
	}, [options.standard, selectedOption.standard]);

	/** 第二層分類變更後設定第三層子類的列表，切換分類時自動選定第一個子類選項 */
	useEffect(() => {
		if (!selectedOption.category || !options.category) return;
		const subCategoryOptions = findOption(options.category, selectedOption.category);
		setOptions(state => ({ ...state, subCategory: subCategoryOptions }));
		if (mode === ACTION_TYPE.EDIT && !userClick) return;
		setSelectedOption(state => ({ ...state, subCategory: subCategoryOptions?.[0] || [] }));
	}, [options.category, selectedOption.category]);

	/** 第三層子類變更後如為2.1類需設定第電力類別的列表，切換2.1子類時自動選定第一個電力選項 */
	useEffect(() => {
		if (!selectedOption.subCategory || !options.subCategory) return;
		const electricOptions = findOption(options.subCategory, selectedOption.subCategory);
		const isElectricOption = electricOptions.length > 0;
		if (isElectricOption) {
			setIsElectric(true);
			setOptions(state => ({ ...state, electric: electricOptions }));
			if (mode === ACTION_TYPE.EDIT && !userClick) return;
			onChange(electricOptions[0]?.value);
		} else {
			setIsElectric(false);
			if (mode === ACTION_TYPE.EDIT && !userClick) return;
			onChange(selectedOption.subCategory?.value);
		}
	}, [options.subCategory, selectedOption.subCategory]);

	/** 如果有初始值自動幫他設定 */
	useEffect(() => {
		if (!value || !options.standard || hasSetInitValue) return;
		const [standard, category, subCategory, electric] = findPathNodes(options.standard, value);
		if (electric) setIsElectric(true);
		setSelectedOption(state => ({ ...state, standard, category, subCategory }));
		setHasSetInitValue(true);
	}, [options.standard, value, hasSetInitValue]);

	const handleChange = (type, data) => {
		setSelectedOption(state => ({ ...state, [type]: data }));
		setUserClick(true);
	};

	return (
		<Space direction="vertical" className="emissionStandardTree">
			{options.standard && options.category && (
				<>
					{/* 標準列表 */}
					<SegmentedGroup
						value={selectedOption.standard}
						options={options.standard}
						onChange={data => handleChange(FIELD_TYPE.STANDARD, data)}
					/>
					{/* 標準下分類列表 */}
					<SegmentedGroup
						value={selectedOption.category}
						options={options.category}
						onChange={data => handleChange(FIELD_TYPE.CATEGORY, data)}
					/>
				</>
			)}
			{/* 分類下子類列表 */}
			<div className="emissionStandardTree__subCategory">
				<DSPApiSelect
					value={selectedOption.subCategory?.value}
					style={{ width: 'calc(50% - 8px)' }}
					options={options.subCategory}
					onChange={data => handleChange(FIELD_TYPE.SUBCATEGORY, data)}
					loading={fetchingStandardTree}
					placeholder={formatMessage(
						{ id: 'common.placeholder' },
						{ text: formatMessage({ id: 'site.setting.schema.standard' }) }
					)} // "請輸入標準"
				/>
				{isElectric && (
					<DSPApiSelect
						virtual={false}
						value={value}
						style={{ width: 'calc(50% - 8px)' }}
						options={options.electric}
						onChange={data => onChange(data?.value)}
						loading={fetchingStandardTree}
						placeholder={formatMessage(
							{ id: 'common.placeholder' },
							{ text: formatMessage({ id: 'site.setting.schema.standard' }) }
						)} // "請輸入標準"
					/>
				)}
			</div>
		</Space>
	);
};

EmissionStarndardTree.defaultProps = {
	value: undefined,
	onChange: () => undefined,
	mode: undefined,
};

EmissionStarndardTree.propTypes = {
	value: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string]),
	onChange: PropTypes.func,
	mode: PropTypes.oneOf([ACTION_TYPE.EDIT, ACTION_TYPE.ADD]),
};

export default EmissionStarndardTree;
