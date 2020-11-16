import { Route, Switch } from 'react-router-dom';

import { FlexContainer } from './components/containers/flexContainer';
import MainPage from "./pages/MainPage";
import React from "react";

function App() {
    return (
        <FlexContainer>
            <Switch>
                <Route exact path="/" component={MainPage} />
                {/* <Route component={NotFound} /> */}
            </Switch>
        </FlexContainer>
    );
}

export default App;