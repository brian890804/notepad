import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DSPHandleAxiosError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import { message } from '@delta/dsp-ui/lib/antd';
import { useIntl } from 'react-intl';
import { DSPSearchBarTable } from '@delta/dsp-ui';
import useEquipmentTableSchems from './useEuqipmentTableSchems';
import services from '../../../../../config/services';
import EquipmentFormModal from './equipmentFormModal/EquipmentFormModal';
import clearPageParam from '../../../../utils/clearPageParam';

import './equipment.scss';

const Equipment = ({ siteId }) => {
	const intl = useIntl();
	const [openEquipmentModal, setOpenEquipmentModal] = useState();
	const [editEquipmentId, setEditEquipmentId] = useState();
	const tableRef = useRef();

	const {
		search: { tab },
		navigateReplace,
	} = DSPUseNavAppendSearch();

	/** 重新取得清單 */
	const refreshTable = useCallback(() => tableRef?.current?.fetchTableData(), []);
	useEffect(() => {
		if (tab === 'equipment') refreshTable();
	}, [siteId, tab]);

	/** 刪除設施 */
	const { axiosApi: deleteEquipment } = DSPUseAxios().useDelete();
	/** Table 欄位操作 */
	const columnProps = {
		handleActions: (key, { id, name }) => {
			switch (key) {
				case 'edit': {
					setEditEquipmentId(id);
					setOpenEquipmentModal(true);
					break;
				}
				case 'read': {
					navigateReplace({ dialogType: 'equipmentInfo', equipmentId: id, name, ...clearPageParam }, false);
					break;
				}
				case 'delete':
					return deleteEquipment({ url: `${services.siteEquipment}/${id}` })
						.then(() => refreshTable())
						.catch(error => DSPHandleAxiosError({ error, intl }));
				default:
					message.success(`${key}: ${name}`);
					break;
			}
			return Promise.resolve();
		},
	};

	return (
		<div className="equipment">
			<DSPSearchBarTable
				ref={tableRef}
				apiConfig={{ url: services.siteEquipments?.replace('{siteId}', siteId) }}
				columns={useEquipmentTableSchems(columnProps)}
				scroll={{ x: 1, y: 'calc(100vh - 380px)' }}
				onActionClick={key => {
					if (key === 'add') setOpenEquipmentModal(true);
				}}
			/>
			{/* 新增/編輯設施 */}
			<EquipmentFormModal
				open={openEquipmentModal}
				siteId={siteId}
				equipmentId={editEquipmentId}
				onFinish={refresh => {
					setOpenEquipmentModal();
					setEditEquipmentId();
					if (refresh) refreshTable();
				}}
			/>
		</div>
	);
};

Equipment.defaultProps = {
	siteId: undefined,
};

Equipment.propTypes = {
	siteId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Equipment;
