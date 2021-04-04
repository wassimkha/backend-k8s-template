import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR
} from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null
}

function authReducer(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                token: payload.token,
                user: payload.user,
                isAuthenticated: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user
            }
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null
            }
        default:
            return state;

    }

}

export default authReducer;