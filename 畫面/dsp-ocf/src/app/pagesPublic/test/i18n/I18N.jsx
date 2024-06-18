import React from 'react';
import { Collapse } from '@delta/dsp-ui/lib/antd';
import { getIntl } from '../../../intl/IntlGlobalProvider';

import './i18n.scss';

const I18N = () => {
	const { formatMessage, FormattedMessage } = getIntl();

	return (
		<div className="i18n">
			<h2>I18N Sample Code</h2>

			<Collapse className="i18n__collapse" defaultActiveKey={['one']}>
				<Collapse.Panel key="one" header="範例1">
					<code>{'const { formatMessage } = useIntl();'}</code>
					<br />
					<code>{"formatMessage({ id='xxx' }, { xxx= 'xxx' });"}</code>
					<div className="i18n__collapse__item">
						<h3>↓ 依照上面程式碼實現如下 ↓</h3>
						<div className="i18n__collapse__item__sample">
							{formatMessage({ id: 'superHello' }, { someoneName: 'Hsun.Tsai' })}
						</div>
					</div>
				</Collapse.Panel>
			</Collapse>

			<Collapse className="i18n__collapse" defaultActiveKey={['two']}>
				<Collapse.Panel key="two" header="範例2">
					<code>{"<FormattedMessage id='xxx' values={{ xxx: 'xxx' }} />"}</code>
					<div className="i18n__collapse__item">
						<h3>↓ 依照上面程式碼實現如下 ↓</h3>
						<div className="i18n__collapse__item__sample">
							<FormattedMessage id="superHello" values={{ someoneName: 'Hsun.Tsai' }} />
						</div>
					</div>
				</Collapse.Panel>
			</Collapse>
		</div>
	);
};

I18N.propTypes = {};

export default I18N;
