import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Spin } from '@delta/dsp-ui/lib/antd';
import FormulaInput from '../formulaInput/FormulaInput';
import { createFomulaItem, FORMULA_ITEM_TYPE, OPERATORS } from '../utils';
import useApi from './useApi';
import './formulaFormItem.scss';

const FormulaFormItem = ({ value, onChange }) => {
	const fomulaInputRef = useRef();
	const focusInputIdxRef = useRef(-1);
	const temp = value ? [...value] : [];

	const { fetchingOptions, options } = useApi();

	/* 選擇評估選項 */
	const handleSelectOption = option => {
		const formulaItem = createFomulaItem(FORMULA_ITEM_TYPE.OPTION, option);
		const numberItem = createFomulaItem(FORMULA_ITEM_TYPE.NUMBER);
		if (focusInputIdxRef.current !== -1) {
			temp.splice(focusInputIdxRef.current + 1, 0, formulaItem);
			temp.splice(focusInputIdxRef.current + 2, 0, numberItem);
			focusInputIdxRef.current = -1;
		} else {
			temp.push(formulaItem);
			temp.push(numberItem);
		}

		onChange(temp);
	};

	/* 選擇運算元 */
	const handleSelectOperator = operator => {
		const formulaItem = createFomulaItem(FORMULA_ITEM_TYPE.OPERATOR, operator);
		const numberItem = createFomulaItem(FORMULA_ITEM_TYPE.NUMBER);
		if (focusInputIdxRef.current !== -1) {
			temp.splice(focusInputIdxRef.current + 1, 0, formulaItem);
			temp.splice(focusInputIdxRef.current + 2, 0, numberItem);
			focusInputIdxRef.current = -1;
		} else {
			temp.push(formulaItem);
			temp.push(numberItem);
		}

		onChange(temp);
	};

	/* 清除公式 */
	const handleReset = () => {
		const numberItem = createFomulaItem(FORMULA_ITEM_TYPE.NUMBER);
		onChange([numberItem]);
	};

	/* 移除公式內容 */
	const handleRemoveOption = idx => {
		if (!temp[idx]) return;
		if (temp[idx + 1]?.type === FORMULA_ITEM_TYPE.NUMBER && temp[idx - 1]?.type === FORMULA_ITEM_TYPE.NUMBER) {
			fomulaInputRef.current.mergeInputRefs(temp[idx + 1].id, temp[idx - 1].id);
			temp.splice(idx, 2);
		} else {
			temp.splice(idx, 1);
		}
		onChange(temp);
	};

	const handleFocusInput = idx => {
		focusInputIdxRef.current = idx;
	};

	return (
		<div className="formulaFormItem">
			<div className="formulaFormItem__input">
				<FormulaInput
					value={temp}
					ref={fomulaInputRef}
					onReset={handleReset}
					onFocus={handleFocusInput}
					onRemoveOption={handleRemoveOption}
					onSelectOperator={handleSelectOperator}
				/>
			</div>
			<div className="formulaFormItem__selection scrollbarSmall">
				<div className="formulaFormItem__selection__option">
					<div className="formulaFormItem__selection__option__list">
						{fetchingOptions && (
							<Spin spinning={fetchingOptions} className="formulaFormItem__selection__option__list__loading" />
						)}
						{!fetchingOptions &&
							options?.map(({ name, label }) => (
								<div
									key={label}
									onClick={() => handleSelectOption(label)}
									className="formulaFormItem__selection__option__list__item"
								>
									{`${label} : ${name}`}
								</div>
							))}
					</div>
				</div>
				<div className="formulaFormItem__selection__operator">
					<div className="formulaFormItem__selection__operator__list">
						{OPERATORS.map(item => (
							<div
								key={item}
								onClick={() => handleSelectOperator(item)}
								className="formulaFormItem__selection__operator__list__item"
							>
								{item}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

FormulaFormItem.defaultProps = {
	value: undefined,
	onChange: () => undefined,
};

FormulaFormItem.propTypes = {
	value: PropTypes.arrayOf(PropTypes.object),
	onChange: PropTypes.func,
};

export default FormulaFormItem;
