import { DSPUseNavAppendSearch } from '@delta/dsp-ui/lib/utils';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

export default form => {
	const {
		search: { type },
	} = DSPUseNavAppendSearch();
	const { formatMessage } = useIntl();
	const ghgBasedOption = [
		{ label: 'market', value: 'market' },
		{ label: 'location', value: 'location' },
	];

	useEffect(() => {
		if (!form.getFieldsValue()[type]?.ghgBased) {
			form?.setFieldsValue({
				[type]: { ghgBased: ghgBasedOption[0] },
			});
		}
	}, []);

	const selectItemsMap = [
		// 基準
		{
			key: [type, 'ghgBased'],
			title: formatMessage({ id: 'yearComparison.ghgBased' }),
			options: ghgBasedOption,
		},
	];
	return { selectItemsMap };
};
