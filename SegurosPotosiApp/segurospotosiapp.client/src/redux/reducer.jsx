import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './actions';

const loginInitialState = {
  data: null,
  isLoading: false,
  error: null
};

const reducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null
      };
    default:
      return state;
  }
};

export default reducer;
