import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR
} from "./types";
import set_auth_token from "../../utils/setAuthToken";

//Load user
export const load_user = () => async dispatch => {
    if (localStorage.token) {
        set_auth_token(localStorage.token);
    }

    const axs = axios.create({
        baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    try {
        const res = await axios.post('/auth/currentuser');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//Register User
export const register = ({email, password}) => async dispatch => {
    const axs = axios.create({
        baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    try {
        const res = await axios.post('/auth/signup', {
            email: email,
            password: password
        });
        dispatch({
            type: REGISTER_SUCCESS,
            payload: {...res.data, token: res.headers.token}
        })
    } catch (e) {
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

//Login User
export const login = ({email, password}) => async dispatch => {
    const axs = axios.create({
        baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    try {
        const res = await axios.post('/auth/signin', {
            email: email,
            password: password
        });
        console.log(res.data)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {...res.data, token: res.headers.token}
        })
    } catch (e) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
}