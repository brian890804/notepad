const INITIAL_STATE = {};

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const FORM_EDITING = 'FORM_EDITING';
export const FORM_FINISH = 'FORM_FINISH';

const app = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return { ...state, user: action.payload };
		case LOGIN_FAILED:
		case LOGOUT_SUCCESS:
			return { ...state, user: null };
		case FORM_EDITING:
			return { ...state, formEditing: true };
		case FORM_FINISH:
			return { ...state, formEditing: undefined };
		default:
			return state;
	}
};

export default app;
