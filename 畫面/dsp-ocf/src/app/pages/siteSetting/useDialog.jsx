import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import EmissionInfo from './tabs/emission/emissionInfo/EmissionInfo';
import EquipmentInfo from './tabs/equipment/equipmentInfo/EquipmentInfo';
import OpInfo from './tabs/operationProcess/opInfo/OpInfo';

export default () => {
	const { search } = useLocation();
	const { dialogType } = queryString.parse(search || {});

	switch (dialogType) {
		case 'emissionInfo':
			return <EmissionInfo />;
		case 'equipmentInfo':
			return <EquipmentInfo />;
		case 'opInfo':
			return <OpInfo />;
		default:
			return undefined;
	}
};
