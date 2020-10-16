import React from 'react';
import { screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddContactPage from './add-contact';
import { renderWithStore } from 'test/utils';
import * as service from 'services/contact';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const mockCreateContact = jest.spyOn(service, 'createContact');
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test('should go back to contact list if cancel button was clicked', () => {
  renderWithStore(<AddContactPage />);

  userEvent.click(screen.getAllByRole('button')[1]);

  expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  expect(mockHistoryPush).toHaveBeenCalledWith('/');
});

test('should push history to / if create contact is success', async () => {
  mockCreateContact.mockImplementation(() => Promise.resolve({ message: "Success" }));
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

  userEvent.click(screen.getAllByRole('button')[0]);

  await waitFor(() => expect(mockCreateContact).toHaveBeenCalledTimes(1));

  expect(mockCreateContact).toHaveBeenCalledWith({
    firstName: 'first',
    lastName: 'last',
    age: '10',
    photo: undefined,
  });

  expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  expect(mockHistoryPush).toHaveBeenCalledWith('/');
});

test('should show error from server respond if rejected', async () => {
  const errMessage = "Email required"
  mockCreateContact.mockImplementation(() =>
    Promise.reject({
      response: {
        data: {
          message: errMessage,
        },
      },
    })
  );
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

  userEvent.click(screen.getAllByRole('button')[0]);

  await waitFor(() => expect(mockCreateContact).toHaveBeenCalledTimes(1));
  expect(screen.getByText(errMessage)).toBeInTheDocument();
});

