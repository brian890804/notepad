import React from 'react';
import { DSPFormItem } from '@delta/dsp-ui';
import { useIntl } from 'react-intl';
import tableSchemaMapping from '../../../../utils/tableSchemaMapping';
import RowFormItem from './rowFormItem/RowFormItem';
import { getIdentifyOptions } from './utils';

const useSignificanceTableSchema = extraColumns => {
	const { formatMessage } = useIntl();
	const identifyOptions = getIdentifyOptions();
	return [
		/** 間接排放子類別 */
		{
			title: formatMessage({ id: 'significance.scope.name' }),
			key: 'scopeName',
			dataIndex: 'scopeName',
			weight: 2,
		},
		/** 排放源鑑別 */
		{
			title: formatMessage({ id: 'significance.enable' }),
			key: 'isIdentify',
			dataIndex: 'isIdentify',
			weight: 1.5,
			render: (_, record) => (
				<DSPFormItem
					name={record?.id}
					render={() => <RowFormItem name={[record?.id, 'isIdentify']} type="radio" options={identifyOptions} />}
				/>
			),
		},
		/** 排放源項目 */
		{
			title: formatMessage({ id: 'significance.emission.name' }),
			key: 'name',
			dataIndex: 'name',
			weight: 2,
		},
		/** 評估選項 */
		...extraColumns,
		/** 重大性得分 */
		{
			title: formatMessage({ id: 'significance.score' }),
			key: 'score',
			dataIndex: 'score',
			weight: 1.1,
			fixed: 'right',
		},
		/** 重大性鑑別(S/NS) */
		{
			title: formatMessage({ id: 'significance.severity' }),
			key: 'significanceIdentification',
			dataIndex: 'significanceIdentification',
			weight: 1.5,
			fixed: 'right',
		},
	].map(tableSchemaMapping);
};

export default useSignificanceTableSchema;
