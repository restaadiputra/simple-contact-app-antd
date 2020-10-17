import { cleanup, waitFor, screen, fireEvent } from '@testing-library/react';
import * as antd from 'antd';

import Contact from '../contact';
import { renderWithStoreAndRoute } from 'test/utils';

import * as service from 'services/contact';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const mockGetAllContact = jest.spyOn(service, 'getAllContact');
const mockDeleteContactById = jest.spyOn(service, 'deleteContactById');
const mockHistoryPush = jest.fn();
const mockMessage = jest.spyOn(antd.message, 'error');

const data = [
  {
    id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
    firstName: 'testingfirst',
    lastName: 'testinglast',
    age: 2,
    photo: 'photo.jpg',
  },
];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('render contact', () => {
  test('should render without error', async () => {
    mockGetAllContact.mockImplementation(() => Promise.resolve(data));
    renderWithStoreAndRoute(Contact);
    await waitFor(() => expect(mockGetAllContact).toBeCalledTimes(1));
  });

  test('should show error from server when fetching contact list', async () => {
    mockGetAllContact.mockImplementation(() =>
      Promise.reject({
        response: {
          data: {
            message: 'Error',
          },
        },
      })
    );

    renderWithStoreAndRoute(Contact);
    await waitFor(() => expect(mockGetAllContact).toBeCalledTimes(1));
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(mockMessage).toBeCalledTimes(1);
    expect(mockMessage).toHaveBeenCalledWith('Error');
  });

  test('should show basic error fetching contact list', async () => {
    mockGetAllContact.mockImplementation(() =>
      Promise.reject({ message: 'Error' })
    );

    renderWithStoreAndRoute(Contact);
    await waitFor(() => expect(mockGetAllContact).toBeCalledTimes(1));
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(mockMessage).toBeCalledTimes(1);
    expect(mockMessage).toHaveBeenCalledWith('Something went wrong');
  });
});

describe('add button', () => {
  test('should go to /add if add button on desktop mode is clicked', async () => {
    mockGetAllContact.mockImplementation(() => Promise.resolve(data));
    renderWithStoreAndRoute(Contact, 1000);
    await waitFor(() => expect(mockGetAllContact).toBeCalledTimes(1));

    fireEvent.click(screen.getByTestId('add'));

    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith('/add');
  });

  test('should go to /add if add button on mobile mode is clicked', async () => {
    mockGetAllContact.mockImplementation(() => Promise.resolve(data));
    renderWithStoreAndRoute(Contact);
    await waitFor(() => expect(mockGetAllContact).toBeCalledTimes(1));

    fireEvent.click(screen.getByTestId('add'));

    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith('/add');
  });
});

describe('edit menu', () => {
  test('should got to /edit/{id} if menu button on edit is clicked', async () => {
    mockGetAllContact.mockImplementation(() => Promise.resolve(data));
    renderWithStoreAndRoute(Contact);
    await waitFor(() => expect(mockGetAllContact).toBeCalledTimes(1));

    fireEvent.click(screen.getByTestId('menu'));
    fireEvent.click(screen.queryByTestId('edit'));

    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith(`/edit/${data[0].id}`);
  });
});

describe('delete menu', () => {
  test('should call onDelete if menu button on delete is clicked', async () => {
    mockGetAllContact.mockImplementation(() => Promise.resolve(data));
    mockDeleteContactById.mockImplementation(() =>
      Promise.resolve({ message: 'success' })
    );

    renderWithStoreAndRoute(Contact);
    await waitFor(() => expect(mockGetAllContact).toBeCalledTimes(1));

    fireEvent.click(screen.getByTestId('menu'));
    fireEvent.click(screen.queryByTestId('delete'));

    await waitFor(() =>
      expect(
        screen.getByText('These action cannot be undone')
      ).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Yes'));

    await waitFor(() => expect(mockDeleteContactById).toHaveBeenCalledTimes(1));
    expect(mockDeleteContactById).toHaveBeenCalledWith(data[0].id);
  });

  test('should show error from server when deleting contact data', async () => {
    mockGetAllContact.mockImplementation(() => Promise.resolve(data));
    mockDeleteContactById.mockImplementation(() =>
      Promise.reject({
        response: {
          data: {
            message: 'Error deleting contact',
          },
        },
      })
    );

    renderWithStoreAndRoute(Contact);
    await waitFor(() => expect(mockGetAllContact).toBeCalledTimes(1));

    fireEvent.click(screen.getByTestId('menu'));
    fireEvent.click(screen.queryByTestId('delete'));

    await waitFor(() =>
      expect(
        screen.getByText('These action cannot be undone')
      ).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Yes'));

    await waitFor(() => expect(mockDeleteContactById).toHaveBeenCalledTimes(1));
    expect(mockMessage).toBeCalledTimes(1);
    expect(mockMessage).toHaveBeenCalledWith('Error deleting contact');
  });

  test('should show error from server when deleting contact data', async () => {
    mockGetAllContact.mockImplementation(() => Promise.resolve(data));
    mockDeleteContactById.mockImplementation(() =>
      Promise.reject({
        message: 'Error',
      })
    );

    renderWithStoreAndRoute(Contact);
    await waitFor(() => expect(mockGetAllContact).toBeCalledTimes(1));

    fireEvent.click(screen.getByTestId('menu'));
    fireEvent.click(screen.queryByTestId('delete'));

    await waitFor(() =>
      expect(
        screen.getByText('These action cannot be undone')
      ).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Yes'));

    await waitFor(() => expect(mockDeleteContactById).toHaveBeenCalledTimes(1));
    expect(mockMessage).toBeCalledTimes(1);
    expect(mockMessage).toHaveBeenCalledWith('Something went wrong');
  });
});
