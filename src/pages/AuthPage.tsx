/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink, Route, useLocation } from 'react-router-dom';

import { FlexContainer } from '../components/containers/flexContainer';
import { InstagramLoginButton } from "react-social-login-buttons";
import OauthPopup from 'react-oauth-popup';
import React from 'react';
import axios from 'axios';
import { socialAuth } from '../lib/api/socialAuth'
import styled from 'styled-components';

export type AuthPageProps = {
    type: string;
};




function AuthPage(props: AuthPageProps) {
    const { type = "instagram" } = props;
    const location = useLocation();
    const clientId = "1464734727059421";
    const redirectUri = "http://localhost:3000/";
    const apiUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code&state=1`;

    const onCode = () => {
        console.log("wooooo a code");
        console.log("alright! the URLSearchParams interface from the popup url");
    }
    const onClose = () => console.log("closed!");

    return (
        <FlexContainer>
            <Block>
                <OauthPopup
                    title={"Insta"}
                    width={500}
                    height={600}
                    url={apiUrl}
                    onCode={onCode}
                    onClose={onClose}
                >
                    <InstagramLoginButton onClick={() => console.log(type)} />
                </OauthPopup>
            </Block>
        </FlexContainer>
    );
}

const Block = styled.div`

`;

export default AuthPage;
