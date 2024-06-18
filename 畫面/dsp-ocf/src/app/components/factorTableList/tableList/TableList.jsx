import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Spin } from '@delta/dsp-ui/lib/antd';
import { useIntl } from 'react-intl';
import { DSPTableActions, DSPTableItem } from '@delta/dsp-ui';
import classNames from 'classnames';
import HorizontalTable from '../horizontalTable/HorizontalTable';
import factorTableSchema from '../../../utils/factorTableSchema';

import './tableList.scss';

const TableList = ({ className, loading, privilege, dataSource, handleActions }) => {
	const { formatMessage } = useIntl();

	return (
		<Spin
			wrapperClassName={classNames('tableList', 'scrollbarSmall', { 'tableList--hasData': dataSource?.length > 0 }, className)}
			spinning={!!loading}
		>
			{dataSource?.length > 0 ? (
				dataSource?.map((value, i) => {
					const { table, ghgBased, startDate, endDate } = value || {};
					const { factors, reference, factorType } = table || {};
					return (
						<div className="tableList__item" key={i.toString()}>
							<div className="tableList__item__header">
								<div className="tableList__item__header__title">
									{formatMessage(
										{ id: 'site.setting.emission.coefficient.title' },
										{
											ghgBased: formatMessage({ id: `common.${ghgBased}.base` }),
											name: `${reference?.label} - ${factorType?.label}`,
											startTime: DSPTableItem.DateItem(startDate),
											endTime: DSPTableItem.DateItem(endDate),
										}
									)}
								</div>
								{Object.keys(privilege || {})?.length > 0 && (
									<DSPTableActions privilege={privilege} onClick={key => handleActions(key, value)} />
								)}
							</div>
							<HorizontalTable value={factors} columns={factorTableSchema({ formatMessage })} />
						</div>
					);
				})
			) : (
				<Empty />
			)}
		</Spin>
	);
};

TableList.defaultProps = {
	className: undefined,
	privilege: undefined,
	loading: undefined,
	dataSource: undefined,
	handleActions: () => undefined,
};

TableList.propTypes = {
	/** CSS Name */
	className: PropTypes.string,
	/** 操作的權限功能 */
	privilege: PropTypes.shape({ add: PropTypes.bool, edit: PropTypes.bool, delete: PropTypes.bool }),
	/** 是否載入中 */
	loading: PropTypes.bool,
	/** 係數表陣列 */
	dataSource: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.number })),
	/**  */
	handleActions: PropTypes.func,
};

export default TableList;
