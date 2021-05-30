import { getAdverts } from './selectors';

describe('getAdverts', () => {
  const data = [
    { updatedAt: '25/02/2020', id: 'ad3fgbvb3' },
  ];
  test('should return all adverts', () => {
    const result = getAdverts({ adverts: { data } });
    expect(result).toHaveLength(data.length);
  });
});
