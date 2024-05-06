// actions.js
import axios from 'axios';

// Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const URL = 'https://localhost:44343';
// Action Creators
const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
};

const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error
  };
};

const logoutRequest = (data) => {
  return {
    type: LOGOUT,
    payload: data
  };
};

// Thunk Action Creator
export const login = (data) => {
  return (dispatch) => {
    dispatch(loginRequest());
    axios
      .post(`${URL}/user/login`, data, {
        headers: {
          mode: 'no-cors',
          'content-type': 'application/json'
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.token.includes('User login failed')) {
          dispatch(
            logoutRequest({
              user: null,
              token: null,
              status: false
            })
          );
        } else {
          const result = {
            user: data.user,
            token: data.token,
            status: true
          };
          dispatch(loginSuccess(result));
        }
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
      });
  };
};
export const logout = () => {
  return (dispatch) => {
    const result = {
      user: null,
      token: null,
      status: false
    };
    dispatch(logoutRequest(result));
  };
};
