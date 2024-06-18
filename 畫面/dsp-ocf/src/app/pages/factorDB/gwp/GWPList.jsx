import React, { useCallback, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { DSPSearchBarTable } from '@delta/dsp-ui';
import { DSPHandleAxiosError, DSPUseAxios, DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import services from '../../../../config/services';
import gwpTableSchema from './gwpTableSchema';
import { openNotification } from '../../../utils/notification';

import './gwpList.scss';

const test = true;

const GWPList = () => {
	const intl = useIntl();
	const tableRef = useRef();
	const { nav } = DSPUseNavAppendSearch();

	/** 刪除GWP */
	const { axiosApi: deleteGWP } = DSPUseAxios().useDelete();

	/** 取得全部 ghg 種類 */
	const { axiosApi: getAllGHG, data: ghgTypes } = DSPUseAxios().useGet();
	useEffect(() => {
		getAllGHG({ url: services.ghgAll, mapper: resp => resp?.data?.result }).catch(error => {
			DSPHandleAxiosError({ error, intl });
		});
	}, []);

	// 重新取得清單
	const refreshTable = useCallback(() => tableRef?.current?.fetchTableData(), []);

	const columnProps = {
		ghgTypes,
		handleActions: (key, record) => {
			const { id } = record || {};
			switch (key) {
				case 'edit': {
					nav({ pathname: `/home/form/gwp/${id}` }, false);
					break;
				}
				case 'delete': {
					if (test) {
						openNotification('warning', '尚不支援刪除功能');
						break;
					} else {
						return deleteGWP({ url: `${services.gwp}/${id}` })
							.then(() => refreshTable())
							.catch(error => DSPHandleAxiosError({ error, intl }));
					}
				}
				default:
					break;
			}
			return Promise.resolve();
		},
	};

	return (
		<DSPSearchBarTable
			className="gwpList"
			ref={tableRef}
			apiConfig={{ url: services.gwpList }}
			columns={gwpTableSchema(columnProps)}
			scroll={{ x: 1, y: 'calc(100vh - 280px)' }}
			onActionClick={type => {
				if (type === 'add') nav({ pathname: '/home/form/gwp' }, false);
			}}
		/>
	);
};

GWPList.defaultProps = {};

GWPList.propTypes = {};

export default GWPList;
