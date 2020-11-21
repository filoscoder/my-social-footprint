import { Route, Switch } from 'react-router-dom';

import AuthPage from "./pages/AuthPage";
import AuthRoute from "./routes/AuthRoute";
import { FlexContainer } from './components/containers/flexContainer';
import MainPage from "./pages/MainPage";
import React from "react";

function App() {
    const [auth, setAuth] = React.useState<boolean>(false);
    return (
        <FlexContainer>
            <Switch>
                <AuthRoute exact path="/" component={MainPage} />
                {/* <Route component={NotFound} /> */}
                <Route exact path="/signin" component={AuthPage} />
            </Switch>
        </FlexContainer>
    );
}

export default App;