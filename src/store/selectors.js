export const getIsLogged = state => state.auth;

export const getAdverts = state =>
  state.adverts.data.sort((t1, t2) => {
    if (t1.name > t2.name) return 1;
    return -1;
  });

export const getAdvertsLoaded = state => state.adverts.loaded;


export const getUi = state => state.ui