import React from 'react';
import { render } from '@testing-library/react';
import Contact from '../contact';

test('should render without error', () => {
  const { getByText } = render(<Contact />);

  expect(getByText(/contact/i)).toBeInTheDocument();
});
