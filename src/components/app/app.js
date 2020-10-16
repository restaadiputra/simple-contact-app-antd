import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ContactPage, AddContactPage } from 'pages';
import Layout from 'components/layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" component={ContactPage} exact />
          <Route path="/add" component={AddContactPage} exact />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
