export default (minium, maximum) => {
	const min = Math.ceil(minium);
	const max = Math.floor(maximum);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the
};
