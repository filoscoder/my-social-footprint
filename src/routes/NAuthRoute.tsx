import * as React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { checkLoginSession } from '../lib/utils';

interface NAuthRouteProps {
    exact: boolean;
    path: string;
    component: any;
}

function NAuthRoute({ exact, path, component }: NAuthRouteProps) {
    const currentTab = window.location.pathname.split('/')[1]

    const [social] = useState(currentTab);
    const [isLogged, setLogin] = useState<boolean>(false);

    useEffect(() => {
        (async function () {
            const sessionState = await checkLoginSession(social);
            return setLogin(sessionState);
        })();

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
