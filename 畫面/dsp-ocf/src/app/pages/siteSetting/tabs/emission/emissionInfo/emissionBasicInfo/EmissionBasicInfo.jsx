import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Table } from '@delta/dsp-ui/lib/antd';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { DSPForm, DSPTableActions } from '@delta/dsp-ui';
import { emissionBasicFormSchema } from './emissionBasicFormSchema';
import OperationProcessFormModal from '../../../operationProcess/operationProcessFormModal/OperationProcessFormModal';
import EquipmentFormModal from '../../../equipment/equipmentFormModal/EquipmentFormModal';
import FactorTablesModal from '../../emissionFormModal/factorTablesModal/FactorTablesModal';

import './emissionBasicInfo.scss';

const EmissionBasicInfo = ({ loading, dataSource, onFinish }) => {
	const [openFactorTableModal, setOpenFactorTableModal] = useState(false);
	const [form] = DSPForm.useForm();
	const intl = useIntl();
	const { formatMessage } = intl;

	useEffect(() => {
		form.setFieldsValue(dataSource);
	}, [dataSource]);

	const { siteId, sourceType, emissionSources, resource } = dataSource || {};
	const isEquipemnt = sourceType?.value === 1;

	const [editId, setEditId] = useState();

	/** 更新 活動 or 設施 */
	const handleFinish = useCallback(
		refresh => {
			setEditId();
			if (refresh) onFinish();
		},
		[onFinish]
	);

	/** 更新活動Modal 更新設施Modal */
	const updateModal = useMemo(() => {
		if (!siteId) return null;
		if (isEquipemnt) {
			return <EquipmentFormModal open={!!editId} siteId={siteId} equipmentId={editId} onFinish={handleFinish} />;
		}
		return <OperationProcessFormModal open={!!editId} siteId={siteId} OPId={editId} onFinish={handleFinish} />;
	}, [editId, siteId, handleFinish]);

	return (
		<div className="emissionBasicInfo">
			{/* [排放源] 左邊 基本資訊欄位 */}
			<DSPForm
				className="emissionBasicInfo__basicInfo"
				{...{ form, loading, formSchema: emissionBasicFormSchema({ setOpenFactorTableModal }) }}
			/>
			{/* [排放源] 右邊 相關設施/活動列表 */}
			<div className="emissionBasicInfo__source">
				<div>
					{formatMessage({
						id: isEquipemnt
							? 'site.setting.emission.basicInfo.equipments' // 設施列表
							: 'site.setting.emission.basicInfo.operation.process', // 活動列表
					})}
				</div>
				<Table
					size="small"
					rowKey="value"
					loading={loading}
					columns={[
						{
							title: formatMessage({ id: 'site.setting.schema.name' }),
							dataIndex: 'label',
							key: 'label',
						},
						{
							title: formatMessage({ id: 'site.setting.schema.action' }),
							width: 60,
							dataIndex: 'privilege',
							key: 'privilege',
							fixed: 'right',
							render: (_, { value }) => (
								<DSPTableActions
									privilege={{ edit: true }}
									onClick={key => {
										if (key === 'edit') setEditId(value);
									}}
								/>
							),
						},
					]}
					dataSource={emissionSources}
				/>
			</div>
			{updateModal}
			<FactorTablesModal open={openFactorTableModal} setOpen={setOpenFactorTableModal} resourceId={resource?.value} />
		</div>
	);
};

EmissionBasicInfo.defaultProps = {
	loading: undefined,
	dataSource: undefined,
	onFinish: () => undefined,
};

EmissionBasicInfo.propTypes = {
	/** 是否載入中 */
	loading: PropTypes.bool,
	/** 排放源資料 */
	dataSource: PropTypes.objectOf(PropTypes.any),
	/** 更新完 活動 or 設施 */
	onFinish: PropTypes.func,
};

export default EmissionBasicInfo;
