import React, { useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import ExpandDropdown from './expandDropdown/ExpandDropdown';
import SiteTag from '../../siteTag/SiteTag';

import './tagItem.scss';

const TagItem = ({ tags, label, value, closable, onChange }) => {
	const { formatMessage } = useIntl();
	const [isEdit, setIsEdit] = useState();

	const companies = useMemo(() => tags?.find(i => i?.value === value)?.companies, [JSON.stringify(tags), value]);

	const handleExpand = useCallback(
		result => {
			// console.info('result', result);
			// console.info('tags', tags);
			const diff = JSON.stringify(result?.map(i => i?.value)) !== JSON.stringify(companies?.map(i => i?.value));
			setIsEdit(isEdit || diff); // 只要有編輯過，就是已編輯

			// 若底下為空，則移除
			if (result?.length === 0 || !result) onChange(tags?.filter(tag => tag?.value !== value));
			// 找到相對位置並修改其底下公司
			else if (diff) {
				onChange(
					tags?.map(tag => {
						if (tag?.value === value) return { ...tag, companies: result };
						return tag;
					})
				);
			}
		},
		[companies, onChange]
	);

	return (
		<SiteTag
			closeIcon
			className="siteCompany-tagItem"
			color={isEdit ? 'gold' : 'blue'}
			icon={closable && <ExpandDropdown siteId={value} value={companies} onChange={handleExpand} />}
			onClose={() => onChange(tags?.filter(i => i?.value !== value))}
			{...{ closable }}
		>
			{`${label} ${companies?.length > 0 ? `(${formatMessage({ id: 'common.chosen' }, { count: companies?.length })})` : ''} ${
				isEdit ? `(${formatMessage({ id: 'common.edited' })})` : ''
			}`}
		</SiteTag>
	);
};

TagItem.defaultProps = {
	tags: undefined,
	label: undefined,
	value: undefined,
	closable: undefined,
	onChange: () => undefined,
};

TagItem.propTypes = {
	/** 目前所有的 tag */
	tags: PropTypes.arrayOf(PropTypes.any),
	/** 當前 Tag 的文字 */
	label: PropTypes.string,
	/** 當前 Tag 的值 */
	value: PropTypes.number,
	/** 是否可以被刪除 */
	closable: PropTypes.bool,
	/** 變動 tag callback */
	onChange: PropTypes.func,
};

export default TagItem;
