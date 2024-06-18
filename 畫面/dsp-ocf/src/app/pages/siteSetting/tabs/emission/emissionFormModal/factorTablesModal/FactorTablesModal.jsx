import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { DSPModal } from '@delta/dsp-ui';
import { DSPHandleAxiosError, DSPUseAxios } from '@delta/dsp-ui/lib/utils';
import services from '../../../../../../../config/services';
import FactorTableList from '../../../../../../components/factorTableList/FactorTableList';

const FactorTablesModal = ({ resourceId, open, setOpen }) => {
	const intl = useIntl();
	const { formatMessage } = intl;
	const { loading, axiosApi: getResource, data: coefficients } = DSPUseAxios().useGet();
	const [isElectricity, setIsElectricity] = useState();

	useEffect(() => {
		if (open || resourceId === undefined) return;
		getResource({
			url: `${services.resource}/${resourceId}`,
			mapper: resp => {
				setIsElectricity(resp?.data?.result?.isElectricity);
				return resp?.data?.result?.factorTables;
			},
		}).catch(error => {
			DSPHandleAxiosError({ error, intl });
		});
	}, [open, resourceId]);

	return (
		<DSPModal
			open={open}
			size="large"
			title={formatMessage({ id: 'site.setting.modal.resouce.factors.title' })}
			onCancel={() => setOpen()}
			footer={null}
		>
			<FactorTableList value={coefficients} {...{ isElectricity, loading }} />
		</DSPModal>
	);
};

FactorTablesModal.defaultProps = {
	resourceId: undefined,
	open: undefined,
	setOpen: () => undefined,
};

FactorTablesModal.propTypes = {
	resourceId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	open: PropTypes.bool,
	setOpen: PropTypes.func,
};

export default FactorTablesModal;
