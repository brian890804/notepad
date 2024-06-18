import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { DSPApiSelect } from '@delta/dsp-ui';
import { Table, Form, Button } from '@delta/dsp-ui/lib/antd';
import { SettingOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import useSignificanceTableSchema from './useSignificanceTableSchema';
import EvaluateTableModal from './evaluateTableModal/EvaluateTableModal';
import FormulaFormModal from './formulaFormModal/FormulaFormModal';
import { converTableColumns, convertTableData } from './utils';
import services from '../../../../../config/services';
import useApi from './useApi';
import './significance.scss';

const Significance = ({ siteId }) => {
	const [scopeId, setScopeId] = useState();
	const [openEvaluateModal, setOpenEvaluateModal] = useState(false);
	const [openFormulaModal, setOpenFormulaModal] = useState(false);

	const intl = useIntl();
	const { formatMessage } = intl;
	const [form] = Form.useForm();
	const { formula, loading, dataSource, assessmentOptions, handleRefreshTable, handleUpdate } = useApi({ siteId, scopeId });
	const { columns, emissionSources } = dataSource || {};
	const { formulaStr, threshold } = formula || {};
	const tableColumns = useSignificanceTableSchema(converTableColumns(columns, assessmentOptions));

	const {
		search: { page, size },
		navigateReplace,
	} = DSPUseNavAppendSearch();

	const current = useMemo(() => {
		const intPage = parseInt(page, 10);
		if (Number.isNaN(intPage)) return 1;
		return intPage;
	}, [page]);

	useEffect(() => {
		const defaultSetting = convertTableData(emissionSources?.data);
		form.setFieldsValue(defaultSetting);
	}, [dataSource, form, scopeId]);

	const onScoreFomulaFinish = refresh => {
		if (refresh) handleRefreshTable(siteId, scopeId);
		setOpenFormulaModal(false);
	};

	return (
		<div className="significance">
			<div className="significance__header">
				<DSPApiSelect
					className="significance__header__select"
					url={services.isoMainCategory}
					value={scopeId}
					popupMatchSelectWidth={false}
					onChange={scope => setScopeId(scope?.value)}
					placeholder={formatMessage(
						{ id: 'common.placeholder' },
						{ text: formatMessage({ id: 'site.setting.schema.standard' }) }
					)}
					mapper={resp => {
						const options = resp?.data?.result
							?.filter(i => i?.value !== 14) // TODO 先把類別6 移除
							?.map(i => ({
								value: i?.value,
								label: `${i?.prefix}${i?.number} ${i?.description}`,
							}));
						setScopeId(options?.[0]?.value); // 第一個為預設值
						return options;
					}}
				/>
				{/* 檢視評估選項表 */}
				<Button icon={<SettingOutlined />} onClick={() => setOpenEvaluateModal(pre => !pre)}>
					{formatMessage({ id: 'significance.severity.table.view' })}
				</Button>
				{/* 重大性得分計算公式 */}
				<Button icon={<SettingOutlined />} onClick={() => setOpenFormulaModal(true)}>
					{formatMessage({ id: 'significance.severity.formula.setting' })}
				</Button>
				<div className="significance__header__right">
					<div className="significance__header__right__block">
						<div className="significance__header__right__block__title">
							{/* 重大性得分計算公式 */}
							{`${formatMessage({ id: 'significance.severity.formula' })}：`}
						</div>
						<div>{formulaStr}</div>
					</div>
					<div className="significance__header__right__block">
						<div className="significance__header__right__block__title">
							{/* 檢別得分門檻 */}
							{`${formatMessage({ id: 'significance.severity.goal' })}：`}
						</div>
						<div>{threshold}</div>
					</div>
				</div>
			</div>
			<Form
				form={form}
				onValuesChange={(changedValues, values) => {
					Object.keys(changedValues).forEach(key => {
						const changedRows = { id: key, ...values[key] };
						handleUpdate(changedRows);
					});
				}}
			>
				<Table
					size="small"
					className="significance__table"
					tableLayout="fixed"
					rowKey="id"
					dataSource={emissionSources?.data}
					loading={loading || !scopeId}
					scroll={{ x: 1, y: 'calc(100vh - 430px)' }}
					columns={tableColumns}
					pagination={{
						pageSize: size,
						current,
						total: emissionSources?.total,
						showTotal: () => {
							if (emissionSources?.total)
								return formatMessage({ id: 'common.pagination.show.total' }, { total: emissionSources?.total });
							return null;
						},
					}}
					onChange={pagination => {
						navigateReplace({ page: pagination?.current, size: pagination?.pageSize });
					}}
				/>
			</Form>
			{/* 評估選項表 */}
			<EvaluateTableModal
				open={openEvaluateModal}
				onFinish={onScoreFomulaFinish}
				onCancel={() => setOpenEvaluateModal(pre => !pre)}
			/>
			{/* 重大性得分計算公式 */}
			<FormulaFormModal open={openFormulaModal} onFinish={onScoreFomulaFinish} />
		</div>
	);
};

Significance.defaultProps = {
	siteId: undefined,
};

Significance.propTypes = {
	siteId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Significance;
