import { render } from '@testing-library/react';
import React from 'react';
import { App } from './App';
import { AppRootContainer } from './Containers';

test('render should be completed without an error', () => {
  const view = render(
    <AppRootContainer>
      <App />
    </AppRootContainer>,
  );
  expect(view.container).toBeTruthy();
});
