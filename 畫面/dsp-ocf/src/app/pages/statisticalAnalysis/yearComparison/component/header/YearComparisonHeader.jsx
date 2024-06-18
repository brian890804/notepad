import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button, Form, DatePicker } from '@delta/dsp-ui/lib/antd';
import RegionSiteCompanyTreeSelect from '../../../../../components/regionSiteCompanyTreeSelect/RegionSiteCompanyTreeSelect';
import './yearComparionHeader.scss';

const YearComparisonHeader = ({ setIsUpdate }) => {
	const { formatMessage } = useIntl();
	return (
		<div className="yearComparison__header">
			<div className="yearComparison__header__function">
				<Form.Item name="sites" rules={[{ required: true, message: '' }]}>
					<RegionSiteCompanyTreeSelect
						maxTagCount="responsive"
						className="yearComparison__header__function__tree"
						placeholder={formatMessage({ id: 'common.placeholder' }, { text: formatMessage({ id: 'project.schema.scope' }) })}
					/>
				</Form.Item>
				<Form.Item name="queryDate" rules={[{ required: true, message: '' }]}>
					<DatePicker picker="month" />
				</Form.Item>
			</div>
			<div className="yearComparison__header__buttons">
				<Button className="yearComparison__header__button" size="large" htmlType="submit" onClick={() => setIsUpdate(true)}>
					{formatMessage({ id: 'yearComparison.compare' })}
				</Button>
				{/* <Button className="yearComparison__header__button" size="large" type="primary" disabled>
					{formatMessage({ id: 'yearComparison.export.data' })}
				</Button> */}
			</div>
		</div>
	);
};

YearComparisonHeader.propTypes = { setIsUpdate: () => undefined };
YearComparisonHeader.defaultProps = { setIsUpdate: PropTypes.func };

export default YearComparisonHeader;
