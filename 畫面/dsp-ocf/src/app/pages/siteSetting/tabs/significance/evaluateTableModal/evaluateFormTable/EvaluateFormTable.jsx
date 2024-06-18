import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash-es';
import { Flex, Form, Table, Spin, Button } from '@delta/dsp-ui/lib/antd';
import { PlusOutlined } from '@delta/dsp-ui/lib/antd/icons';
import EvaluateFormTableHeader from './EvaluateFormTableHeader';
import { convertTableDataToFormValue, createColumnByPreviousColumn, createRowByPreviousRow, setColumnTitle } from './utils';
import useApi from './useApi';
import './evaluateFormTable.scss';

const EvaluateFormTable = ({ open, onFinish }) => {
	const [form] = Form.useForm();
	const [isEdit, setIsEdit] = useState(false);
	const [columns, setColumns] = useState([]);
	const [datasource, setDatasource] = useState([]);

	const handleRemoveRow = scorId => {
		setDatasource(state => {
			const filtered = state.filter(({ scoreId }) => scoreId !== scorId);
			return filtered.map(item => ({ ...item, totalRow: filtered.length }));
		});
	};

	const handleRemoveColumn = option => {
		setColumns(state => {
			const filtered = state.filter(({ label }) => label !== option);
			return setColumnTitle(filtered, true);
		});
	};

	const handleCancel = (originColumns, originRows) => {
		setIsEdit(false);
		setColumns(() => originColumns);
		setDatasource(() => originRows);
		form.resetFields();
	};

	const { loading, updating, evaluationTable, handleSubmit } = useApi({ open, form, handleCancel, handleRemoveRow, handleRemoveColumn });
	const { columns: rawColumns, rows: rawRows } = evaluationTable || {};

	const handleSave = () => {
		handleSubmit({
			onFinish: () => {
				setIsEdit(false);
				onFinish(true);
			},
		});
	};

	const handleAddRow = () => {
		setDatasource(state => {
			const newDatasource = [...state, createRowByPreviousRow(state.at(-1))];
			return newDatasource.map(item => ({ ...item, totalRow: newDatasource.length }));
		});
	};

	const handleAddColumn = () => {
		setColumns(state => {
			const newColumn = createColumnByPreviousColumn(state.at(-1), handleRemoveColumn);
			setDatasource(datasourceState => datasourceState.map(item => ({ ...item, [newColumn.label]: '' })));
			return setColumnTitle([...state, newColumn], true);
		});
	};

	useEffect(() => {
		if (!rawColumns || !rawRows) return;
		setDatasource(rawRows);
		setColumns(rawColumns);
	}, [rawColumns, rawRows]);

	useEffect(() => {
		setDatasource(state => state.map(item => ({ ...item, isEdit })));
		setColumns(state => setColumnTitle(state, isEdit));
	}, [isEdit]);

	useEffect(() => {
		const formValue = { ...convertTableDataToFormValue(columns, datasource) };
		const oldFormValue = form.getFieldsValue(true);
		const mergedFormValue = merge(formValue, oldFormValue);
		form.setFieldsValue(mergedFormValue);
	}, [JSON.stringify(columns), JSON.stringify(datasource)]);

	return (
		<Spin spinning={loading} className="evaluateFormTable">
			<EvaluateFormTableHeader
				{...{ isEdit, updating, setIsEdit, handleSave, handleCancel: () => handleCancel(rawColumns, rawRows) }}
			/>
			{!loading && (
				<Form form={form}>
					<Flex vertical gap={8}>
						<Flex className="evaluateFormTable__table" gap={8} justify="center">
							<Flex vertical gap={8} style={{ width: '100%' }}>
								<Table
									style={{ width: '100%' }}
									bordered
									pagination={false}
									columns={columns}
									dataSource={datasource}
									rowKey="scoreId"
									scroll={{ x: 1, y: 350 }}
									className="evaluateFormTable__table__table"
								/>
								{isEdit && (
									<Button
										size="small"
										icon={<PlusOutlined />}
										onClick={handleAddRow}
										className="evaluateFormTable__table__plusBtn row"
									/>
								)}
							</Flex>
							{isEdit && (
								<div>
									<Button
										size="small"
										icon={<PlusOutlined />}
										onClick={handleAddColumn}
										className="evaluateFormTable__table__plusBtn column"
									/>
								</div>
							)}
						</Flex>
					</Flex>
				</Form>
			)}
		</Spin>
	);
};

EvaluateFormTable.defaultProps = {
	open: undefined,
	onFinish: () => undefined,
};

EvaluateFormTable.propTypes = {
	open: PropTypes.bool,
	onFinish: PropTypes.func,
};

export default EvaluateFormTable;
