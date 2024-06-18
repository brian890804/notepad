import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DSPHandleAxiosError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { Button, Empty, Tabs, Tooltip } from '@delta/dsp-ui/lib/antd';
import { useIntl } from 'react-intl';
import { PlusOutlined, InfoCircleFilled } from '@delta/dsp-ui/lib/antd/icons';
import services from '../../../../../../config/services';
import FactorFormModal from '../../../../../components/factorFormModal/FactorFormModal';
import TableList from '../../../../../components/factorTableList/tableList/TableList';
import { getMissingTimePeriodContent } from '../../../../../utils/getDateOverlapContent';

import './factorList.scss';

const checkHaveMissingTimePeriod = (emissionMissing, resourceMissing) => {
	const { general: eGeneral, location: eLocation, market: eMarket } = emissionMissing || {};
	const { general, location, market } = resourceMissing || {};
	return eGeneral?.length || eLocation?.length || eMarket?.length || general?.length || location?.length || market?.length;
};

const FactorList = forwardRef((props, ref) => {
	const { className, resourceId, refreshResourceTable } = props;

	const intl = useIntl();
	const { formatMessage } = intl;
	const [openFactorModal, setOpenFactorModal] = useState();
	const [editFactorId, setEditFactorId] = useState();
	const [activeKey, setActiveKey] = useState('');
	const { axiosApi: getResource, loading, data } = DSPUseAxios().useGet();
	const { factorTables, isElectricity, emissionSourceMissingTimePeriod, missingTimePeriod } = data || {};
	const { axiosApi: deleteFactor } = DSPUseAxios().useDelete();

	/** 取得原燃物料或產品 */
	const fetchResource = useCallback(() => {
		if (!resourceId) return;
		getResource({
			url: `${services.resource}/${resourceId}`,
			mapper: resp => resp?.data?.result,
		}).catch(error => {
			DSPHandleAxiosError({ intl, error });
		});
	}, [resourceId]);

	useEffect(() => fetchResource(), [resourceId]);

	useImperativeHandle(ref, () => ({ fetchResource }));

	const handleActions = (key, record) => {
		const { id } = record || {};
		switch (key) {
			case 'edit': {
				setEditFactorId(id);
				setOpenFactorModal(true);
				break;
			}
			case 'delete': {
				return deleteFactor({ url: `${services.resourceFactor}/${id}` })
					.then(() => {
						fetchResource();
						refreshResourceTable();
					})
					.catch(error => DSPHandleAxiosError({ error, intl }));
			}
			default:
				break;
		}

		return Promise.resolve();
	};

	const dataSource = useMemo(
		() => factorTables?.filter(table => (table?.ghgBased ? table?.ghgBased?.includes(activeKey) : true)),
		[factorTables, activeKey]
	);

	const haveMissingTime = checkHaveMissingTimePeriod(emissionSourceMissingTimePeriod, missingTimePeriod);

	useEffect(() => {
		if (!isElectricity) setActiveKey('');
	}, [isElectricity]);

	if (!resourceId) {
		return (
			<div className={classNames('factorList', className)}>
				<Empty className="factorList__empty" />
			</div>
		);
	}

	return (
		<div className={classNames('factorList', className)} ref={ref}>
			<div className="factorList__title">係數一覽表</div>
			<Tabs
				animated
				type="card"
				className="factorList__tabs"
				activeKey={activeKey}
				onTabClick={setActiveKey}
				tabBarExtraContent={{
					right: (
						<div className="factorList__tabs__extra">
							{haveMissingTime && (
								<Tooltip
									className="factorList__tabs__extra__info"
									title={getMissingTimePeriodContent(emissionSourceMissingTimePeriod, missingTimePeriod)}
								>
									<InfoCircleFilled />
								</Tooltip>
							)}
							{/* 新增係數按鈕 */}
							<Button onClick={() => setOpenFactorModal(true)} icon={<PlusOutlined />} size="small">
								{formatMessage({ id: 'site.setting.schema.link.factor' })}
							</Button>
						</div>
					),
				}}
				items={[
					{ label: formatMessage({ id: 'common.all' }), key: '' },
					{ label: formatMessage({ id: 'common.location.base' }), disabled: !isElectricity, key: 'location' }, // 區域別
					{ label: formatMessage({ id: 'common.market.base' }), disabled: !isElectricity, key: 'market' }, // 市場別
				]}
			/>
			<TableList className="factorList__table" {...{ loading, dataSource, handleActions }} privilege={{ edit: true, delete: true }} />
			{/* 新增綁定係數 Modal */}
			<FactorFormModal
				{...{ isElectricity, factorTables, resourceId }}
				defaultGhgBased={activeKey}
				factorId={editFactorId}
				open={openFactorModal}
				onFinish={refresh => {
					setEditFactorId();
					setOpenFactorModal();
					if (refresh) {
						fetchResource();
						refreshResourceTable();
					}
				}}
			/>
		</div>
	);
});

FactorList.defaultProps = {
	className: undefined,
	resourceId: undefined,
	refreshResourceTable: () => undefined,
};

FactorList.propTypes = {
	className: PropTypes.string,
	/** 係數id */
	resourceId: PropTypes.string,
	refreshResourceTable: PropTypes.func,
};

export default FactorList;
