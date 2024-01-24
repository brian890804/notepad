import React, { useCallback, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import { message } from '@delta/dsp-ui/lib/antd';
import { DSPSearchBarTable } from '@delta/dsp-ui';
import { DSPHandleAxiosError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { useIntl } from 'react-intl';
import queryString from 'query-string';
import useProjectTableSchema from './useProjectTableSchema';
import ProjectFormModal from './projectFormModal/ProjectFormModal';
import services from '../../../../config/services';

import './pjList.scss';

const PjList = () => {
	const intl = useIntl();
	const { formatMessage } = intl;
	const tableRef = useRef();
	const [opneFormModal, setOpenFormModal] = useState(false);
	const [editProjectId, setEditProjectId] = useState();
	const [exportMode, setExportMode] = useState(false);

	const { axiosApi: deleteProject } = DSPUseAxios().useDelete();

	// 重新取得清單
	const refreshTable = useCallback(() => tableRef?.current?.fetchTableData(), []);

	const onFinish = refresh => {
		if (refresh) refreshTable();
		setEditProjectId();
		setOpenFormModal(false);
		setExportMode(false);
	};

	const columnProps = {
		handleActions: (key, record) => {
			switch (key) {
				case 'edit':
					setOpenFormModal(true);
					setEditProjectId(record?.id);
					break;
				case 'export':
					setOpenFormModal(true);
					setEditProjectId(record?.id);
					setExportMode(true);
					break;
				case 'delete':
					return deleteProject({ url: `${services.project}/${record?.id}` })
						.then(() => onFinish(true))
						.catch(error => DSPHandleAxiosError({ intl, error }));
				default:
					message.success(`${key} ${JSON.stringify(record)}`);
			}
			return Promise.resolve();
		},
	};

	return (
		<div className="pjList">
			<DSPSearchBarTable
				ref={tableRef}
				className="corporate"
				apiConfig={{ url: services.projects }}
				columns={useProjectTableSchema(columnProps)}
				onActionClick={() => setOpenFormModal(true)}
			/>
			<ProjectFormModal
				exportMode={exportMode}
				projectId={editProjectId}
				open={opneFormModal}
				onFinish={onFinish}
				onExport={data => {
					window.open(
						`${services.exportProject?.replace('{projectId}', editProjectId)}${
							Number.isInteger(data?.gwp?.value) ? `?${queryString.stringify({ gwpId: data?.gwp?.value })}` : ''
						}`,
						'_blank'
					);
					// 清冊已進行匯出
					message.success(formatMessage({ id: 'project.export.success' }));
					onFinish();
				}}
			/>
		</div>
	);
};

PjList.propTypes = {};

export default PjList;
