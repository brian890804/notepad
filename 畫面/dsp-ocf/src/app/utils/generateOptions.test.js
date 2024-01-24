import generateOptions from './generateOptions';

describe('generateOptions', () => {
	test('should return an array of objects with label and value properties', () => {
		const options = ['Option 1', 'Option 2', 'Option 3'];
		const expectedOutput = [
			{ label: 'Option 1', value: 'Option 1' },
			{ label: 'Option 2', value: 'Option 2' },
			{ label: 'Option 3', value: 'Option 3' },
		];
		const result = generateOptions(options);
		expect(result).toEqual(expectedOutput);
	});

	test('should return an empty array if options is undefined', () => {
		const options = undefined;
		const expectedOutput = [];
		const result = generateOptions(options);
		expect(result).toEqual(expectedOutput);
	});

	test('should return an empty array if options is an empty array', () => {
		const options = [];
		const expectedOutput = [];
		const result = generateOptions(options);
		expect(result).toEqual(expectedOutput);
	});
});
