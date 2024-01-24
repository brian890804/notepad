import randomNumber from './randomNumber';

export default (contents = []) => {
	if (Array.isArray(contents)) return contents[randomNumber(0, contents?.length)];
	return undefined;
};
