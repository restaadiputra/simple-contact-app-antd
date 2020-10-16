import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddContactPage from './add-contact';
import { renderWithStore } from 'test/utils';


afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test('should go back to contact list if cancel button was clicked', () => {
  renderWithStore(<AddContactPage />);

  userEvent.click(screen.getAllByRole('button')[0]);

  expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  expect(mockHistoryPush).toHaveBeenCalledWith('/');
});

test('should render form without error', () => {
  renderWithStore(<AddContactPage />);

  userEvent.type(screen.getByPlaceholderText(/first name/i), 'first', {
    allAtOnce: true,
  });
  userEvent.type(screen.getByPlaceholderText(/last name/i), 'last', {
    allAtOnce: true,
  });
  userEvent.type(screen.getByPlaceholderText(/age/i), '10', {
    allAtOnce: true,
  });

  userEvent.click(screen.getAllByRole('button')[1]);
});


