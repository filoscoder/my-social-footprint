import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { checkLoginSession, setTokenToSession } from '../lib/utils';

import Indicator from '../components/common/Indicator';

interface AuthRouteProps {
  exact: boolean;
  path: string;
  component: any;
  social: string;
}
const AuthRoute: React.FC<AuthRouteProps> = ({ exact, path, component, social }) => {
  const [isLogged, setLogin] = useState(false);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const sessionState = checkLoginSession(social);

    setTimeout(() => {
      setWaiting(false);
    }, 1000);

    (async function () {
      if (sessionState) {
        setLogin(true);
      } else {
        const token = await setTokenToSession(social);
        if (token !== undefined) {
          return setLogin(true);
        } else {
          setLogin(false);
        }
      }
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
