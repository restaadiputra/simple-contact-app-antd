import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ContactPage, AddContactPage, EditContactPage } from 'pages';
import Layout from 'components/layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" component={ContactPage} exact />
          <Route path="/add" component={AddContactPage} exact />
          <Route path="/edit/:id" component={EditContactPage} exact />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
