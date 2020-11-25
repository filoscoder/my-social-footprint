import React, { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';

import MainPage from "../pages/MainPage";
import UserContext from '../lib/context'

interface RouteProps {
  component: any;
  path: string;
  exact: boolean;
}
function AuthRoute({ component, path, exact }: RouteProps) {
  const [user, setUser] = React.useState<boolean>(false);


  return (
    <UserContext.Consumer>
      {token => {
        console.log(token);

        return (
          token.token ?
            <Route exact={exact} path={path} component={component} />
            :
            <Redirect to={'/signin'} />
        )
      }
      }
    </UserContext.Consumer>
  )
}

export default AuthRoute;
