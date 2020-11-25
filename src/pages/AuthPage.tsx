/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink, Route, useLocation } from 'react-router-dom';
import React, { useContext } from 'react';

import { FlexContainer } from '../components/containers/flexContainer';
import { InstagramLoginButton } from "react-social-login-buttons";
import OauthPopup from 'react-oauth-popup';
import UserContext from "../lib/context"
import axios from 'axios';
import styled from 'styled-components';

export type AuthPageProps = {
    type: string;
};


function AuthPage(props: AuthPageProps) {
    const userContext = useContext(UserContext);


    const { type = "instagram" } = props;
    const clientId = "1464734727059421";
    const redirectUri = "https://my-social-footprint.netlify.app/";
    const apiUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code&state=1`;

    const onCode = (code: any, params: any) => {
        console.log("wooooo a code", code);
        console.log("alright! the URLSearchParams interface from the popup url", params);
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
    )
}
const Block = styled.div`

`;

export default AuthPage;
