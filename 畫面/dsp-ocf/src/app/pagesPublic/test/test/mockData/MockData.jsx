import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Spin, Tabs } from '@delta/dsp-ui/lib/antd';
import ReactJson from 'react-json-view';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { DSPHandleAxiosError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import services from '../../../../../config/services';

import './mockData.scss';

const mockData = [
	// { key: 'ghg types', url: services.ghgList },
	{ key: '據點設定-總覽', url: services.siteOverview },
	// { key: '單位換算比例(L)', url: `${services.unitRates}?resourceUnit=2` },
	// { key: '單位換算比例(KG)', url: `${services.unitRates}?resourceUnit=1` },
	// { key: '單位換算比例(KWH)', url: `${services.unitRates}?resourceUnit=3` },
];

const MockData = () => {
	const { search } = useLocation();
	const { activeKey = mockData?.[0]?.key } = queryString.parse(search);
	const { navigateReplace } = DSPUseNavAppendSearch();
	const { axiosApi, loading, data } = DSPUseAxios().useGet();

	useEffect(() => {
		axiosApi({ url: mockData?.find(({ key }) => key === activeKey)?.url, mapper: resp => resp?.data }).catch(error => {
			DSPHandleAxiosError({ error });
		});
	}, [activeKey]);

	return (
		<div className="mockData">
			<Tabs
				className="mockData__tabs"
				tabPosition="left"
				activeKey={activeKey}
				items={mockData.map(({ key, url }) => ({
					label: key,
					key,
					children: (
						<Spin spinning={loading}>
							<div className="mockData__tabs__url">URL: {url}</div>
							<ReactJson src={data} displayDataTypes={false} />
						</Spin>
					),
				}))}
				onChange={key => navigateReplace({ activeKey: key })}
			/>
		</div>
	);
};

MockData.propTypes = {};

export default MockData;
