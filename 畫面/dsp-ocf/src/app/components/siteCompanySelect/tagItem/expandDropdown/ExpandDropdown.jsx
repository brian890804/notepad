import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { PlusSquareOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { Button, Checkbox, Divider, Dropdown, Empty, Spin, theme } from '@delta/dsp-ui/lib/antd';
import { DSPHandleAxiosError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import { useIntl } from 'react-intl';
import services from '../../../../../config/services';

import './expandDropdown.scss';

// 去除相同的值
// const filterValue = (v, i, a) => a.findIndex(t => t.value === v.value) === i;

const ExpandDropdown = ({ siteId, value, onChange }) => {
	const intl = useIntl();
	const { formatMessage } = intl;
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState();
	const [currentValue, setCurrentValue] = useState();

	const { loading, axiosApi: fetchCompanies } = DSPUseAxios().useGet();

	const { token } = theme.useToken();
	const contentStyle = {
		backgroundColor: token.colorBgElevated,
		borderRadius: token.borderRadiusLG,
		boxShadow: token.boxShadowSecondary,
	};

	useEffect(() => setCurrentValue(value?.map(i => i?.value)), [value]);

	useEffect(() => {
		if (open) {
			// 拿所有公司
			fetchCompanies({ url: `${services.site}/${siteId}`, mapper: resp => resp.data?.result?.companies })
				.then(companies => {
					const result = companies?.map(({ company }) => company);
					// setOptions(result?.concat(value)?.filter(filterValue)); // 將之前已選的項目補進來，避免被移除的公司看不到選項
					setOptions(result);
				})
				.catch(error => DSPHandleAxiosError({ error, intl }));
		}
	}, [open]);

	// 是否已全選
	const checkAll = useMemo(
		() => options?.length > 0 && JSON.stringify(options?.map(i => i?.value)) === JSON.stringify(currentValue),
		[options, currentValue]
	);

	// 是否介於全選與全不選之間
	const indeterminate = useMemo(
		() => currentValue?.length > 0 && JSON.stringify(options?.map(i => i?.value)) !== JSON.stringify(currentValue),
		[currentValue, options]
	);

	return (
		<span className="expandDropdown" onClick={e => e.stopPropagation()}>
			<Dropdown
				trigger={['click']}
				overlayClassName="expandDropdown__overlay"
				open={open}
				onOpenChange={setOpen}
				dropdownRender={() => (
					<div style={contentStyle}>
						<Spin spinning={loading}>
							{/* 全選 */}
							<div className="expandDropdown__overlay__actions">
								<Checkbox
									indeterminate={indeterminate}
									onChange={e => setCurrentValue(e.target.checked ? options?.map(i => i?.value) : [])}
									checked={checkAll}
								>
									Check all
								</Checkbox>
							</div>
							<Divider style={{ margin: 0 }} />
							{/* 選擇清單 */}
							<Checkbox.Group className="expandDropdown__overlay__body" value={currentValue} onChange={setCurrentValue}>
								{options?.length > 0 ? (
									options?.map(option => (
										<Checkbox
											key={option?.value}
											value={option?.value}
											className="expandDropdown__overlay__body__checkbox"
										>
											<span title={option?.label}>{option?.label}</span>
										</Checkbox>
									))
								) : (
									<Empty />
								)}
							</Checkbox.Group>
							<Divider style={{ margin: 0 }} />
							{/* 確認按鈕 */}
							<div
								className="expandDropdown__overlay__actions"
								onClick={() => {
									const result = options?.filter(i => currentValue?.includes(i?.value));
									onChange(result);
									setOpen(false);
								}}
							>
								<Button size="small" type="primary">
									{formatMessage({ id: 'common.confirm' })}
								</Button>
							</div>
						</Spin>
					</div>
				)}
			>
				<PlusSquareOutlined />
			</Dropdown>
		</span>
	);
};

ExpandDropdown.defaultProps = {
	siteId: undefined,
	value: undefined,
	onChange: () => undefined,
};

ExpandDropdown.propTypes = {
	siteId: PropTypes.number,
	value: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })),
	onChange: PropTypes.func,
};

export default ExpandDropdown;
