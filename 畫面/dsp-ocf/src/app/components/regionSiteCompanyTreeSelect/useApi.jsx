/* eslint-disable no-param-reassign */
import React, { useMemo, useEffect } from 'react';
import { DSPHandleAxiosError, DSPNestedUtil, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { DeploymentUnitOutlined, EnvironmentOutlined, HomeOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { useIntl } from 'react-intl';
import services from '../../../config/services';

const key = 'id';
const addTreeValueCore = (data = {}, parentId, parentNode) => {
	let uniqueKey;

	data.id = data.key; // 先將 API 的 key 變成 id

	if (data?.type === 'site') {
		// 據點在樹狀時 是唯一的 不會重複，所以可以直接用id就好
		uniqueKey = data[key];
	} else {
		// 據點以外的節點 id 都會灌上上層的 type 及 id
		uniqueKey = `${parentId ? `${parentId}-` : ''}${data[key] ? `${data[key]}-` : ''}${data.type ? `${data.type}` : ''}`;
	}

	data.value = uniqueKey; // 加入唯一識別碼
	data.key = uniqueKey; // 加入唯一識別碼
	if (parentNode) data.parentNode = parentNode; // 若有父層，加入父層節點，供公司反查屬於哪個據點
	if (data.type === 'region') data.icon = <HomeOutlined className="treeSelect__icon treeSelect__icon--region" />;
	if (data.type === 'site') data.icon = <EnvironmentOutlined className="treeSelect__icon treeSelect__icon--site" />;
	if (data.type === 'company') {
		data.icon = <DeploymentUnitOutlined className="treeSelect__icon treeSelect__icon--company" />;
	}

	if (data?.children?.length > 0) {
		data?.children?.forEach(child => {
			const { children, ...node } = data || {};
			addTreeValueCore(child, data.value, data?.type === 'site' ? node : undefined);
		});
	}
};

/* 因 區域-據點-公司 結構的 id 會有重複的可能性，
 * 故透過此函式進行修改 (將母層的 id 灌入子層)
 * 讓每個節點的 node key 都是不相同的 */
const fixTreeValue = tree => {
	if (Array.isArray(tree)) {
		const copyTree = { children: tree };
		addTreeValueCore(copyTree);
		return copyTree?.children;
	}
	const copyTree = { ...tree };
	addTreeValueCore(copyTree);
	return copyTree;
};

export default ({ searchValue, removeCompany }) => {
	const intl = useIntl();
	const { loading, axiosApi: getRegionSiteCompany, data: oriTreeData } = DSPUseAxios().useGet();

	/** 取得樹狀資料 */
	useEffect(() => {
		getRegionSiteCompany({
			url: services.regionSiteCompanyTree,
			mapper: resp => fixTreeValue(resp?.data?.result),
		}).catch(error => DSPHandleAxiosError({ error, intl }));
	}, []);

	/** 若有打入關鍵字搜尋，則將"公司"以外的勾選功能移除 */
	const treeData = useMemo(() => {
		let result = oriTreeData;
		if (searchValue) {
			result = DSPNestedUtil().modifyNode(result, { checkable: ({ type }) => type === 'company' });
		}

		if (removeCompany) {
			result = DSPNestedUtil().filterNode(result, ({ type }) => type !== 'company');
		}

		return result;
	}, [searchValue, oriTreeData]);

	return { loading, treeData };
};
