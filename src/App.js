import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import StartPage from './containers/StartPage';
import EmptyPage from './containers/EmptyPage';
import Login from './containers/Login';
import Game from './containers/Game';
import { url } from './constants';
import history from './history';
import MainLayout from './components/layout/MainLayout';

const App = () => {
  return (
    <Router history={history}>
      <MainLayout>
        <Switch>
          <Route exact path='/' component={StartPage} />
          <Route path={`${url.login}/:id`} component={Login} />
          <Route path={`${url.game}/:id`} component={Game} />
          <Route path='*' component={EmptyPage} />
        </Switch>
      </MainLayout>
    </Router>
  );
};

export default App;
