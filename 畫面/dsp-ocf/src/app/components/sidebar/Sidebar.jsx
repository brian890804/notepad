import React, { useState, useMemo } from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Menu } from '@delta/dsp-ui/lib/antd';
import { LeftOutlined, RightOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { useNavigate } from 'react-router-dom';
import { DSPNestedUtil } from '@delta/dsp-ui/lib/utils';
import { homeRoutes, useGetPathNodes } from '../../pages/HomeRoutes';
// import TaoyuanImg from '../../../assets/images/img_taoyuan.png';

import './sidebar.scss';

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState();
	const navigate = useNavigate();

	const pathNodes = useGetPathNodes();
	const items = useMemo(() => DSPNestedUtil().filterNode(homeRoutes(), ({ label }) => !!label), [homeRoutes]);

	const version = `v. ${import.meta.env.VITE_APP_VERSION}`;

	return (
		<div className={classNames('sidebar', { 'sidebar--collapsed': collapsed })}>
			<Menu
				className="sidebar__menu"
				mode="inline"
				inlineCollapsed={collapsed}
				items={items}
				defaultOpenKeys={pathNodes?.map(({ key }) => key)}
				selectedKeys={pathNodes?.map(({ key }) => key)}
				onSelect={({ keyPath }) => {
					navigate(
						keyPath
							?.reverse()
							?.map(path => path?.replace(/\/:.*\?/, '')) // 濾除參數 path
							?.join('/')
					);
				}}
			/>
			<div className="sidebar__footer">
				{/* 原本有圖片 */}
				<div className="sidebar__footer__info">
					<div className="sidebar__footer__info__version" title={version}>
						{`Version: ${version}`}
					</div>
					<Button size="small" type="text" onClick={() => setCollapsed(!collapsed)}>
						{collapsed ? <RightOutlined /> : <LeftOutlined />}
					</Button>
				</div>
			</div>
		</div>
	);
};

Sidebar.propTypes = {};

export default Sidebar;
