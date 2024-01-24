/* eslint-disable no-nested-ternary */
import { notification } from '@delta/dsp-ui/lib/antd';

export const openNotification = (type, message, description, duration = 4) => {
	notification.config({ placement: 'bottomLeft', duration });
	notification[type]({ message, description });
};

export const text = () => {};
