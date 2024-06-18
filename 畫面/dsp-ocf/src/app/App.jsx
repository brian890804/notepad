import React, { lazy, useMemo } from 'react';
import { Navigate, RouterProvider as ReactRouterProvider, createBrowserRouter } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { DSPLoading, DSPSuspenseOutlet, DSPLoginHeader, DSPNotFoundPage, DSPNotReadyPage } from '@delta/dsp-ui';
import { DSPNestedUtil } from '@delta/dsp-ui/lib/utils';
import queryString from 'query-string';
import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './appReducer';
import services from '../config/services';
import { homeRoutes } from './pages/HomeRoutes';
import I18nTable from './pages/settings/i18nTable/I18nTable';

import './app.scss';

const LoginPage = lazy(() => import('./pagesPublic/login/LoginPage'));
const Test = lazy(() => import('./pagesPublic/test/test/Test'));
const Home = lazy(() => import('./pages/Home'));
const routeList = () => {
	const routes = DSPNestedUtil().modifyNode(homeRoutes(), {
		path: ({ key }) => key,
		element: i => i?.element || <DSPNotReadyPage />, // 尚未開發完成的頁面顯示未開發頁面
	});
	// 加上 route 沒有 match 導向第一頁 以及 無此頁眠時顯示404畫面
	return routes.concat([
		{ path: '', element: <Navigate to={routes?.[0]?.path} /> },
		{ path: '*', element: <DSPNotFoundPage /> },
	]);
};
const App = () => {
	const { locale, formatMessage } = useIntl();
	const dispatch = useDispatch();
	const { pathname, search = '' } = window?.location || {};
	const { redirect } = queryString.parse(search);
	const { user, formEditing } = useSelector(state => state?.app);
	const homeRouteList = useMemo(() => routeList(), []);

	const basename = `${services.getContextRoot}${locale}`;

	return (
		<ReactRouterProvider
			router={createBrowserRouter(
				[
					{
						path: '',
						element: (
							<div className="app">
								<DSPLoginHeader
									{...{ user }}
									domain={import.meta.env.VITE_APP_DOMAIN}
									contextRoot={import.meta.env.VITE_APP_CONTEXT_ROOT}
									frontendVersion={import.meta.env.VITE_APP_VERSION}
									webName={formatMessage({ id: 'header.title' })}
									loginRefresh={!(formEditing || /test/i.test(pathname))} // 表單編輯中 或 測試頁 不進行刷新
									onLogin={userInfo => dispatch({ type: LOGIN_SUCCESS, payload: userInfo })}
									onLogout={() => dispatch({ type: LOGOUT_SUCCESS })}
									onError={() => dispatch({ type: LOGIN_FAILED })}
								/>
								{user === undefined ? <DSPLoading /> : <DSPSuspenseOutlet className="app__body" />}
							</div>
						),
						children: [
							{
								path: 'login',
								element: user ? <Navigate to={redirect || '/home'} /> : <LoginPage />,
							},
							{
								path: 'home',
								element: user ? (
									<Home />
								) : (
									<Navigate
										to={`/login?${queryString.stringify({
											redirect: pathname?.replace(basename, '') + search,
										})}`}
									/>
								),
								children: homeRouteList,
							},
							{ path: 'test', element: <Test /> },
							{ path: 'locales', element: <I18nTable style={{ padding: '0 24px' }} /> },
							{ path: '', element: <Navigate to="/home" /> },
							{ path: '404', element: <DSPNotFoundPage backHome /> },
							{ path: '*', element: <DSPNotFoundPage /> },
						],
					},
				],
				{ basename }
			)}
		/>
	);
};

App.propTypes = {};

export default App;
