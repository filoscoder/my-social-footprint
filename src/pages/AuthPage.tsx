import { FacebookLoginButton, GoogleLoginButton, InstagramLoginButton } from "react-social-login-buttons";

import { FlexContainer } from '../components/containers/flexContainer';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { Spin } from 'antd';
import { getAuthCode } from "../lib/api/instagram";
import styled from 'styled-components';

export type AuthPageProps = {
    type: string;
    loading: boolean;
    setLoading: (state: boolean) => void;
};


const AuthPage: React.FC<AuthPageProps> = ({ type = "instagram", loading, setLoading }) => {

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

        setLoading(true);
        await getAuthCode();
    }

    return (
        <FlexContainer>
            <Block>
                {loading ?
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                    :
                    (renderAuthButton(type))
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
