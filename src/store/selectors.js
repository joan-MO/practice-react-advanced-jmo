export const getIsLogged = state => state.auth;

export const getAdverts = state =>
  state.adverts.data.sort((t1, t2) => {
    if (t1.createdAt < t2.createdAt) return 1;
    return -1;
  });

export const getAdvertsLoaded = state => state.adverts.loaded;

export const getAdvert = (state, advertId) => {
  //console.log(state.adverts.data.find(advert => advert.id === advertId));
  return state.adverts.data.find(advert => advert.id === advertId)
  
} 


export const getUi = state => state.ui