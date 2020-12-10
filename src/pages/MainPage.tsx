import { Route, Switch } from 'react-router-dom';

import FacebookContainer from '../components/containers/FacebookContainer'
import InstagramContainer from '../components/containers/InstagramContainer'
import React from 'react';
import YoutubeContainer from '../components/containers/YoutubeContainer'

export type MainPageProps = {
    theme: "light" | "dark";
    social: "facebook" | "instagram" | "youtube";
};

const MainPage: React.FC<MainPageProps> = ({ social, theme }) => {

    return (
        <Switch>
            <Route path={`/facebook`} component={FacebookContainer} />
            <Route path={`/instagram`} component={InstagramContainer} />
            <Route path={`/youtube`} component={YoutubeContainer} />
            {/* <AuthRoute component={NotFound} /> */}
        </Switch>
    );
}


export default MainPage;
