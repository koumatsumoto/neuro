import { render } from '@testing-library/react';
import React from 'react';
import App from './App';

test('render should be completed without an error', () => {
  const view = render(<App />);
  expect(view.container).toBeTruthy();
});
