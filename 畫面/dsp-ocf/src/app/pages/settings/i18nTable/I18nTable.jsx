import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Table } from '@delta/dsp-ui/lib/antd';
import { useIntl } from 'react-intl';
import { DSPExportFile } from '@delta/dsp-ui/lib/utils';
import { DownloadOutlined } from '@delta/dsp-ui/lib/antd/icons';
import getColumnSearchProps from './getColumnSearchProps';
import zhtw from '../../../../assets/locales/zh-tw.json';
import zhcn from '../../../../assets/locales/zh-cn.json';
import enus from '../../../../assets/locales/en-us.json';

import './i18nTable.scss';

const I18nTable = ({ style }) => {
	const { formatMessage } = useIntl();
	const [searchValue, setSearchValue] = useState();

	const columns = [
		{ title: 'key', dataIndex: 'key', key: 'key', fixed: 'left', width: 250 },
		{ title: 'en-us', dataIndex: 'en-us', key: 'en-us', width: '33%' },
		{ title: 'zh-tw', dataIndex: 'zh-tw', key: 'zh-tw', width: '33%' },
		{ title: 'zh-cn', dataIndex: 'zh-cn', key: 'zh-cn', width: '33%' },
	].map(i => ({ ...i, ...getColumnSearchProps()(i?.key, searchValue) }));

	const oriData = useMemo(() => {
		let result = {};
		// 英文
		result = Object.keys(enus).reduce((pre, cur) => {
			// 前後加上""，是為了避免匯出csv時，逗號跳脫問題
			const data = `"${enus[cur]?.replace('{ action }', 'Create/Edit/Delete')?.replace('{ total }', 1)?.replaceAll('"', '＂')}"`;
			return /\{.*\}/.test(data) ? pre : { ...pre, [cur]: { ...pre[cur], 'en-us': data } }; // 過濾掉有變數的 i18n
		}, result);
		// 繁體中文
		result = Object.keys(zhtw).reduce((pre, cur) => {
			const data = zhtw[cur]?.replace('{ action }', '新增/編輯/刪除')?.replace('{ total }', 1);
			return /\{.*\}/.test(data) ? pre : { ...pre, [cur]: { ...pre[cur], 'zh-tw': data } }; // 過濾掉有變數的 i18n
		}, result);
		// 简体中文
		result = Object.keys(zhcn).reduce((pre, cur) => {
			const data = zhcn[cur]?.replace('{ action }', '新增/编辑/删除')?.replace('{ total }', 1);
			return /\{.*\}/.test(data) ? pre : { ...pre, [cur]: { ...pre[cur], 'zh-cn': data } }; // 過濾掉有變數的 i18n
		}, result);
		return Object.keys(result)?.map(key => ({ key, ...result[key] }));
	}, []);

	const dataSource = useMemo(
		() => oriData?.filter(item => (searchValue ? JSON.stringify(item)?.includes(searchValue) : true)),
		[oriData, searchValue]
	);

	return (
		<div className="i18nTable" style={style}>
			<div className="i18nTable__toolbar">
				<Button
					type="primary"
					icon={<DownloadOutlined />}
					onClick={() => DSPExportFile({ data: dataSource, ext: 'csv', name: 'DSP Locales' })}
				>
					Download Locales
				</Button>
				<Input.Search
					className="i18nTable__toolbar__search"
					placeholder={formatMessage({ id: 'common.search' })}
					onSearch={setSearchValue}
					onChange={e => {
						if (!e.target.value) setSearchValue();
					}}
				/>
			</div>

			<Table
				className="i18nTable__table"
				size="small"
				columns={columns}
				dataSource={dataSource}
				pagination={{ defaultPageSize: 30 }}
				scroll={{ x: 1, y: 'calc(100vh - 275px)' }}
			/>
		</div>
	);
};

I18nTable.defaultProps = {
	style: undefined,
};

I18nTable.propTypes = {
	style: PropTypes.objectOf(PropTypes.any),
};

export default I18nTable;
