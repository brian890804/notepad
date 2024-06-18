import React, { useMemo } from 'react';
import { DSPSuspenseOutlet, DSPBreadCrumb } from '@delta/dsp-ui';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import { useGetPathNodes } from './HomeRoutes';

import './home.scss';

const Home = () => {
	const pathNodes = useGetPathNodes();
	const { pathname } = useLocation();

	const items = useMemo(() => pathNodes?.map(({ label }) => ({ title: label }))?.filter(i => i?.title), [pathNodes]);

	return (
		<div className={classNames('home', { 'home--welcome': pathname?.includes('welcome') })}>
			<Sidebar className="home__sidebar" />
			<div className="home__body">
				{items?.length > 0 && <DSPBreadCrumb items={items} />}
				<DSPSuspenseOutlet />
			</div>
		</div>
	);
};

Home.propTypes = {};

export default Home;
