import { getAdvertsLoaded } from './selectors';
import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_LOGOUT,
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    ADVERTS_LOADED_ERROR
  } from './types';
  

  export const authLoginRequest = () => {
    return {
      type: AUTH_LOGIN_REQUEST,
    };
  };
  
  export const authLoginSuccess = () => {
    return {
      type: AUTH_LOGIN_SUCCESS,
    };
  };
  
  export const authLoginError = error => {
    return {
      type: AUTH_LOGIN_ERROR,
      payload: error,
      error: true,
    };
  };
  

export const loginAction = credentials => {
    return async function (dispatch, { api, history }) {
        dispatch(authLoginRequest());
        try {
          await api.auth.login(credentials);
          dispatch(authLoginSuccess());

          const { from } = history.location.state || { from: { pathname: '/' } };
          history.replace(from);
        } catch (error) {
          dispatch(authLoginError(error));
        }
    }   
}

export const authLogout = () => {
    return {
      type: AUTH_LOGOUT,
    };
};

export const advertsLoadedRequest = () => {
    return {
      type: ADVERTS_LOADED_REQUEST,
    };
  };
  
  export const advertsLoadedSuccess = adverts => {
    return {
      type: ADVERTS_LOADED_SUCCESS,
      payload: adverts,
    };
  };
  
  export const advertsLoadedError = error => {
    return {
      type: ADVERTS_LOADED_ERROR,
      payload: error,
      error: true,
    };
  };
  
  export const advertsLoadAction = () => {
    return async function (dispatch, getState, { api }) {
      const advertsLoaded = getAdvertsLoaded(getState());
      if (advertsLoaded) {
        return;
      }
  
      dispatch(advertsLoadedRequest());
      try {
        const adverts = await api.adverts.getAdverts();
        dispatch(advertsLoadedSuccess(adverts));
      } catch (error) {
        dispatch(advertsLoadedError(error));
      }
    };
  };
  
  
  
  