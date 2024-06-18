import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { Button } from '@delta/dsp-ui/lib/antd';
import { CloseCircleOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { FORMULA_ITEM_TYPE, getInputWidth, getClassByType, findLastInputId, OPERATORS } from '../utils';
import './formulaInput.scss';

const FormulaInput = forwardRef(({ value, onFocus, onReset, onRemoveOption, onSelectOperator }, ref) => {
	const inputRefs = useRef([]);
	const focusInputIdxRef = useRef(-1);
	const { formatMessage } = useIntl();

	const handleKeydown = (e, idx) => {
		const { selectionStart, selectionEnd, value: inputValue } = e.target || {};

		const isNumericKey = /^\d$/.test(e.key);
		const isFunctionKey = /^(ArrowLeft|ArrowRight|Delete|Backspace|%|\.)$/.test(e.key);
		const isOperatorKey = /^(\*|\+|-|\(|\))$/.test(e.key);

		if (!isNumericKey && !isFunctionKey && !isOperatorKey) {
			e.preventDefault();
			return;
		}

		if (e.key === '.' && inputValue.includes('.')) {
			e.preventDefault();
			return;
		}

		if (OPERATORS.includes(e.key)) {
			e.preventDefault();
			onSelectOperator(e.key);
			return;
		}

		if (e.key === 'Backspace' && selectionStart === 0 && selectionEnd === 0 && idx > 0) {
			e.preventDefault();
			onRemoveOption(idx - 1);
			focusInputIdxRef.current = idx - 1;
			return;
		}

		if (e.key === 'Delete' && selectionStart === inputValue.length && selectionEnd === inputValue.length) {
			e.preventDefault();
			onRemoveOption(idx + 1);
			focusInputIdxRef.current = idx - 1;
			return;
		}

		if (e.key === 'ArrowLeft' && selectionStart === 0 && selectionEnd === 0 && idx > 0) {
			e.preventDefault();
			inputRefs.current.find(item => item.id === value[idx - 2]?.id)?.ref?.focus();
			return;
		}

		if (e.key === 'ArrowRight' && selectionStart === inputValue.length && selectionEnd === inputValue.length) {
			e.preventDefault();
			inputRefs.current.find(item => item.id === value[idx + 2]?.id)?.ref?.focus();
		}
	};

	/* 點擊 input 框時自動 focus 最後一個 input，如果點擊的目標已是 input 則返回 */
	const handleInputClick = e => {
		if (e.target.className === 'formulaInput__container__input-wrapper__input') return;
		const lastInputId = findLastInputId(value);
		inputRefs.current.find(item => item.id === lastInputId)?.ref?.focus();
	};

	/* input 輸入變化時要更新 wrapper 的寬度 */
	const handleInputChange = (e, id) => {
		const idxInRefs = inputRefs.current.findIndex(item => item.id === id);
		const { value: inputValue } = e.target || {};
		const width = getInputWidth(inputValue);
		const input = inputRefs.current[idxInRefs]?.ref;
		if (input.parentNode) input.parentNode.style.width = `${width}px`;
		const formulaItem = value.find(item => item.id === id);
		formulaItem.content = inputValue;
	};

	const handleRemoveOption = id => {
		const idx = value.findIndex(item => item.id === id);
		inputRefs.current = [];
		onRemoveOption(idx);
	};

	const handlePushInputRef = (id, inputRef) => {
		if (!inputRef) return;
		if (inputRefs.current.some(item => item.id === id)) return;
		inputRefs.current.push({ id, ref: inputRef });
	};

	/* 合併 input  */
	const mergeInputRefs = (sourceId, targetId) => {
		const sourceIdx = inputRefs.current.findIndex(item => item.id === sourceId);
		const targetIdx = inputRefs.current.findIndex(item => item.id === targetId);
		if (sourceIdx === -1 || targetIdx === -1) return;
		const source = inputRefs.current[sourceIdx];
		const target = inputRefs.current[targetIdx];
		const mergedContent = `${target.ref.value}${source.ref.value}`;
		target.ref.value = mergedContent;
		target.ref.parentNode.style.width = `${getInputWidth(mergedContent)}px`;
		target.ref.focus();
		inputRefs.current.splice(sourceIdx, 1);
		const formulaItem = value.find(item => item.id === targetId);
		formulaItem.content = mergedContent;
	};

	useImperativeHandle(ref, () => ({
		mergeInputRefs,
	}));

	useEffect(() => {
		/* 移除已不存在的 input ref */
		const numberTypes = value.filter(item => item.type === FORMULA_ITEM_TYPE.NUMBER);
		inputRefs.current = inputRefs.current.filter(item => numberTypes.some(({ id }) => id === item.id));

		/* 保持 input foucs 狀態 */
		if (focusInputIdxRef.current !== -1) {
			const input = inputRefs.current.find(item => item.idx === focusInputIdxRef.current)?.ref;
			if (input) input.focus();
			focusInputIdxRef.current = -1;
		} else {
			inputRefs.current.at(-1)?.ref?.focus();
		}
	}, [value]);

	return (
		<div className="formulaInput">
			{/* input 框 */}
			<div className="formulaInput__container" onClick={handleInputClick}>
				{value?.map(({ id, type, content }, idx) => {
					/* 如果 type 是 number 就顯示 input 框 */
					if (type === FORMULA_ITEM_TYPE.NUMBER) {
						return (
							<div key={id} className="formulaInput__container__input-wrapper" style={{ width: getInputWidth(content) }}>
								<input
									defaultValue={content}
									onFocus={() => onFocus(idx)}
									onKeyDown={e => handleKeydown(e, idx)}
									onChange={e => handleInputChange(e, id)}
									ref={inputRef => handlePushInputRef(id, inputRef)}
									className="formulaInput__container__input-wrapper__input"
								/>
							</div>
						);
					}
					/* 其餘 type 就顯示 tag */
					return (
						<div key={id} className={classNames('formulaInput__container__input-tag', getClassByType(type))}>
							{content}
							{type === FORMULA_ITEM_TYPE.OPTION && <CloseCircleOutlined onClick={() => handleRemoveOption(id)} />}
						</div>
					);
				})}
			</div>
			{/* 清除按鈕 */}
			<div className="formulaInput__reset">
				<Button onClick={onReset}>{formatMessage({ id: 'common.clear' })}</Button>
			</div>
		</div>
	);
});

FormulaInput.defaultProps = {
	value: undefined,
	onFocus: () => undefined,
	onReset: () => undefined,
	onRemoveOption: () => undefined,
	onSelectOperator: () => undefined,
};

FormulaInput.propTypes = {
	value: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			type: PropTypes.string,
			content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		})
	),
	onFocus: PropTypes.func,
	onReset: PropTypes.func,
	onRemoveOption: PropTypes.func,
	onSelectOperator: PropTypes.func,
};

export default FormulaInput;
