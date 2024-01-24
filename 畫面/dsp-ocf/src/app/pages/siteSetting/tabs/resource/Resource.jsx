import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DSPHandleAxiosError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import { DSPSearchBarTable } from '@delta/dsp-ui';
import { PlusOutlined } from '@delta/dsp-ui/lib/antd/icons';
import ResourceFormModal from './resourceFormModal/ResourceFormModal';
import services from '../../../../../config/services';
import { resourceTableSchema } from './resourceTableSchema';
import { getIntl } from '../../../../intl/IntlGlobalProvider';
import FactorList from './factorList/FactorList';

import './resource.scss';

const Resource = ({ siteId }) => {
	const tableRef = useRef();
	const fatorListRef = useRef();
	const [openFormModal, setOpenFormModal] = useState();
	const [focusResourceId, setFocusResourceId] = useState();
	const {
		search: { resourceId, tab },
		navigateReplace,
	} = DSPUseNavAppendSearch();

	const intl = getIntl();
	const { formatMessage } = intl;

	const { axiosApi: deleteResource } = DSPUseAxios().useDelete();

	// 重新取得清單
	const refreshTable = useCallback(() => tableRef?.current?.fetchTableData(), []);
	useEffect(() => {
		if (tab === 'resource') refreshTable();
	}, [siteId, tab]);

	const columnProps = {
		handleActions: (key, record) => {
			const { id } = record || {};
			switch (key) {
				case 'edit': {
					setFocusResourceId(id);
					setOpenFormModal(true);
					break;
				}
				case 'select': {
					navigateReplace({ resourceId: id });
					break;
				}
				case 'delete': {
					return deleteResource({ url: `${services.resource}/${id}` })
						.then(() => {
							if (resourceId === id?.toString()) {
								navigateReplace({ resourceId: undefined });
							}
							refreshTable();
						})
						.catch(error => DSPHandleAxiosError({ error, intl }));
				}
				default:
					break;
			}
			return Promise.resolve();
		},
	};

	const onFinish = refresh => {
		setOpenFormModal();
		setFocusResourceId();
		if (refresh) {
			refreshTable();
			fatorListRef.current?.fetchResource();
		}
	};

	return (
		<div className="resource">
			{/* 原燃物料或產品列表 */}
			<DSPSearchBarTable
				ref={tableRef}
				className="resource__list"
				apiConfig={{ url: services.siteResources?.replace('{siteId}', siteId) }}
				columns={resourceTableSchema(columnProps)}
				scroll={{ x: 1, y: 'calc(100vh - 334px)' }}
				pagination={{ pageSize: 20 }}
				tableRowSelection={{
					type: 'radio',
					selectedRowKeys: resourceId ? [parseInt(resourceId, 10)] : undefined,
					columnWidth: 0, // Set the width to 0
					renderCell: () => '', // Render nothing inside
				}}
				searchbarActions={[
					{
						title: formatMessage({ id: 'site.setting.modal.resource.title' }, { action: formatMessage({ id: 'common.add' }) }),
						key: 'add',
						icon: <PlusOutlined />,
					},
				]}
				onActionClick={type => {
					if (type === 'add') {
						setFocusResourceId(null);
						setOpenFormModal(true);
					}
				}}
			/>
			<div className="resource__divider" />
			{/* 係數一覽表 */}
			<FactorList ref={fatorListRef} className="resource__factorList" resourceId={resourceId} refreshResourceTable={refreshTable} />
			{/* 新增原燃物料或產品 */}
			<ResourceFormModal open={openFormModal} siteId={siteId} resourceId={focusResourceId} onFinish={onFinish} />
		</div>
	);
};

Resource.defaultProps = {
	siteId: undefined,
};

Resource.propTypes = {
	siteId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Resource;
