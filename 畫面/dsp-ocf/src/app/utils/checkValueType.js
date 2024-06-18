/**
 * 深度檢測數值之類型，可以判斷所有的數值類型，包含 Null | Object
 *
 * @param {object} value   欲檢測型別之數值
 * @param {string} target  目標型別之字串
 * @returns {boolean}
 */
const checkValueType = (value, target) => Object.prototype.toString.call(value) === target;

export const TARGET_TYPE = {
	NULL: '[object Null]',
	NUMBER: '[object Number]',
	STRING: '[object String]',
	ARRAY: '[object Array]',
	UNDEFINED: '[object Undefined]',
	BOOLEAN: '[object Boolean]',
	OBJECT: '[object Object]',
};

export default checkValueType;
