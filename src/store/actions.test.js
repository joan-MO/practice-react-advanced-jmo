import { tagsLoadedSuccess, advertsDeletedAction } from './actions';
import {
    ADVERTS_DELETED_ERROR,
    TAGS_LOADED_SUCCESS
} from './types';

describe('tagsLoadedSuccess', () => {
    test('should return a TAGS_LOADED_SUCCESS action', () => {
      const tags = 'tags';
      const expectedAction = { type: TAGS_LOADED_SUCCESS, payload: tags };
      const result = tagsLoadedSuccess(tags);
      expect(result).toEqual(expectedAction);
    });
});
  
describe('advertsDeletedAction', () => {
    describe('when deleteAdvert api resolves', () => {
        const advertId ='1'
        const action = advertsDeletedAction(advertId);
        const dispatch = jest.fn();
        const getState = () => {};
        const error = 'error';
        const api = {
          adverts: { deleteAdvert: jest.fn()},
        };

        test('should dispatch an ADVERTS_DELETED_ERROR action', async () => {
          api.adverts.deleteAdvert.mockRejectedValue(error);
          await action(dispatch, getState, { api });
          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: ADVERTS_DELETED_ERROR,
            payload: error,
            error: true,
          });
        });
    
      
    });
})
