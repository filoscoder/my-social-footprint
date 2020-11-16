import { NavLink, Route, useLocation } from 'react-router-dom';

import { FlexContainer } from '../components/containers/flexContainer';
import React from 'react';
import styled from 'styled-components';

export type MainPageProps = {};

function MainPage(props: MainPageProps) {
    const location = useLocation();
    const isFloating = ['/', '/map'].indexOf(location.pathname) !== -1;


    return (
        <FlexContainer>

            {/* <Route path={['/']} component={Feed} exact />
            <Route path={['/map']} component={Map} />
            <Route path={['/mypage']} component={MyPage} /> */}
        </FlexContainer>
    );
}

export default MainPage;
