import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Pessoa from './pages/Pessoa';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/pessoas" component={Pessoa} />
        <Redirect from="/" to="pessoas" />
      </Switch>
    </BrowserRouter>
  );
}