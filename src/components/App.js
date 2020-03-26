import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as Pages from '../pages';
import Modal from 'containers/Common/Modal';

function App() {
  return (
    <>
      <Switch>
        <Route
          exact
          path='/'
          render={() => <Pages.Home/>}
        />
        <Route
          path='/sign'
          render={() => <Pages.Sign/>}
        />
        <Route
          path='/intro'
          render={() => <Pages.Intro/>}>
        </Route>
        <Route
          path='/bamboo'
          render={() => <Pages.Bamboo/>}
        />
        <Route
          path='/bamboo-write'
          render={() => <Pages.BambooWrite/>}
        />
        <Route
          path='/bamboo-admin'
          render={() => <Pages.BambooAdmin/>}
        />
        <Route
          path='/team-building'
          render={() => <Pages.TeamBuilding/>}
        />
        <Route
          path='/team-building-interview'
          render={() => <Pages.TeamBuildingInterview/>}
        />
        <Route
          path='/notfound'
          render={() => <Pages.NotFound />}
        />
        <Redirect to='/notfound' />
      </Switch>
      <Modal />
    </>
  );
}

export default App;
