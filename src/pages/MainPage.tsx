/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink, Route, useLocation } from 'react-router-dom';

import { FlexContainer } from '../components/containers/flexContainer';
import React from 'react';
import styled from 'styled-components';

export type MainPageProps = {};

function MainPage(props: MainPageProps) {
    const location = useLocation();


    return (
        <FlexContainer>

            {/* <Route path={['/']} component={Feed} exact />
            <Route path={['/map']} component={Map} />
            <Route path={['/mypage']} component={MyPage} /> */}
            <div>
                {"Header"}
            </div>
            <div>
                {/* {photos.map(i => {
                    console.log(i)
                    return (
                        <img alt={i.caption} src={i.thumbnailUrl} />
                    )
                })} */}
            </div>
        </FlexContainer>
    );
}

export default MainPage;
