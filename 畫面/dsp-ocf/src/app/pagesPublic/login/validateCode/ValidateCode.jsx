import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { ReloadOutlined } from '@delta/dsp-ui/lib/antd/icons';
import { Button, Input } from '@delta/dsp-ui/lib/antd';

import './validateCode.scss';

const ValidateCode = ({ test, onChange }) => {
	const { formatMessage } = useIntl();
	const canvasRef = useRef();
	const [captcha, setCaptcha] = useState();
	const [currentValue, setCurrentValue] = useState();

	// 生成隨機驗證碼
	const generateCaptcha = () => {
		const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let newCaptcha = '';
		for (let i = 0; i < 6; i += 1) {
			const randomIndex = Math.floor(Math.random() * chars.length);
			newCaptcha += chars[randomIndex];
		}
		setCaptcha(newCaptcha);
	};

	// 在元件首次渲染時生成驗證碼
	useEffect(() => generateCaptcha(), []);

	// 當驗證碼改變時繪製新的驗證碼圖片
	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		// 清空畫布
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// 繪製新的驗證碼
		ctx.font = '24px Arial';
		ctx.fillStyle = '#455263';
		ctx.fillText(captcha, 10, 25);
	}, [captcha]);

	// 驗證驗證碼是否正確 錯誤就回傳 undefined
	useEffect(() => {
		if (undefined !== currentValue) onChange(captcha === currentValue);
	}, [captcha, currentValue, onChange]);

	/** 測試的程式碼 免得讓使用者一直按登入 */
	useEffect(() => {
		if (test) {
			setCurrentValue(captcha);
			onChange(true);
		}
	}, [captcha]);

	return (
		<div className="validateCode">
			<Input
				placeholder={formatMessage({ id: 'login.verification.code.hint' })}
				value={currentValue}
				onChange={e => setCurrentValue(e.target.value)}
			/>
			<div className="validateCode__code">
				<canvas ref={canvasRef} width={100} height={30} className="validateCode__code__canvas" />
				<Button type="text" className="validateCode__code__change" onClick={generateCaptcha} icon={<ReloadOutlined />}>
					{formatMessage({ id: 'login.validate.change' })}
				</Button>
			</div>
		</div>
	);
};

ValidateCode.defaultProps = {
	test: undefined,
	onChange: () => undefined,
};

ValidateCode.propTypes = {
	test: PropTypes.bool,
	onChange: PropTypes.func,
};

export default ValidateCode;
