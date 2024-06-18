import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Tag, Tooltip } from '@delta/dsp-ui/lib/antd';
import { DSPGetProgressColor } from '@delta/dsp-ui/lib/utils';

import './siteTag.scss';

// 將固定文字轉成固定數字 (Demo使用)
const hashCode = s => {
	if (!s) return 0;
	let h = 0;
	for (let i = 0; i < s.length; i += 1) {
		h = Math.imul(31, h) + s.charCodeAt(i) || 0;
	}
	return h;
};
const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'green', 'cyan', 'blue', 'geekblue', 'purple'];

const SiteTag = props => {
	const { className, closable, closeIcon, icon, randomColor, title, children, companies, progress, onClose } = props;

	const tooltipTitle =
		companies?.length > 0 ? (
			<span className="siteTag__companies">
				{companies?.map((item, i) => (
					<span key={item?.value} className="siteTag__companies__item">
						{`${i + 1}. ${item?.label}`}
					</span>
				))}
			</span>
		) : null;

	const color = useMemo(() => {
		if (randomColor) return colors[hashCode(title) % 10];
		if (progress !== undefined) return DSPGetProgressColor(progress);
		return props.color;
		// eslint-disable-next-line react/destructuring-assignment
	}, [randomColor, progress, props.color]);

	return (
		<Tooltip title={tooltipTitle} placement="right" className="siteTag">
			<Tag {...{ className, title, closeIcon, color, icon, closable, onClose }}>{children}</Tag>
		</Tooltip>
	);
};

SiteTag.defaultProps = {
	className: undefined,
	closable: undefined,
	closeIcon: undefined,
	icon: undefined,
	randomColor: undefined,
	color: undefined,
	title: undefined,
	children: undefined,
	companies: undefined,
	progress: undefined,
	onClose: () => undefined,
};

SiteTag.propTypes = {
	/** tag CSS Name */
	className: PropTypes.string,
	/** tag 是否可以按叉叉 */
	closable: PropTypes.bool,
	/** tag 關閉按鈕 */
	closeIcon: PropTypes.bool,
	/** tag icon */
	icon: PropTypes.node,
	/** 是否隨機使用 tag 顏色 */
	randomColor: PropTypes.bool,
	/** tag 顏色 */
	color: PropTypes.string,
	/** tag 標題 */
	title: PropTypes.string,
	/** tag 顯示內容 */
	children: PropTypes.node,
	/** 公司列表 */
	companies: PropTypes.arrayOf(
		PropTypes.shape({ label: PropTypes.string, value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) })
	),
	/** 盤查進度 */
	progress: PropTypes.number,
	/** 被按叉叉的 callback */
	onClose: PropTypes.func,
};

export default SiteTag;
