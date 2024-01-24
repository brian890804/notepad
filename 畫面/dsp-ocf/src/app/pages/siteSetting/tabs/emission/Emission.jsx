import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { DSPHandleAxiosError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import { DSPSearchBarTable } from '@delta/dsp-ui';
import useEmissionTableSchemas from './useEmissionTableSchemas';
import services from '../../../../../config/services';
import EmissionFormModal from './emissionFormModal/EmissionFormModal';
import clearPageParam from '../../../../utils/clearPageParam';

import './emission.scss';

/**
 * 此元件可以依照 siteId 或 equipmentId 或 opId
 * 來取得列表清單
 */

const Emission = ({ siteId, equipmentId, opId }) => {
	const intl = useIntl();
	const {
		search: { tab, dialogType },
		navigateReplace,
	} = DSPUseNavAppendSearch();
	const [openFormModal, setOpenFormModal] = useState(false);
	const [emissionId, setEmissionId] = useState();
	const tableRef = useRef();

	// 重新取得清單
	const refreshTable = useCallback(() => tableRef?.current?.fetchTableData(), []);
	useEffect(() => {
		if (tab === 'emission' && !dialogType) refreshTable();
	}, [siteId, equipmentId, opId, tab, dialogType]);

	const onActionClick = () => {
		setEmissionId();
		setOpenFormModal(true);
	};

	/** 刪除排放源 */
	const { axiosApi: deleteEmission } = DSPUseAxios().useDelete();

	/** Table 欄位操作 */
	const columnProps = {
		navigateReplace,
		handleActions: (key, { id, name, resource }) => {
			switch (key) {
				case 'edit': {
					setEmissionId(id);
					setOpenFormModal(true);
					break;
				}
				case 'read': {
					navigateReplace(
						{ dialogType: 'emissionInfo', emissionId: id, emissionTab: 'basicInfo', name, ...clearPageParam },
						false
					);
					break;
				}
				case 'resource': {
					navigateReplace({ resourceId: resource?.value, tab: 'resource' }, false);
					break;
				}
				case 'delete':
					return deleteEmission({ url: `${services.siteEmission}/${id}` })
						.then(() => refreshTable())
						.catch(error => DSPHandleAxiosError({ intl, error }));
				default:
					break;
			}
			return Promise.resolve();
		},
	};

	const url = useMemo(() => {
		if (equipmentId) return services.siteEquipmentEmission?.replace('{equipmentId}', equipmentId);
		if (opId) return services.siteOperationProcessEmission?.replace('{opId}', opId);
		if (siteId) return services.siteEmissions?.replace('{siteId}', siteId);
		return undefined;
	}, [siteId, equipmentId, opId]);

	return (
		<div className="emission">
			<DSPSearchBarTable
				ref={tableRef}
				className="emission__table"
				apiConfig={{ method: 'post', url }}
				scroll={{ x: 1, y: 'calc(100vh - 380px)' }}
				columns={useEmissionTableSchemas(columnProps)}
				onActionClick={onActionClick}
			/>
			<EmissionFormModal
				open={openFormModal}
				setOpen={setOpenFormModal}
				emissionId={emissionId}
				siteId={siteId}
				onFinish={() => refreshTable()}
			/>
		</div>
	);
};

Emission.defaultProps = {
	siteId: undefined,
	equipmentId: undefined,
	opId: undefined,
};

Emission.propTypes = {
	/** [必填] 據點 id */
	siteId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/** [選填] 設施 id (若有設施 id 代表 filter) */
	equipmentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/** [選填] 活動 id (若有設施 id 代表 filter) */
	opId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Emission;
