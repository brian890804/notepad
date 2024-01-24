import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { DSPHandleAxiosError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import { useIntl } from 'react-intl';
import { DSPContributionsChart2, DSPSearchBarTable } from '@delta/dsp-ui';
import services from '../../../../../../../config/services';
import useEmissionActivityTableSchema from './useEmissionActivityTableSchema';
import EmissionActivityFormModal from './emissionAcitivityFormModal/EmissionActivityFormModal';

import './emissionActivity.scss';

const EmissionActivity = ({ emissionData }) => {
	const intl = useIntl();
	const [openFormModal, setOpenFormModal] = useState();
	const [editActivityId, setEditActivityId] = useState();
	const tableRef = useRef();
	const { emissionId } = DSPUseNavAppendSearch()?.search || {};

	// 重新取得清單
	const refreshTable = useCallback(() => tableRef?.current?.fetchTableData(), []);
	useEffect(() => refreshTable(), [emissionId]);

	/** 刪除活動數據 */
	const { axiosApi: deleteActivity } = DSPUseAxios().useDelete();
	const columnProps = {
		handleActions: (key, { id }) => {
			switch (key) {
				case 'edit': {
					setEditActivityId(id);
					setOpenFormModal(true);
					break;
				}
				case 'delete':
					return deleteActivity({ url: `${services.siteEmissionActivity}/${id}` })
						.then(() => refreshTable())
						.catch(error => DSPHandleAxiosError({ intl, error }));
				default:
					break;
			}
			return Promise.resolve();
		},
	};

	/** 取得近期1年的活動數據 */
	const { axiosApi: fetchActivityDatas, data } = DSPUseAxios().useGet();
	useEffect(() => {
		fetchActivityDatas({
			url: services.siteEmissionActivities.replace('{emissionSourceId}', emissionId),
			mapper: resp => resp?.data?.result?.data,
		});
	}, []);

	return (
		<div className="emissionActivity">
			{/* 活動數據列表 */}
			<DSPSearchBarTable
				ref={tableRef}
				apiConfig={{ url: services.siteEmissionActivities.replace('{emissionSourceId}', emissionId) }}
				columns={useEmissionActivityTableSchema(columnProps)}
				scroll={{ x: 1, y: 'calc(100vh - 380px)' }}
				onActionClick={key => {
					if (key === 'add') setOpenFormModal(true);
				}}
			/>
			{/* 貢獻度圖表 */}
			<DSPContributionsChart2 className="emissionActivity__contributions" dataSource={data} />
			{/* 新增活動數據 */}
			<EmissionActivityFormModal
				{...{ emissionId, emissionData }}
				activityId={editActivityId}
				open={openFormModal}
				onFinish={refresh => {
					setOpenFormModal();
					setEditActivityId();
					if (refresh) refreshTable();
				}}
			/>
		</div>
	);
};

EmissionActivity.defaultProps = {
	emissionData: undefined,
};

EmissionActivity.propTypes = {
	emissionData: PropTypes.objectOf(PropTypes.any),
};

export default EmissionActivity;
