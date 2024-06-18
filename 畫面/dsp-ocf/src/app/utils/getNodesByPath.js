// 透過路徑取得路徑節點
const getNodesByPath = (tree, path, key = 'key') => {
	if (tree?.[key] === path[0]) {
		if (path.length === 1) {
			return [tree];
		}
		const remainingPath = path.slice(1);
		let objects = [tree];
		// eslint-disable-next-line no-restricted-syntax
		for (const child of tree.children || []) {
			objects = objects.concat(getNodesByPath(child, remainingPath));
		}
		return objects;
	}
	return [];
};

export default getNodesByPath;
