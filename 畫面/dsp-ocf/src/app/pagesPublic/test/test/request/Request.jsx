import React, { useCallback, useState } from 'react';
import { Button, Input } from '@delta/dsp-ui/lib/antd';
import axios from 'axios';

const Request = () => {
	const [url, setUrl] = useState('http://');

	const handleApi = useCallback(() => {
		axios.get(url);
	}, [url]);

	return (
		<div>
			<Input className="test__content__input" value={url} onChange={e => setUrl(e.target.value)} />
			<Button className="test__content__btn" type="primary" onClick={handleApi}>
				GO
			</Button>
		</div>
	);
};

Request.propTypes = {};

export default Request;
