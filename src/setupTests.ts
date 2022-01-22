// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

if (typeof globalThis.TextEncoder === 'undefined') {
  const { TextEncoder } = require('util');
  globalThis.TextEncoder = TextEncoder;
}

if (typeof globalThis.TextDecoder === 'undefined') {
  const { TextDecoder } = require('util');
  globalThis.TextDecoder = TextDecoder;
}

if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = { ...require('crypto') };
  // @see https://github.com/nodejs/node/blob/dae283d96fd31ad0f30840a7e55ac97294f505ac/doc/api/webcrypto.md
  (globalThis.crypto as any).subtle = require('crypto').webcrypto.subtle;
}
