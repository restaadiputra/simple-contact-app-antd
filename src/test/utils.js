import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
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
