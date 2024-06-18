import { DSPNestedUtil } from '@delta/dsp-ui/lib/utils';

// 去除相同的值
const filterValue = (v, i, a) => a.findIndex(t => t.value === v.value) === i;

const arraysAreEqual = (array1, array2) => {
	try {
		return JSON.stringify(array1) === JSON.stringify(array2);
	} catch (_) {
		return false;
	}
};

/** 取消選擇項目 */
export const handleDeSelectValue = (node, preValue) => {
	// console.info('deselect node', node);
	const { type, id, parentNode } = node || {};
	const result = Array.isArray(preValue) ? preValue : [];

	switch (type) {
		/** 點擊"據點"時，直接據點移除 */
		case 'site':
			return result.filter(i => i?.value !== id); // 去除該點
		/** 點擊"公司"時，找到該據點並將該公司移除該據點 */
		case 'company': {
			const index = result?.findIndex(i => i?.value === parentNode?.id);
			if (index > -1) {
				result[index].companies = (Array.isArray(result[index].companies) ? result[index].companies : []).filter(
					i => i?.value !== id
				); // 去除該公司
				// 若此據點之公司數量歸零，移除該據點
				if (result[index].companies?.length === 0) return result?.filter((_, i) => index !== i);
			}
			return result;
		}
		/** 點擊"區域"時，將底下所有據點移除 */
		case 'region': {
			const siteIds = DSPNestedUtil()
				.flatTree(node, undefined, undefined)
				.filter(i => i?.type === 'site')
				.map(i => i?.id);
			return result.filter(i => !siteIds?.includes(i?.value));
		}
		default:
			return result;
	}
};

/** 選擇項目時 */
export const handleSelectValue = (node, preValue) => {
	// console.info('select node', node);
	const { title, type, id, parentNode, children } = node || {};
	let result = Array.isArray(preValue) ? [...preValue] : [];

	switch (type) {
		/** 點擊"據點"時，直接將據點加入 */
		case 'site': {
			result = result.filter(i => i?.value !== id); // 去除該點
			result.push({
				label: title,
				value: id,
				companies: children?.map(i => ({ label: i?.title, value: i?.id })),
			});
			return result;
		}
		/** 點擊"公司"時，找到該據點並將該公司加入該據點 */
		case 'company': {
			const index = result.findIndex(i => i?.value === parentNode?.id);
			if (index > -1) {
				result[index].companies = (Array.isArray(result[index].companies) ? result[index].companies : []).concat([
					{ label: title, value: id },
				]);
			} else {
				result.push({
					label: parentNode?.title,
					value: parentNode?.id,
					companies: [{ label: title, value: id }],
				});
			}
			return result;
		}
		/** 點擊"區域"時，將底下所有據點加入 */
		case 'region': {
			const sites = DSPNestedUtil()
				.flatTree(node, undefined, undefined, true)
				.filter(i => i?.type === 'site')
				.map(i => ({
					label: i?.title,
					value: i?.id,
					companies: i?.children?.map(company => ({ label: company?.title, value: company?.id })),
				}));

			// 預設的treeSelect在點擊未全選的父節點時，會將所有子節點加入，但在這棵樹中則是要比較後決定是否需要移除
			const currValue = sites.concat(result).filter(filterValue);
			const isSame = arraysAreEqual(currValue, result);
			if (isSame) {
				return handleDeSelectValue(node, preValue);
			}

			return currValue;
		}
		default:
			return result;
	}
};
