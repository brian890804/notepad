import React, { useCallback, useRef } from 'react';
import { useIntl } from 'react-intl';
import { DSPSearchBarTable } from '@delta/dsp-ui';
import { DSPHandleAxiosError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import services from '../../../../config/services';
import ghgTableSchema from './ghgTableSchema';

import './ghgList.scss';

const GWPList = () => {
	const intl = useIntl();
	const tableRef = useRef();
	const { nav } = DSPUseNavAppendSearch();

	const { axiosApi: deleteGHG } = DSPUseAxios().useDelete();

	// 重新取得清單
	const refreshTable = useCallback(() => tableRef?.current?.fetchTableData(), []);

	const columnProps = {
		handleActions: (key, record) => {
			const { id } = record || {};
			switch (key) {
				case 'edit': {
					nav({ pathname: `/home/form/ghg/${id}` }, false);
					break;
				}
				case 'delete': {
					return deleteGHG({ url: `${services.ghgFactorType}/${id}` })
						.then(() => refreshTable())
						.catch(error => DSPHandleAxiosError({ error, intl }));
				}
				default:
					break;
			}
			return Promise.resolve();
		},
	};

	return (
		<DSPSearchBarTable
			className="ghgList"
			ref={tableRef}
			apiConfig={{ method: 'post', url: services.ghgList }}
			columns={ghgTableSchema(columnProps)}
			scroll={{ x: 1, y: 'calc(100vh - 280px)' }}
			onActionClick={type => {
				if (type === 'add') nav({ pathname: '/home/form/ghg' }, false);
			}}
		/>
	);
};

GWPList.defaultProps = {};

GWPList.propTypes = {};

export default GWPList;
