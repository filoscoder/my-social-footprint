import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { checkLoginSession, setTokenToSession } from '../lib/utils';

import Indicator from '../components/common/Indicator';
import { checkLoginState } from '../lib/api/facebook';

interface AuthRouteProps {
  exact: boolean;
  path: string;
  component: any;
}
const AuthRoute: React.FC<AuthRouteProps> = ({ exact, path, component }) => {
  const currentTab = window.location.pathname.split('/')[1]

  const [social] = useState(currentTab);
  const [isLogged, setLogin] = useState(false);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setWaiting(false);
    }, 1000);


    (async function () {
      if (social === 'facebook') {
        const response = await checkLoginState();
        return response && setLogin(true);
      }
      if (social === 'instagram') {
        const sessionState = checkLoginSession(social);
        if (sessionState) {
          return setLogin(true);
        } else {
          const token = await setTokenToSession(social);
          if (token !== undefined) {
            return setLogin(true);
          }
        }
      }
      return setLogin(false);
    })();

  }, [social])

  return (
    waiting ?
      <Indicator />
      :
      isLogged ?
        <Route exact={exact} path={path} component={component} />
        :
        <Redirect to={`/${social}/signin`} />
  )
}

export default AuthRoute;
