import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { advertsDeletedAction } from './actions';

const createStore = extraArgument => state => {
  const middleware = [thunk.withExtraArgument(extraArgument)];
  const mockStore = configureStore(middleware);
  const store = mockStore(state);
  return store;
};

describe('advertsDeletedAction', () => {
  describe('when deleteAdvert api resolves', () => {
    const history = {
      location: {},
      push: jest.fn()
    };
    const api = {
      adverts: { deleteAdvert: jest.fn().mockResolvedValue() },
    };

    const store = createStore({ api, history })();

    test('should be called with id in advertsDeletedAction ', async () => {
      const id = 1;
      await store.dispatch(advertsDeletedAction(id));
      expect(api.adverts.deleteAdvert).toBeCalledWith(id);
    });
  });
});
