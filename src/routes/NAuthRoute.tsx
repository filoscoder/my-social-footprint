import * as React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { checkLoginSession } from '../lib/utils';

interface NAuthRouteProps {
    exact: boolean;
    path: string;
    component: any;
    social: string;
}

function NAuthRoute({ exact, path, component, social }: NAuthRouteProps) {
    const [isLogged, setLogin] = useState<boolean>(false);

    useEffect(() => {
        const sessionState = checkLoginSession(social);
        setLogin(sessionState);
    }, [isLogged, social])

    return (
        isLogged ? (
            <Redirect to={`/${social}`} />
        ) : (
                <Route exact={exact} path={path} component={component} />
            )
    );
}

export default NAuthRoute;
