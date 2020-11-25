import React, { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';

import MainPage from "../pages/MainPage";

interface RouteProps {
  component: any;
  path: string;
  exact: boolean;
}
function AuthRoute({ component, path, exact }: RouteProps) {
  const [user, setUser] = React.useState<boolean>(false);

  // useEffect(() => {
  //   const unsubscribe = firebase.getAuth().onAuthStateChanged((auth: any) => {
  //     setUser(Boolean(auth));
  //   });

  //   return unsubscribe;
  // }, [user]);

  if (!user && path === '/')
    return <Redirect to={'/signin'} />;

  return <Route exact={exact} path={path} component={component} />;
}

export default AuthRoute;
