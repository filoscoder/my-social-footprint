import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import Indicator from '../components/common/Indicator';
import { checkLoginSession } from '../lib/utils';

interface AuthRouteProps {
  exact?: boolean;
  path: string;
  component: any;
  social: string;
}
const AuthRoute: React.FC<AuthRouteProps> = ({ exact = false, path, component, social }) => {

  const [isLogged, setLogin] = useState(false);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setWaiting(false);
    }, 1000);


    (async function () {
      const sessionState = await checkLoginSession(social);
      return setLogin(sessionState);
    })();

  }, [social])

  return (
    waiting ?
      <Indicator />
      :
      isLogged ?
        <Route exact={exact} path={path} component={component} />
        :
        <Redirect to={`/signin/${social}`} />
  )
}

export default AuthRoute;
