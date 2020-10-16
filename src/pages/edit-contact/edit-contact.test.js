import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

import EditContactPage from './edit-contact';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const mockHistoryPush = jest.fn();

const renderWithRouterMatch = (
  ui,
  {
    path = '/',
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  return {
    ...render(
      <Router history={history}>
        <Route path={path} component={ui} />
      </Router>
    ),
  };
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test('should render form without error', () => {
  renderWithRouterMatch(EditContactPage, {
    route: '/edit/testingid',
    path: '/edit/:id',
  });

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

test('should go back to contact list if cancel button was clicked', () => {
  renderWithRouterMatch(EditContactPage, {
    route: '/edit/testingid',
    path: '/edit/:id',
  });

  userEvent.click(screen.getAllByRole('button')[0]);

  expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  expect(mockHistoryPush).toHaveBeenCalledWith('/');
});
