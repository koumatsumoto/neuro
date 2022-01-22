import { hashHex } from './crypto';

test('hashHex', async () => {
  const hash = await hashHex('text');
  expect(hash).toHaveLength(64);
  expect(hash).toBe('982d9e3eb996f559e633f4d194def3761d909f5a3b647d1a851fead67c32c9d1');
});
