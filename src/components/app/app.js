import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ContactPage } from 'pages';
import Layout from 'components/layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" component={ContactPage} exact />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
