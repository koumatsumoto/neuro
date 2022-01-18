import { render } from '@testing-library/react';
import React from 'react';
import { App } from './App';
import { RootContainer } from './Containers';

test('render should be completed without an error', () => {
  const view = render(
    <RootContainer>
      <App />
    </RootContainer>,
  );
  expect(view.container).toBeTruthy();
});
