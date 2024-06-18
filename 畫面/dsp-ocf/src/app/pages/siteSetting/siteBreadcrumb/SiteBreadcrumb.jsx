import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Button, Dropdown, Space, Tour } from '@delta/dsp-ui/lib/antd';
import { CaretDownOutlined, InfoCircleOutlined, LoadingOutlined, RightOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { DSPIcon } from '@delta/dsp-ui';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import storageKey from '../../../../config/storageKey';

import './siteBreadcrumb.scss';

const SiteBreadcrumb = ({ loading, tabItems, siteList }) => {
	const { formatMessage } = useIntl();

	const {
		params: { siteId },
		search: { tab, name },
		nav,
	} = DSPUseNavAppendSearch();

	/** 分頁的 麵包屑 item */
	const focusTabTitle = useMemo(() => {
		const label = tabItems?.find(({ key }) => key === tab)?.label;
		if (!label) return null;
		return (
			<div
				className={classNames({ 'siteBreadcrumb__body__item--clickable': !!name })}
				title={label}
				onClick={() => nav({ search: tab ? `?tab=${tab}` : '' })}
			>
				{label}
			</div>
		);
	}, [tab, name, tabItems]);

	// 導覽是否開啟
	const [tourOpen, setTourOpen] = useState(!localStorage.getItem(storageKey.tourSiteSetting));

	// 麵包屑 項目
	const breadcrumbItems = useMemo(
		() =>
			[
				{
					title: (
						<Dropdown
							className="siteBreadcrumb__body__dropdown"
							disabled={loading || !siteList}
							menu={{
								items: siteList?.map(({ label, value }) => ({
									key: value,
									label,
									onClick: () => {
										localStorage.setItem(storageKey.siteId, value); // 記錄起來
										nav({ pathname: `/home/site/siteSetting/${value}`, search: tab ? `?tab=${tab}` : undefined });
									},
								})),
							}}
						>
							<Space>
								<DSPIcon.Group />
								{loading ? (
									<LoadingOutlined />
								) : (
									siteList?.find(({ value }) => parseInt(siteId, 10) === value)?.label ||
									formatMessage({ id: 'common.placeholder' }, { text: formatMessage({ id: 'site.list.schema.region' }) })
								)}
								<CaretDownOutlined style={{ fontSize: 12 }} />
							</Space>
						</Dropdown>
					),
				},
				focusTabTitle && { title: focusTabTitle },
				name && { title: name },
			].filter(i => i),
		[loading, siteList, focusTabTitle, name, siteId]
	);

	return (
		<div className="siteBreadcrumb">
			<Breadcrumb className="siteBreadcrumb__body" separator={<RightOutlined />} items={breadcrumbItems} />

			{breadcrumbItems?.length < 3 && (
				<Button className="siteBreadcrumb__tour" icon={<InfoCircleOutlined />} type="text" onClick={() => setTourOpen(true)}>
					{/* 再導覽一次 */}
					{formatMessage({ id: 'common.tour.again' })}
				</Button>
			)}

			{/* 導覽 - 據點設定 */}
			<Tour
				open={!!tourOpen}
				onClose={() => {
					localStorage.setItem(storageKey.tourSiteSetting, true);
					setTourOpen(false);
				}}
				placement="bottomLeft"
				steps={tabItems?.map(i => i?.tourStep)}
				indicatorsRender={(current, total) => <span>{`${current + 1} / ${total}`}</span>}
			/>
		</div>
	);
};

SiteBreadcrumb.defaultProps = {
	loading: undefined,
	siteList: undefined,
	tabItems: undefined,
};

SiteBreadcrumb.propTypes = {
	/** 載入中 */
	loading: PropTypes.bool,
	/** 據點清單 */
	siteList: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.number })),
	/** 分頁清單 */
	tabItems: PropTypes.arrayOf(PropTypes.any),
};

export default SiteBreadcrumb;
