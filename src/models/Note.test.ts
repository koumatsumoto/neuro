import { calculateId } from './Note';

test('calculateId', async () => {
  const id = await calculateId('this is body of note', 'parentId');
  expect(id).toHaveLength(64);
  expect(id).toBe('5c35e8168d14e9e2f0a6de061d76f03b0e8aaace7cd061b44e5e83a4999fa8cb');
});
