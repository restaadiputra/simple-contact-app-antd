import { screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as antd from 'antd';

import EditContactPage from './edit-contact';
import { renderWithRouterMatch } from 'test/utils';
import * as service from 'services/contact';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const mockUpdateContactById = jest.spyOn(service, 'updateContactById');
const mockGetContactById = jest.spyOn(service, 'getContactById');
const mockMessage = jest.spyOn(antd.message, 'error');
const mockHistoryPush = jest.fn();

const data = {
  id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
  firstName: 'testingfirst',
  lastName: 'testinglast',
  age: 2,
  photo: 'photo.jpg',
};

const newData = {
  firstName: 'testingfirstnew',
  lastName: 'testinglastnew',
  age: '23',
  photo: 'photo.jpgnew',
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test('should go back to contact list if cancel button was clicked', async () => {
  mockGetContactById.mockImplementation(() => Promise.resolve(data));

  renderWithRouterMatch(EditContactPage, {
    route: `/edit/${data.id}`,
    path: '/edit/:id',
  });

  await waitFor(() => expect(mockGetContactById).toBeCalledTimes(1));
  userEvent.click(screen.getAllByRole('button')[1]);

  expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  expect(mockHistoryPush).toHaveBeenCalledWith('/');
});

test('should render form without error', async () => {
  mockGetContactById.mockImplementation(() => Promise.resolve(data));
  mockUpdateContactById.mockImplementation(() => Promise.resolve(newData));

  renderWithRouterMatch(EditContactPage, {
    route: `/edit/${data.id}`,
    path: '/edit/:id',
  });

  await waitFor(() => expect(mockGetContactById).toBeCalledTimes(1));

  userEvent.type(screen.getByPlaceholderText(/first name/i), 'new', {
    allAtOnce: true,
  });
  userEvent.type(screen.getByPlaceholderText(/last name/i), 'new', {
    allAtOnce: true,
  });
  userEvent.type(screen.getByPlaceholderText(/age/i), '3', {
    allAtOnce: true,
  });

  userEvent.type(screen.getByPlaceholderText(/photo/i), 'new', {
    allAtOnce: true,
  });

  userEvent.click(screen.getAllByRole('button')[0]);

  await waitFor(() => expect(mockUpdateContactById).toHaveBeenCalledTimes(1));

  expect(mockUpdateContactById).toBeCalledWith(data.id, newData);
});

test('should show error from server when fetching contact data', async () => {
  const errMessage = `data id ${data.id} is not in contact list`;
  mockGetContactById.mockImplementation(() =>
    Promise.reject({
      response: {
        data: {
          message: errMessage,
        },
      },
    })
  );

  renderWithRouterMatch(EditContactPage, {
    route: `/edit/${data.id}`,
    path: '/edit/:id',
  });

  await waitFor(() => expect(mockGetContactById).toBeCalledTimes(1));
  expect(screen.getByText(errMessage)).toBeInTheDocument();
  expect(mockMessage).toBeCalledTimes(1);
  expect(mockMessage).toHaveBeenCalledWith(errMessage);
});

test('should show basic error when fetching contact data', async () => {
  const errMessage = `Something went wrong`;
  mockGetContactById.mockImplementation(() =>
    Promise.reject({ message: 'Error' })
  );

  renderWithRouterMatch(EditContactPage, {
    route: `/edit/${data.id}`,
    path: '/edit/:id',
  });

  await waitFor(() => expect(mockGetContactById).toBeCalledTimes(1));
  expect(screen.getByText(errMessage)).toBeInTheDocument();
  expect(mockMessage).toBeCalledTimes(1);
  expect(mockMessage).toHaveBeenCalledWith(errMessage);
});

test('should show error from server when updating contact data', async () => {
  mockGetContactById.mockImplementation(() => Promise.resolve(data));

  const errMessage = `update failed`;
  mockUpdateContactById.mockImplementation(() =>
    Promise.reject({
      response: {
        data: {
          message: errMessage,
        },
      },
    })
  );

  renderWithRouterMatch(EditContactPage, {
    route: `/edit/${data.id}`,
    path: '/edit/:id',
  });

  await waitFor(() => expect(mockGetContactById).toBeCalledTimes(1));

  userEvent.click(screen.getAllByRole('button')[0]);
  await waitFor(() => expect(mockUpdateContactById).toHaveBeenCalledTimes(1));
  expect(screen.getByText(errMessage)).toBeInTheDocument();
  expect(mockMessage).toBeCalledTimes(1);
  expect(mockMessage).toHaveBeenCalledWith(errMessage);
});

test('should show basic error when updating contact data', async () => {
  mockGetContactById.mockImplementation(() => Promise.resolve(data));

  const errMessage = `Something went wrong`;
  mockUpdateContactById.mockImplementation(() =>
    Promise.reject({ message: 'Error' })
  );

  renderWithRouterMatch(EditContactPage, {
    route: `/edit/${data.id}`,
    path: '/edit/:id',
  });

  await waitFor(() => expect(mockGetContactById).toBeCalledTimes(1));

  userEvent.click(screen.getAllByRole('button')[0]);
  await waitFor(() => expect(mockUpdateContactById).toHaveBeenCalledTimes(1));
  expect(mockMessage).toBeCalledTimes(1);
  expect(mockMessage).toHaveBeenCalledWith(errMessage);
});
