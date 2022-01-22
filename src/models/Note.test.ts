import { calculateId } from './Note';

test('calculateId', async () => {
  const id = await calculateId({ text: 'this is body of note', parentId: 'parent' });
  expect(id).toHaveLength(64);
  expect(id).toBe('96216bdd920743146318e8652ee284d6ab18dd50b2d97f436a10890f3069b74e');
});
