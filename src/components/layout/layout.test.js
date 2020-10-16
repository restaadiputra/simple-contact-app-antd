import React from 'react';
import { render } from '@testing-library/react';
import Layout from './layout';

test('should render children', () => {
  const children = <div data-testid="test" />;
  const { container, getByTestId } = render(<Layout>{children}</Layout>);
  expect(getByTestId('test')).toBeInTheDocument()
  expect(container.firstChild).toMatchSnapshot();
});
