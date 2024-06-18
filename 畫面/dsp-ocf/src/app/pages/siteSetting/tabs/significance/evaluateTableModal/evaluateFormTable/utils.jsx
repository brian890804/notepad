import React from 'react';
import { nanoid } from 'nanoid';
import { Button, Flex } from '@delta/dsp-ui/lib/antd';
import { MinusCircleOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { DSPFormItem, DSPTableItem } from '@delta/dsp-ui';
import { getIntl } from '../../../../../../intl/IntlGlobalProvider';

export default {};

/* 將 api 返回的數據轉換成 antd table columns 的格式 */
export const convertEvaluationTableColumn = (columns, handleRemoveColumn, handleRemoveRow) => {
	const { formatMessage } = getIntl();
	if (!columns) return [];
	const convertedColumns = columns.map(({ label, name }) => ({
		name,
		label,
		key: label,
		onClick: () => handleRemoveColumn(label),
		dataIndex: label,
		width: 150,
		render: (cell, { isEdit, scoreId }) =>
			isEdit ? (
				<DSPFormItem className="evaluateFormTable__table__formItem" name={[scoreId, label]} type="input" />
			) : (
				DSPTableItem.StringItem(cell)
			),
	}));
	return [
		{
			name: formatMessage({ id: 'common.score' }),
			label: 'score',
			dataIndex: 'score',
			key: 'score',
			width: 100,
			fixed: 'left',
			render: (cell, { isEdit, scoreId, totalRow }) =>
				isEdit ? (
					<div className="evaluateFormTable__table__column">
						<DSPFormItem className="evaluateFormTable__table__formItem" name={[scoreId, 'score']} type="number" />
						{totalRow > 1 && (
							<Button
								type="text"
								shape="circle"
								onClick={() => handleRemoveRow(scoreId)}
								className="evaluateFormTable__table__column__btn minusBtn"
								icon={<MinusCircleOutlined className="minusBtn__icon" />}
							/>
						)}
					</div>
				) : (
					DSPTableItem.StringItem(cell)
				),
		},
		...convertedColumns,
	];
};

/* 根據是否為編輯模式設置 table header 的內容 */
export const setColumnTitle = (columns, isEdit) => {
	if (!columns) return [];
	return columns.map(({ name, label, onClick, ...rest }, idx) => ({
		name,
		label,
		onClick,
		...rest,
		title: () => {
			if (name && label === 'score') return name;
			if (!isEdit) return `${label} ${name}`;
			return (
				<>
					<Flex className="evaluateFormTable__table__header__btn" align="center">
						<span>{label}</span>
						{columns.length > 2 && idx === columns.length - 1 && (
							<Button
								type="text"
								shape="circle"
								onClick={onClick}
								className="minusBtn"
								icon={<MinusCircleOutlined className="minusBtn__icon" />}
							/>
						)}
					</Flex>
					<DSPFormItem className="evaluateFormTable__table__formItem" name={['columns', label]} type="input" />
				</>
			);
		},
	}));
};

/* 將 api 返回的數據轉換成 antd table datasource 的格式 */
export const convertEvaluationTableData = (columns, rows) => {
	if (!columns || !rows) return [];
	const convertedRows = rows.map(({ score, data }) => ({
		isEdit: false,
		score: score.score,
		scoreId: score.id,
		totalRow: rows.length,
		...columns.reduce((prev, current) => {
			const { label } = current;
			return { ...prev, [label]: data[label] || '' };
		}, {}),
	}));
	return convertedRows;
};

/* 將 antd table 的數據轉換成 form 的格式 */
export const convertTableDataToFormValue = (column, datasouce) => {
	const columnData = column?.reduce((prev, current) => {
		const { name, label } = current;
		return { ...prev, [label]: name };
	}, {});

	const rowData = datasouce?.reduce((prev, current) => {
		const { scoreId, ...rest } = current;
		return { ...prev, [scoreId]: rest };
	}, {});

	return { columns: columnData, ...rowData };
};

/* 將 form 的數據轉換成 api 的 payload 格式 */
export const convertFormValueToPayload = formValue => {
	const { columns, ...restRow } = formValue;
	return {
		columns: Object.entries(columns).map(([label, name]) => ({ label, name })),
		rows: Object.keys(restRow).map(key => {
			const { score, ...rest } = formValue[key];
			return { score: { id: key.startsWith('temp') ? null : key, score }, data: rest };
		}),
	};
};

export const createRowByPreviousRow = previousRow => {
	if (!previousRow) return {};
	return Object.keys(previousRow).reduce((prev, key) => {
		const temp = { ...prev };
		if (key === 'scoreId') temp[key] = `temp-${nanoid()}`;
		else if (key === 'score') temp[key] = 0;
		else if (key === 'isEdit') temp[key] = true;
		else if (key === 'totalRow') temp[key] = previousRow[key] + 1;
		else temp[key] = '';
		return temp;
	}, {});
};

const COLUMN_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const createColumnByPreviousColumn = (previousColumn, handleRemoveColumn) => {
	if (!previousColumn) return {};
	const currentLabelIndex = COLUMN_LABELS.indexOf(previousColumn.label);
	const nextLabel = COLUMN_LABELS[currentLabelIndex + 1];
	return Object.keys(previousColumn).reduce((prev, key) => {
		const temp = { ...prev };
		if (key === 'name') {
			temp[key] = '';
		} else if (['dataIndex', 'key', 'label'].includes(key)) {
			temp[key] = nextLabel;
		} else if (key === 'render') {
			temp[key] = (cell, record) =>
				record?.isEdit ? (
					<DSPFormItem className="evaluateFormTable__table__formItem" name={[record?.scoreId, nextLabel]} type="input" />
				) : (
					DSPTableItem.StringItem(cell)
				);
		} else if (key === 'onClick') {
			temp[key] = () => handleRemoveColumn(nextLabel);
		} else if (key === 'title') {
			temp[key] = (
				<>
					<Flex className="evaluateFormTable__table__header__btn" align="center">
						<span>{nextLabel}</span>
						<Button
							type="text"
							shape="circle"
							onClick={() => handleRemoveColumn(nextLabel)}
							className="minusBtn"
							icon={<MinusCircleOutlined className="minusBtn__icon" />}
						/>
					</Flex>
					<DSPFormItem className="evaluateFormTable__table__formItem" name={['columns', nextLabel]} type="input" />
				</>
			);
		} else temp[key] = previousColumn[key];
		return temp;
	}, {});
};
