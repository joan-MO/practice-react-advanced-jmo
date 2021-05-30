import { tags, initialState } from './reducers';

describe('tags', () => {
  test('should manage ANY action', () => {
    const state = initialState.tags;
    const action = { type: 'ANY' };
    const nextState = tags(state, action);
    expect(nextState).toBe(state);
  })
});
