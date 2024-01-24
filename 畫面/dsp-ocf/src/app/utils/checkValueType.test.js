import checkValueType, { TARGET_TYPE } from './checkValueType';

describe('checkValueType', () => {
  test('should return true for matching value types', () => {
    expect(checkValueType(null, TARGET_TYPE.NULL)).toBe(true);
    expect(checkValueType(123, TARGET_TYPE.NUMBER)).toBe(true);
    expect(checkValueType('hello', TARGET_TYPE.STRING)).toBe(true);
    expect(checkValueType([], TARGET_TYPE.ARRAY)).toBe(true);
    expect(checkValueType(undefined, TARGET_TYPE.UNDEFINED)).toBe(true);
    expect(checkValueType(true, TARGET_TYPE.BOOLEAN)).toBe(true);
    expect(checkValueType({}, TARGET_TYPE.OBJECT)).toBe(true);
  });

  test('should return false for non-matching value types', () => {
    expect(checkValueType(null, TARGET_TYPE.NUMBER)).toBe(false);
    expect(checkValueType(123, TARGET_TYPE.STRING)).toBe(false);
    expect(checkValueType('hello', TARGET_TYPE.ARRAY)).toBe(false);
    expect(checkValueType([], TARGET_TYPE.UNDEFINED)).toBe(false);
    expect(checkValueType(undefined, TARGET_TYPE.BOOLEAN)).toBe(false);
    expect(checkValueType(true, TARGET_TYPE.OBJECT)).toBe(false);
    expect(checkValueType({}, TARGET_TYPE.NULL)).toBe(false);
  });
});