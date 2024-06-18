import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Space, Tabs } from '@delta/dsp-ui/lib/antd';
import { PlusOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { useIntl } from 'react-intl';
import FactorFormModal from '../factorFormModal/FactorFormModal';
import TableList from './tableList/TableList';
import checkMultipleTimeOverlap from '../../utils/checkMultipleTimeOverlap';
import { openNotification } from '../../utils/notification';
import { getOverlapContent, getNonOverlapContent } from '../../utils/getDateOverlapContent';

import './factorTableList.scss';

/**
 * 在新增原燃物料或產品 Modal 內的係數列表，功能基本上與係數列表相同
 */
const FactorTableList = ({ form, editable, isElectricity, value, onChange }) => {
	const [factorModalOpen, setFactorModalOpen] = useState(false);
	const [nonOverlaps, setNonOverlaps] = useState({ general: [], location: [], market: [] });
	const [activeKey, setActiveKey] = useState('');
	const { formatMessage } = useIntl();

	/**
	 * 係數目前沒有獨特的 id，如果都選一樣的係數 table 會沒有 unique key 去渲染，刪除也無法 filter，
	 * 目前暫時以 idx 代替，看後續要不要改成用 nanoId
	 * */
	const dataSource = value?.map((item, idx) => (item.idx !== undefined ? item : { ...item, idx }));
	const haveNonOverlap = nonOverlaps.general.length > 0 || nonOverlaps.location.length > 0 || nonOverlaps.market.length > 0;

	useEffect(() => {
		if (!form) return;
		form.setFieldValue('nonOverlapContent', haveNonOverlap ? getNonOverlapContent(nonOverlaps) : null);
	}, [form, haveNonOverlap, nonOverlaps]);

	useEffect(() => {
		setNonOverlaps({ general: [], location: [], market: [] });
	}, [isElectricity]);

	useEffect(() => {
		if (!dataSource) return;
		if (isElectricity) {
			const { nonOverlapRanges: locationRanges } = checkMultipleTimeOverlap(dataSource.filter(i => i?.ghgBased === 'location'));
			setNonOverlaps(state => ({ ...state, location: locationRanges }));
			const { nonOverlapRanges: marketRanges } = checkMultipleTimeOverlap(dataSource.filter(i => i?.ghgBased === 'market'));
			setNonOverlaps(state => ({ ...state, market: marketRanges }));
		} else {
			const { nonOverlapRanges } = checkMultipleTimeOverlap(dataSource);
			setNonOverlaps(state => ({ ...state, general: nonOverlapRanges }));
		}
	}, [isElectricity, JSON.stringify(dataSource)]);

	const handleActions = (key, record) => {
		const { id, idx, ghgBased } = record || {};
		if (key === 'delete') {
			const dateRanges = dataSource?.filter(item => !(item.id === id && item.idx === idx));
			const { nonOverlapRanges } = checkMultipleTimeOverlap(dateRanges.filter(i => i?.ghgBased === ghgBased));
			setNonOverlaps(state => ({ ...state, [ghgBased]: nonOverlapRanges }));
			onChange(dateRanges);
		}
	};

	const tabItems = useMemo(() => {
		const commonProps = { privilege: editable ? { delete: true } : undefined, handleActions };
		return [
			{ label: formatMessage({ id: 'common.all' }), key: '', children: <TableList {...commonProps} dataSource={dataSource} /> },
			{
				label: formatMessage({ id: 'common.location.base' }),
				disabled: !isElectricity,
				key: 'location', // 區域別
				children: <TableList {...commonProps} dataSource={dataSource?.filter(i => i?.ghgBased === 'location')} />,
			},
			{
				label: formatMessage({ id: 'common.market.base' }),
				disabled: !isElectricity,
				key: 'market', // 市場別
				children: <TableList {...commonProps} dataSource={dataSource?.filter(i => i?.ghgBased === 'market')} />,
			},
		];
	}, [editable, dataSource, isElectricity, handleActions]);

	useEffect(() => setActiveKey(''), [isElectricity]);

	return (
		<Space direction="vertical" className="factorTableList">
			<Tabs
				animated
				type="card"
				activeKey={activeKey}
				items={tabItems}
				tabBarExtraContent={{
					right: editable && (
						<div className="factorTableList__tabExtra">
							{/* 新增係數按鈕 */}
							<Button onClick={() => setFactorModalOpen(true)} icon={<PlusOutlined />} size="small" type="dashed">
								{formatMessage(
									{ id: 'site.setting.modal.coefficient.title' },
									{ action: formatMessage({ id: 'common.add' }) }
								)}
							</Button>
						</div>
					),
				}}
				onTabClick={setActiveKey}
			/>
			{/* 新增綁定係數 Modal */}
			{editable && (
				<FactorFormModal
					defaultGhgBased={activeKey}
					open={factorModalOpen}
					isElectricity={isElectricity}
					onFinish={setFactorModalOpen}
					onSubmit={data => {
						// 新增係數綁定 (將格式轉換為原燃物料或產品所吃的格式)
						const { ghgBased, table, startDate, endDate } = data || {};
						const result = {
							data,
							startDate,
							endDate,
							ghgBased,
							table: { ...table, id: table?.factorType?.value },
						};
						const factors = (Array.isArray(dataSource) ? dataSource : []).concat([result]);
						const filtered = factors.filter(i => i.ghgBased === ghgBased);
						const { isOverlap, nonOverlapRanges, overlapRanges } = checkMultipleTimeOverlap(filtered);

						// 如果時間區間有重疊，跳 error 並且不新增
						if (isOverlap) {
							const overlapContent = getOverlapContent(overlapRanges);
							openNotification('error', formatMessage({ id: 'common.time.overlap' }), overlapContent);
							return;
						}

						// 如果時間區間未重疊但有缺少的時間區段，跳 error 並且不新增
						if (nonOverlapRanges?.length > 0) {
							const nonOverlapContent = getNonOverlapContent({ [ghgBased]: nonOverlapRanges });
							openNotification('error', formatMessage({ id: 'common.time.leak' }), nonOverlapContent);
							return;
						}

						onChange(factors);
						setFactorModalOpen();
					}}
				/>
			)}
		</Space>
	);
};

FactorTableList.defaultProps = {
	form: undefined,
	editable: undefined,
	isElectricity: undefined,
	value: undefined,
	onChange: () => undefined,
};

FactorTableList.propTypes = {
	/** 表單實例 */
	form: PropTypes.oneOfType([PropTypes.object]),
	/** 是否可編輯 */
	editable: PropTypes.bool,
	/** 是否是電力類型的原燃物料或產品 */
	isElectricity: PropTypes.bool,
	/** 綁定係數的列表內容 */
	value: PropTypes.arrayOf(PropTypes.object),
	/** 新增/刪除綁定的係數表 */
	onChange: PropTypes.func,
};

export default FactorTableList;
