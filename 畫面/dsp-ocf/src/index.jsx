import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ConfigProvider } from '@delta/dsp-ui/lib/antd';
import { DSPConfigProvider } from '@delta/dsp-ui';
import dayjs from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

import IntlProvider from './app/intl/IntlProvider';
import antdTheme from './antdTheme';
import axiosMock from './app/mock/axiosMock';
import rootReducer from './app/rootReducer';
import App from './app/App';

import './index.scss';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const store = createStore(rootReducer, applyMiddleware(thunk));

const container = document.getElementById('app');
const root = createRoot(container);
const render = () => {
	axiosMock();
	return root.render(
		<DSPConfigProvider theme={antdTheme()} configProvider={ConfigProvider}>
			<Provider store={store}>
				<IntlProvider>
					<App />
				</IntlProvider>
			</Provider>
		</DSPConfigProvider>
	);
};

render();
