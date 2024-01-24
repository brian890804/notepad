import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { FORM_EDITING, FORM_FINISH } from '../appReducer';

export default props => {
	const { editing } = props || {};
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: editing ? FORM_EDITING : FORM_FINISH });
	}, [editing]);
};
