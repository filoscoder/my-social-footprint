import { Route, Switch } from 'react-router-dom';

import AuthPage from "./pages/AuthPage";
import AuthRoute from "./routes/AuthRoute";
import { FlexContainer } from './components/containers/flexContainer';
import MainPage from "./pages/MainPage";
import React from "react";

function App() {

    return (
        <MainPage />
    );
}

export default App;