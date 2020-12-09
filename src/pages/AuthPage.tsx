import { FacebookLoginButton, GoogleLoginButton, InstagramLoginButton } from "react-social-login-buttons";
import React, { useContext } from 'react';

import { Context } from "../lib/store";
import { FlexContainer } from '../components/containers/flexContainer';
import { getAuthCode } from "../lib/api/instagram";
import styled from 'styled-components';

export type AuthPageProps = {
};


const AuthPage: React.FC<AuthPageProps> = ({ }) => {
    const [state, dispatch] = useContext(Context);
    const renderAuthButton = (type: string) => {
        switch (type) {
            case "facebook":
                return (
                    <FacebookLoginButton onClick={handleSocialButton}>
                        <span>Connect with</span>
                    </FacebookLoginButton>
                )
            case "instagram":
                return (
                    <InstagramLoginButton onClick={handleSocialButton}>
                        <span>Connect with</span>
                    </InstagramLoginButton>
                )
            case "youtube":
                return (
                    <GoogleLoginButton onClick={handleSocialButton}>
                        <span>Connect with</span>
                    </GoogleLoginButton>
                )
            default:
                break;
        }
    }

    const handleSocialButton = async () => {
        await getAuthCode();
    }

    return (
        <FlexContainer>
            <Block>
                {
                    renderAuthButton(state.social)
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
