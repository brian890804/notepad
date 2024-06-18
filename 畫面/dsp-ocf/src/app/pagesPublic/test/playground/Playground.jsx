import React, { useState } from 'react';
import { Button, Modal } from '@delta/dsp-ui/lib/antd';
import { useIntl } from 'react-intl';

import './playground.scss';

const Playground = () => {
	const { formatMessage } = useIntl();
	const [count, setCount] = useState(0);
	const [visibile, setVisibile] = useState(false);

	const closeModal = () => setVisibile(false);

	return (
		<div className="playground">
			<h1>{formatMessage({ id: 'hello' })}</h1>
			<h1>{formatMessage({ id: 'superHello' }, { someoneName: 'Hsun.Tsai' })}</h1>
			<h2>想玩什麼自己玩</h2>
			<div className="playground__count">{`數字 ${count}`}</div>
			<div className="playground__action">
				<Button className="playground__action__btn" type="primary" onClick={() => setCount(count + 1)}>
					+1
				</Button>
				<Button className="playground__action__btn" onClick={() => setCount(count - 1)}>
					-1
				</Button>
			</div>
			<div className="playground__modal-div">
				<h2 className="playground__modal-div__title">這裡測試HMR</h2>
				<button className="playground__modal-div__btn" type="primary" onClick={() => setVisibile(!visibile)}>
					click me
				</button>
				<Modal open={visibile} onCancel={closeModal} onOk={closeModal}>
					<p>Something in here</p>
					<p>Something in here</p>
					<p>Something in here</p>
					<p>Something in here</p>
				</Modal>
			</div>
		</div>
	);
};

Playground.propTypes = {};

export default Playground;
