import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotFound from './not-found';


const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test('should render without error', () => {
  render(<NotFound />);
  expect(screen.getByText('404')).toBeInTheDocument();
  expect(screen.getByText('Sorry, the page you visited does not exist.')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button'));

  expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  expect(mockHistoryPush).toHaveBeenCalledWith('/');
});
