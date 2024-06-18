import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from '@delta/dsp-ui/lib/antd';
import { DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import RegionSiteCompanyTreeSelect from '../../../../components/regionSiteCompanyTreeSelect/RegionSiteCompanyTreeSelect';
import MonthRangePicker from '../../../siteSetting/tabs/overview/monthRangePicker/MonthRangePicker';

const maxSiteCount = 5;

const SiteComparisonHeader = ({ isFilterUpdate }) => {
	const { formatMessage } = useIntl();
	const {
		search: { type },
		navigateReplace,
	} = DSPUseNavAppendSearch();

	useEffect(() => {
		if (!type) {
			navigateReplace({ type: 'emission' });
		}
	}, []);

	return (
		<Row className="siteComparison__header" gutter={[{ xs: 0, lg: 16 }, 12]} align="middle">
			<Col className="siteComparison__header__form" xs={24} lg={10}>
				<Form.Item
					name="sites"
					rules={[
						{
							required: true,
							message: formatMessage(
								{ id: 'common.placeholder' },
								{ text: formatMessage({ id: 'siteComparison.region.select' }) }
							),
						},
						({ setFieldValue }) => ({
							validator(_, values) {
								if (values.length <= maxSiteCount) return Promise.resolve();

								setFieldValue('sites', values.slice(0, maxSiteCount));
								return Promise.reject(
									new Error(formatMessage({ id: 'siteComparison.region.select.count' }, { count: maxSiteCount }))
								);
							},
						}),
					]}
				>
					<RegionSiteCompanyTreeSelect
						maxTagCount="responsive"
						placeholder={formatMessage(
							{ id: 'common.placeholder' },
							{ text: formatMessage({ id: 'siteComparison.region.select' }) }
						)}
						removeCompany
					/>
				</Form.Item>
			</Col>
			<Col className="siteComparison__header__form" xs={24} lg={8}>
				<Form.Item
					name="rangeDate"
					label={formatMessage({ id: 'project.schema.statistics.interval' })}
					rules={[
						{
							required: true,
							message: formatMessage(
								{ id: 'common.placeholder' },
								{ text: formatMessage({ id: 'project.schema.statistics.interval' }) }
							),
						},
					]}
				>
					<MonthRangePicker />
				</Form.Item>
			</Col>
			<Col className="siteComparison__header__tool" xs={24} lg={{ span: 5, offset: 1 }}>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						{isFilterUpdate
							? formatMessage({ id: 'yearComparison.compare.year' })
							: formatMessage({ id: 'yearComparison.compare' })}
					</Button>
				</Form.Item>
			</Col>
		</Row>
	);
};

SiteComparisonHeader.defaultProps = {
	isFilterUpdate: undefined,
};

SiteComparisonHeader.propTypes = {
	/** 是否更新搜尋條件 */
	isFilterUpdate: PropTypes.bool,
};

export default SiteComparisonHeader;
