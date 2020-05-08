import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as Pages from '../pages';
import Modal from 'containers/Common/Modal';
import SignModal from 'containers/Sign';
import TokenVerification from 'lib/Token/TokenVerification';

function App() {
  return (
    <>
      <Switch>
        <Route
          exact
          path='/'
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
          path='/sign'
          component={() => <Pages.Sign/>}
        />
        <Route
          path='/intro'
          render={() => <Pages.Intro/>}>
        </Route>
        
        <Route
          path='/team-building'
          render={() => <Pages.TeamBuilding/>}
        />
        <Route
          path='/inquiry'
          render={() => <Pages.Inquiry/>}
        />
        <Route
          path='/inquiry-admin'
          render={() => <Pages.InquiryAdmin/>}
        />
        <Route
          path='/inquiry-write'
          render={() => <Pages.InquiryWrite/>}
        />
        <Route
          path='/inquiry-detail'
          render={() => <Pages.InquiryDetail/>}
        />
        <Route
          path='/myinfo'
          render={() => TokenVerification() !== 'empty' ? <Pages.MyInfo/> : <Redirect to={'/'} />}
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
      <SignModal />
    </>
  );
}

export default App;
