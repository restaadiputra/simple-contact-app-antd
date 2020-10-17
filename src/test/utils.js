import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import reducers from 'store/combine-reducers';

export const renderWithStore = (
  component,
  initialState = {},
  store = createStore(
    reducers,
    {
      contact: initialState.contact || [],
    }
  )
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

export const renderWithRouterMatch = (
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
