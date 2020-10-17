import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Context as ResponsiveContext } from 'react-responsive';

import reducers from 'store/combine-reducers';

export const renderWithStore = (
  component,
  initialState = {},
  store = createStore(reducers, {
    contact: initialState.contact || [],
  })
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

export const renderWithStoreAndRoute = (
  component,
  width,
  {
    path = '/',
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
  initialState = {},
  store = createStore(reducers, {
    contact: initialState.contact || [],
  })
) => {
  return {
    ...render(
      <ResponsiveContext.Provider value={{ width: width || 640 }}>
        <Provider store={store}>
          <Router history={history}>
            <Route path={path} component={component} />
          </Router>
        </Provider>
      </ResponsiveContext.Provider>
    ),
  };
};
