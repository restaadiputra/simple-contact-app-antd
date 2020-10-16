import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from './loading-spinner';

test('should render without error', () => {
  render(<LoadingSpinner />);
});
