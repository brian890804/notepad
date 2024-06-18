import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Segmented } from '@delta/dsp-ui/lib/antd';
import { DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';

const YearComparisonTabs = ({ headerItems }) => {
	const {
		search: { type },
		navigateReplace,
	} = DSPUseNavAppendSearch();

	const handleTabClick = value => {
		navigateReplace({ type: value });
	};
	useEffect(() => {
		if (!type) {
			navigateReplace({ type: headerItems[0]?.key });
		}
	}, []);

	return (
		<section>
			<section className="yearComparison__tabs">
				<Segmented options={headerItems} value={type} block onChange={handleTabClick} />
			</section>
			{headerItems?.map(item => {
				const { key, render } = item;
				if (type === key) return <div key={key}>{render}</div>;
				return <div key={key} />;
			})}
		</section>
	);
};

YearComparisonTabs.defaultProps = {
	headerItems: () => undefined,
};

YearComparisonTabs.propTypes = {
	/** CSS 樣式 */
	headerItems: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			value: PropTypes.string,
			label: PropTypes.string,
			render: PropTypes.node,
		})
	),
};

export default YearComparisonTabs;
