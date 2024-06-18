import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './horizontalTable.scss';

const HorizontalTable = ({ value, columns }) => (
	<div className={classNames('dspui-horizontalTable', 'scrollbarSmall')}>
		<table className="dspui-horizontalTable__table">
			<tbody>
				{columns?.map(column => (
					<tr key={column?.name} className="dspui-horizontalTable__table__row">
						{/* table 標題 */}
						<td className="dspui-horizontalTable__table__row__title">{column?.label}</td>
						{/* table 內容 */}
						{value?.map((item, i) => {
							const data = item?.[column?.name];
							const result = typeof data === 'object' ? data?.label || JSON.stringify(data) : data;
							return <td key={[column?.name, i].join('_')}>{['null', undefined].includes(result) ? '-' : result}</td>;
						})}
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

HorizontalTable.defaultProps = {
	value: undefined,
	columns: undefined,
};

HorizontalTable.propTypes = {
	/** 陣列表單欄位key */
	value: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string, factor: PropTypes.number })),
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
			label: PropTypes.string,
			flex: PropTypes.number,
			type: PropTypes.string,
		})
	),
};

export default HorizontalTable;
