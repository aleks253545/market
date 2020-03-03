import React from 'react';

import s from './NomePage.module.scss';
import SignIn from '../../containers/SignIn';
import SignUp from '../../containers/SignUp';
import WelcomingWindow from './WelcomingWindow/WelcomingWindow';
import { Route, Redirect } from 'react-router-dom';

function HomePage() {
  return (
    <main className = {s.main}>
      <Route path='/home'>
        <Redirect to='/home/sign-in'></Redirect>
      </Route>
      <Route path='/home/sign-in' component={SignIn}/>
      <Route path='/home/sign-up' component={SignUp}/>
      <Route path='/home/welcoming' component={WelcomingWindow}/>
    </main>
  )
}
export default HomePage;