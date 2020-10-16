import React from 'react';
import { render } from '@testing-library/react';
import App from './app';

test('should render without error', () => {
  render(<App />);
});
