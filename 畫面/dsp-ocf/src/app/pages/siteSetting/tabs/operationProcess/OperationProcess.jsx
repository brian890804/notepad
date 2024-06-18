import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { DSPHandleAxiosError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import { message } from '@delta/dsp-ui/lib/antd';
import { useIntl } from 'react-intl';
import { DSPSearchBarTable } from '@delta/dsp-ui';
import useOperationProcessTableSchems from './useOperationProcessTableSchems';
import services from '../../../../../config/services';
import clearPageParam from '../../../../utils/clearPageParam';
import OperationProcessFormModal from './operationProcessFormModal/OperationProcessFormModal';

import './operationProcess.scss';

const OperationProcess = ({ siteId }) => {
	const intl = useIntl();
	const [openOPModal, setOpenOPModal] = useState();
	const [editOPId, setEditOPId] = useState();
	const tableRef = useRef();

	const {
		search: { tab },
		navigateReplace,
	} = DSPUseNavAppendSearch();

	/** 重新取得清單 */
	const refreshTable = useCallback(() => tableRef?.current?.fetchTableData(), []);
	useEffect(() => {
		if (tab === 'operationProcess') refreshTable();
	}, [siteId, tab]);

	/** 刪除活動 */
	const { axiosApi: deleteOperationProcess } = DSPUseAxios().useDelete();
	/** Table 欄位操作 */
	const columnProps = {
		handleActions: (key, { id, name }) => {
			switch (key) {
				case 'edit': {
					setEditOPId(id);
					setOpenOPModal(true);
					break;
				}
				case 'read': {
					navigateReplace({ dialogType: 'opInfo', opId: id, name, ...clearPageParam }, false);
					break;
				}
				case 'delete':
					return deleteOperationProcess({ url: `${services.siteOperationProcess}/${id}` })
						.then(() => refreshTable())
						.catch(error => DSPHandleAxiosError({ intl, error }));
				default:
					message.success(`${key}: ${name}`);
					break;
			}
			return Promise.resolve();
		},
	};

	return (
		<div className="operationProcess">
			<DSPSearchBarTable
				ref={tableRef}
				apiConfig={{ url: services.siteOperationProcesses?.replace('{siteId}', siteId) }}
				columns={useOperationProcessTableSchems(columnProps)}
				scroll={{ x: 1, y: 'calc(100vh - 380px)' }}
				onActionClick={key => {
					if (key === 'add') setOpenOPModal(true);
				}}
			/>
			<OperationProcessFormModal
				open={openOPModal}
				setOpen={setOpenOPModal}
				siteId={siteId}
				OPId={editOPId}
				onFinish={refresh => {
					setOpenOPModal();
					setEditOPId();
					if (refresh) refreshTable();
				}}
			/>
		</div>
	);
};

OperationProcess.defaultProps = {
	siteId: undefined,
};

OperationProcess.propTypes = {
	siteId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default OperationProcess;
