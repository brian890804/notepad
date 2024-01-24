import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Tree } from '@delta/dsp-ui/lib/antd';
import { CaretDownOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { DSPNestedUtil } from '@delta/dsp-ui/lib/utils';
import './treeTable.scss';

const treeData = [
	{
		title: 'parent 1',
		key: '0-0',
		children: [
			{
				title: 'parent 1-0',
				key: '0-0-0',
				children: [
					{
						title: 'leaf',
						key: '0-0-0-0',
					},
					{
						title: 'parent 1-0-1',
						key: '0-0-0-1',
						children: [
							{
								title: 'leaf',
								key: '0-0-0-1-0',
							},
						],
					},
					{
						title: 'leaf',
						key: '0-0-0-2',
					},
				],
			},
			{
				title: 'parent 1-1',
				key: '0-0-1',
				children: [
					{
						title: 'leaf',
						key: '0-0-1-0',
					},
				],
			},
			{
				title: 'parent 1-2',
				key: '0-0-2',
				children: [
					{
						title: 'leaf',
						key: '0-0-2-0',
					},
					{
						title: 'leaf',
						key: '0-0-2-1',
					},
				],
			},
		],
	},
];

const ATUH_OPTIONS_KEY = {
	TOTAL: 'total',
	READ: 'read',
	GROUP: 'group',
	LAYER: 'layer',
	EQUIPMENT: 'equipment',
};

const AUTH_OPTIONS = {
	[ATUH_OPTIONS_KEY.TOTAL]: '完全控制',
	[ATUH_OPTIONS_KEY.READ]: '讀取(僅適用前台)',
	[ATUH_OPTIONS_KEY.GROUP]: '分類/群組管理',
	[ATUH_OPTIONS_KEY.LAYER]: '圖層/網頁列表管理',
	[ATUH_OPTIONS_KEY.EQUIPMENT]: '裝置管理',
};

const filterDiff = (origin, target) => {
	const diffSet = new Set(target);
	return origin.filter(item => !diffSet.has(item));
};

const flatTableByExpandKeys = (tree, parent, expand) =>
	tree
		.reduce((prev, { title, key, children }) => {
			let ary = [...prev];
			if (children?.length > 0 && (expand === 'all' || expand?.includes(key))) {
				ary = [...ary, ...flatTableByExpandKeys(children, key, expand)];
			}
			ary.push({ title, key, parent });
			return ary;
		}, [])
		.sort((nodeA, nodeB) => nodeA.key.localeCompare(nodeB.key));

/**
 *
 * TreeTable，主要分兩區塊，左方是 Tree 右方為跟著 Tree 分支關聯排列的 Table，
 * 如果 Tree 的分支關閉，Table 與分支關聯的行也會跟著移除。
 *
 * 注意: 目前僅為測試版，尚有多數的問題未解決
 *
 * 1. Tree 與 Table x 軸 overflow
 * 2. Table 未能自動適應 Tree 的分支高度(如果 Tree 的寬度被壓縮)
 * 3. 資料輸入與輸出格式尚未確定
 *
 */
const TreeTable = () => {
	const [checkboxTable, setCheckboxTable] = useState(() => flatTableByExpandKeys(treeData, undefined, 'all'));
	const [checkedList, setCheckedList] = useState(() => {
		const optionsKeys = Object.keys(AUTH_OPTIONS).map(authType => [authType, []]);
		return Object.fromEntries(optionsKeys);
	});
	const { findNode, getAllKeys } = DSPNestedUtil();

	const handleTreeExpand = expandedKeys => {
		setCheckboxTable(flatTableByExpandKeys(treeData, undefined, expandedKeys));
	};

	const handleCheckboxChange = (nodeKey, authType, checked) => {
		const branchKeyPath = getAllKeys(findNode(treeData, nodeKey, 'key'));
		if (checked) {
			setCheckedList(state => ({ ...state, [authType]: [...state[authType], ...branchKeyPath] }));
		} else {
			setCheckedList(state => ({ ...state, [authType]: filterDiff(checkedList[authType], branchKeyPath) }));
		}
	};

	return (
		<div className="treeTable">
			<table className="treeTable__table" cellSpacing="0" cellPadding="0">
				<thead>
					<tr>
						<th> </th>
						{Object.keys(AUTH_OPTIONS).map(key => (
							<th key={key}>{AUTH_OPTIONS[key]}</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						<td rowSpan={checkboxTable.length + 1} className="treeTable__table__tree">
							<Tree
								showLine
								defaultExpandAll
								treeData={treeData}
								onExpand={handleTreeExpand}
								switcherIcon={<CaretDownOutlined />}
							/>
						</td>
					</tr>
					{checkboxTable.map(({ key }) => (
						<tr key={key}>
							{Object.keys(AUTH_OPTIONS).map(authType => (
								<td key={`${key}_${authType}`}>
									<input
										type="checkbox"
										checked={checkedList[authType].includes(key)}
										onChange={e => handleCheckboxChange(key, authType, e.target.checked)}
									/>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

// TreeTable.propTypes = {};

export default TreeTable;
