import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button, Input, Spin } from '@delta/dsp-ui/lib/antd';
import { SearchOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { DSPNestedUtil } from '@delta/dsp-ui/lib/utils';

const DropdownRender = ({ treeData, loading, originNode, searchValue, setSearchValue, onChange }) => {
	const { formatMessage } = useIntl();

	/** 選取所有 */
	const handleSelectAll = useCallback(() => {
		/** 篩選出命中的 tree */
		const filterTree = DSPNestedUtil().filterNode(treeData, i => i?.title?.toLowerCase().includes(searchValue?.toLowerCase()), true);
		/** 取出所有據點 */
		const sites = DSPNestedUtil()
			.flatTree(filterTree, undefined, undefined, true)
			.filter(i => i?.type === 'site');
		onChange(sites);
	}, [treeData, searchValue, onChange]);

	return (
		<Spin spinning={loading}>
			<div className="regionSiteCompanyTreeSelect__treeSelect__pop__search" onClick={e => e.stopPropagation()}>
				{/* 搜尋 input */}
				<Input allowClear prefix={<SearchOutlined />} onChange={e => setSearchValue(e.target.value)} value={searchValue} />
				{/* 全選 */}
				{searchValue?.length > 0 && (
					<Button size="small" onClick={handleSelectAll}>
						{formatMessage({ id: 'common.select.all' })}
					</Button>
				)}
				{/* 清除 */}
				<Button size="small" onClick={() => onChange([])}>
					{formatMessage({ id: 'common.clear' })}
				</Button>
			</div>
			{originNode}
		</Spin>
	);
};

DropdownRender.defaultProps = {
	treeData: undefined,
	loading: undefined,
	originNode: undefined,
	searchValue: undefined,
	setSearchValue: () => undefined,
	onChange: () => undefined,
};

DropdownRender.propTypes = {
	/** 樹狀資料 */
	treeData: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			title: PropTypes.string,
			type: PropTypes.string,
		})
	),
	/** 是否載入中 */
	loading: PropTypes.bool,
	/** 下拉選單原始節點 */
	originNode: PropTypes.node,
	/** 搜尋的值 */
	searchValue: PropTypes.string,
	/** 設定搜尋的值 */
	setSearchValue: PropTypes.func,
	/** 點擊 "全選" 或 "清除" 的 callback */
	onChange: PropTypes.func,
};

export default DropdownRender;
