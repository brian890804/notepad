import { useEffect, useState } from 'react';

export default list => {
	// 抽屜狀態
	const [collapseStatus, setCollapseStatus] = useState();
	// 塞入抽屜預設
	// 控制抽屜文字
	const handleCollapseChange = (key, change) => {
		if (change) {
			setCollapseStatus(pre => ({ ...pre, [key]: true }));
		} else {
			setCollapseStatus(pre => ({ ...pre, [key]: false }));
		}
	};
	useEffect(() => {
		if (list?.length) {
			setCollapseStatus(
				list?.reduce((acc, item) => {
					acc[item.scopeOverview.title] = false;
					return acc;
				}, {})
			);
		}
	}, [list?.length]);
	return { collapseStatus, handleCollapseChange };
};
