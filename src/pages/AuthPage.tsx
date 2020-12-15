import { FacebookLoginButton, GoogleLoginButton, InstagramLoginButton } from "react-social-login-buttons";
import React, { useContext, useState } from 'react';
import { login, logout } from '../lib/api/facebook'

import { FlexContainer } from '../components/containers/flexContainer';
import { getAuthCode } from "../lib/api/instagram";
import styled from 'styled-components';

export type AuthPageProps = {
};


const AuthPage: React.FC<AuthPageProps> = ({ }) => {
    const currentTab = window.location.pathname.split('/')[1]

    const renderAuthButton = (type: string) => {
        switch (type) {
            case "facebook":
                return (
                    <>
                        <FacebookLoginButton onClick={handleSocialButton}>
                            <span>Continue with</span>
                        </FacebookLoginButton>
                        <button onClick={logout}>Log out</button>
                    </>
                )
            case "instagram":
                return (
                    <InstagramLoginButton onClick={handleSocialButton}>
                        <span>Connect with Facebook</span>
                    </InstagramLoginButton>
                )
            case "youtube":
                return (
                    <GoogleLoginButton onClick={handleSocialButton}>
                        <span>Continue with</span>
                    </GoogleLoginButton>
                )
            default:
                break;
        }
    }

    const handleSocialButton = async () => {
        try {
            switch (currentTab) {
                case 'facebook':
                    await login();
                    break;
                case 'instagram':
                    await login();
                    break;

                default:
                    console.log(currentTab)
                    break;
            }
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <FlexContainer>
            <Block>
                {
                    renderAuthButton(currentTab)
                }
            </Block>
        </FlexContainer>
    )
}
const Block = styled.div`
    height: 500px;
    display: flex;
    align-items: center;
`;

export default AuthPage;
