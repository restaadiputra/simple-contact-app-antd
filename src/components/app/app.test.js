import React from 'react';
import { render } from '@testing-library/react';
import App from './app';

afterAll(() => {
  jest.clearAllMocks();
});

test('should render without error', () => {
  window.scrollTo = jest.fn()
  render(<App />);
});
