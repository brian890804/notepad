import { nanoid } from 'nanoid';

export const FORMULA_ITEM_TYPE = {
	OPERATOR: 'operator',
	OPTION: 'option',
	NUMBER: 'number',
};

export const OPERATORS = ['+', '-', '*', '(', ')'];

export const createFomulaItem = (type, content) => ({ id: nanoid(), type, content });

export const insertFormulaItemsId = formulaItems => formulaItems.map(item => ({ ...item, id: nanoid() }));

export const getInputWidth = value => {
	const span = document.createElement('span');
	span.style.fontSize = '14px';
	span.style.visibility = 'hidden';
	span.style.position = 'absolute';
	span.style.top = '-9999px';
	span.style.left = '-9999px';
	span.textContent = value;
	document.body.appendChild(span);
	const { width } = span.getBoundingClientRect();
	document.body.removeChild(span);
	return Math.round(width) || 4;
};

export const getClassByType = type =>
	type === FORMULA_ITEM_TYPE.OPTION ? 'formulaInput__container__input-tag--option' : 'formulaInput__container__input-tag--operator';

export const findLastInputId = formulaItems => {
	// eslint-disable-next-line no-plusplus
	for (let i = formulaItems.length - 1; i >= 0; i--) {
		if (formulaItems[i].type === FORMULA_ITEM_TYPE.NUMBER) return formulaItems[i].id;
	}
	return -1;
};

export const convertFormulaItemsToFormula = formulaItems =>
	new Promise((resolve, reject) => {
		const formula = [];
		const filteredFormulaItems = formulaItems.filter(item => !(item.type === FORMULA_ITEM_TYPE.NUMBER && !item.content));
		if (filteredFormulaItems?.length === 0) reject(new Error('empty'));
		for (let i = 0; i < filteredFormulaItems.length; i += 1) {
			const { type, content } = filteredFormulaItems[i];
			if (type === filteredFormulaItems[i - 1]?.type && type === FORMULA_ITEM_TYPE.OPTION) {
				reject(new Error('duplicate'));
			} else if (type === FORMULA_ITEM_TYPE.OPTION && filteredFormulaItems[i - 1]?.type === FORMULA_ITEM_TYPE.NUMBER) {
				reject(new Error('without operator'));
			} else if (type === FORMULA_ITEM_TYPE.NUMBER && filteredFormulaItems[i - 1]?.type === FORMULA_ITEM_TYPE.OPTION) {
				reject(new Error('without operator'));
			} else if (type === FORMULA_ITEM_TYPE.NUMBER) {
				let temp = content;
				if (temp.startsWith('.') || temp.endsWith('.')) reject(new Error('invalid number'));
				if (temp.endsWith('%')) temp = temp.replace('%', '*0.01');
				formula.push(temp);
			} else if (type === FORMULA_ITEM_TYPE.OPTION) {
				formula.push(1);
			} else {
				formula.push(content);
			}
		}
		const formulaStr = formula.join('');
		if (!formulaStr.trim().length) reject(new Error('empty'));

		const forbiddenOperator = /\*\*|\/\//;
		if (forbiddenOperator.test(formulaStr)) reject(new Error('duplicate'));

		resolve(formulaStr);
	});

export const convertFormulaToStr = formulaItems =>
	formulaItems
		.filter(item => !(item.type === FORMULA_ITEM_TYPE.NUMBER && !item.content))
		.map(({ content }) => content)
		.join('');
