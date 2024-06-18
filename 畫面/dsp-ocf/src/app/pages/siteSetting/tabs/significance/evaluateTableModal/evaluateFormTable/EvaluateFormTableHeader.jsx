import React from 'react';
import PropTypes from 'prop-types';
import { Button, Flex } from '@delta/dsp-ui/lib/antd';
import { EditOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { useIntl } from 'react-intl';

const EvaluateFormTableHeader = ({ isEdit, updating, setIsEdit, handleCancel, handleSave }) => {
	const { formatMessage } = useIntl();
	return (
		<Flex justify="flex-end" gap={8} style={{ marginBottom: 8 }}>
			{!isEdit ? (
				<Button icon={<EditOutlined />} onClick={() => setIsEdit(true)}>
					{formatMessage({ id: 'common.edit' })}
				</Button>
			) : (
				<>
					<Button loading={updating} onClick={handleCancel}>
						{formatMessage({ id: 'common.cancel' })}
					</Button>
					<Button type="primary" onClick={handleSave} loading={updating}>
						{formatMessage({ id: 'common.confirm' })}
					</Button>
				</>
			)}
		</Flex>
	);
};

EvaluateFormTableHeader.defaultProps = {
	isEdit: undefined,
	updating: undefined,
	setIsEdit: () => undefined,
	handleCancel: () => undefined,
	handleSave: () => undefined,
};

EvaluateFormTableHeader.propTypes = {
	isEdit: PropTypes.bool,
	updating: PropTypes.bool,
	setIsEdit: PropTypes.func,
	handleCancel: PropTypes.func,
	handleSave: PropTypes.func,
};

export default EvaluateFormTableHeader;
