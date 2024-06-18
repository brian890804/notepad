import React from 'react';
import { useIntl } from 'react-intl';
// import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { DSPDeltaDivider, DSPLoginForm } from '@delta/dsp-ui';
import { LOGIN_SUCCESS } from '../../appReducer';
import loginBackground from '../../../assets/images/login_background.png';

import './loginPage.scss';

const LoginPage = () => {
	const { formatMessage } = useIntl();
	const dispatch = useDispatch();

	return (
		<div className="loginPage">
			<img className="loginPage__background" src={loginBackground} alt="loginBG" />
			<div className="loginPage__wrapper">
				<DSPDeltaDivider className={classNames('loginPage__wrapper__divider')} />
				<div className="loginPage__wrapper__welcome">
					<div>{formatMessage({ id: 'login.welcome' })}</div>
					<div>{formatMessage({ id: 'header.title' })}</div>
				</div>
				<div className="loginPage__wrapper__submessage">Sign in to your account to start using Energy Online</div>
				<DSPLoginForm
					testMode
					className="loginPage__wrapper__form"
					onLogin={userInfo => dispatch({ type: LOGIN_SUCCESS, payload: userInfo })}
				/>
			</div>
		</div>
	);
};

LoginPage.propTypes = {};

export default LoginPage;
