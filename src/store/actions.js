import { getAdvertsLoaded, getAdvert, getTagsLoaded } from './selectors';
import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_LOGOUT,
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    ADVERTS_LOADED_ERROR,
    ADVERTS_DETAIL_SUCCESS,
    ADVERTS_CREATED_REQUEST,
    ADVERTS_CREATED_SUCCESS,
    ADVERTS_CREATED_ERROR,
    ADVERTS_DELETED_REQUEST,
    ADVERTS_DELETED_SUCCESS,
    ADVERTS_DELETED_ERROR,
    TAGS_LOADED_REQUEST,
    TAGS_LOADED_SUCCESS,
    TAGS_LOADED_ERROR
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
    return async function (dispatch, getState, { api, history }) {
        dispatch(authLoginRequest());
        try {
          console.log(credentials);
          console.log(api);
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
  

  export const advertsDetailSuccess = advert => {
    return {
      type: ADVERTS_DETAIL_SUCCESS,
      payload: advert,
    };
  };
  
  export const advertsDetailAction = advertId => {
    return async function (dispatch, getState, { api, history }) {
      
      const advertLoaded = getAdvert(getState(), advertId);
      //console.log(advertLoaded);
      if (advertLoaded) {
        return;
      }
      // dispatch(tweetsDetailRequest());
      try {
        const advert = await api.adverts.getAdvert(advertId);
        dispatch(advertsDetailSuccess(advert));
        return advert;
      } catch (error) {
        // dispatch(tweetsDetailFailure(error));
      } 
    };
  };
  
  export const advertsCreatedRequest = () => {
    return {
      type: ADVERTS_CREATED_REQUEST,
    };
  };
  
  export const advertsCreatedSuccess = advert => {
    return {
      type: ADVERTS_CREATED_SUCCESS,
      payload: advert,
    };
  };
  
  export const advertsCreatedError = error => {
    return {
      type: ADVERTS_CREATED_ERROR,
      payload: error,
      error: true,
    };
  };
  
  export const advertsCreateAction = advert => {
    return async function (dispatch, getState, { api, history }) {
      dispatch(advertsCreatedRequest());
      try {
        const { id: advertId} = await api.adverts.createAdvert(advert);
        const createdAdvert = await api.adverts.getAdvert(advertId);
        dispatch(advertsCreatedSuccess(createdAdvert));
        // redirect with history
        //history.push('/');
        return createdAdvert;
      } catch (error) {
        dispatch(advertsCreatedError(error));
      }
    };
  };

  export const advertsDeletedRequest = () => {
    return {
      type: ADVERTS_DELETED_REQUEST,
    };
  };
  
  export const advertsDeletedSuccess = () => {
    return {
      type: ADVERTS_DELETED_SUCCESS,
    };
  };
  
  export const advertsDeletedError = error => {
    return {
      type: ADVERTS_DELETED_ERROR,
      payload: error,
      error: true,
    };
  };
  
  export const advertsDeletedAction = advertId => {
    return async function (dispatch, getState, {api, history}) {
      dispatch(advertsDeletedRequest())
      try {
        await api.adverts.deleteAdvert(advertId);
        dispatch(advertsDeletedSuccess());
        const { from } = history.location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (error) {
        dispatch(advertsDeletedError(error));
      }
    }
  }

  // tags

  export const tagsLoadedRequest = () => {
    return {
      type: TAGS_LOADED_REQUEST,
    };
  };
  
  export const tagsLoadedSuccess = tags => {
    return {
      type: TAGS_LOADED_SUCCESS,
      payload: tags,
    };
  };
  
  export const tagsLoadedError = error => {
    return {
      type: TAGS_LOADED_ERROR,
      payload: error,
      error: true,
    };
  };
  
  export const tagsLoadAction = () => {
    return async function (dispatch, getState, { api }) {
      const tagsLoaded = getTagsLoaded(getState());
      if (tagsLoaded) {
        return;
      }
      dispatch(tagsLoadedRequest());
      try {
        const tags = await api.adverts.getTags();
        dispatch(tagsLoadedSuccess(tags));
      } catch (error) {
        dispatch(tagsLoadedError(error));
      }
    };
  };
  