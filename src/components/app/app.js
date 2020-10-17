import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import ScrollToTop from './scroll-to-top';
import { ContactPage, AddContactPage, EditContactPage } from 'pages';
import Layout from 'components/layout';
import store from 'store/configure-store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Switch>
            <Route path="/" component={ContactPage} exact />
            <Route path="/add" component={AddContactPage} exact />
            <Route path="/edit/:id" component={EditContactPage} exact />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
