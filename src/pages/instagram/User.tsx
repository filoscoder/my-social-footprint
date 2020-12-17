import { IgAccountType, IgUserType } from './types';

import Avatar from 'antd/lib/avatar/avatar';
import { FlexContainer } from '../../components/containers/flexContainer';
import React from 'react';
import StyledText from '../../components/common/StyledText';
import palette from '../../lib/styles/palette'
import styled from 'styled-components';

interface IgDashboardProps extends React.HTMLProps<HTMLDivElement> {
    currentAccount: IgAccountType,
    user: IgUserType,
    handleLoader: (isLoaded: boolean) => void
};

export const IgUser: React.FC<IgDashboardProps> = ({ currentAccount, user, handleLoader }) => {
    console.log(user)
    return (
        <FlexContainer>
            <UserHeader>
                <Avatar size={100} src={user.profile_picture_url} />
                <StatWrapper>
                    <StyledText fontSize={20} fontWeight={'bolder'} >
                        {user.media_count}
                    </StyledText>
                    <StyledText fontSize={16} fontWeight={'bolder'} >
                        {'게시물'}
                    </StyledText>
                </StatWrapper>

                <StatWrapper>
                    <StyledText fontSize={20} fontWeight={'bolder'} >
                        {user.follows_count}
                    </StyledText>
                    <StyledText fontSize={16} fontWeight={'bolder'} >
                        {'팔로워'}
                    </StyledText>
                </StatWrapper>

                <StatWrapper>
                    <StyledText fontSize={20} fontWeight={'bolder'} >
                        {user.followers_count}
                    </StyledText>
                    <StyledText fontSize={16} fontWeight={'bolder'}>
                        {'팔로잉'}
                    </StyledText>
                </StatWrapper>
            </UserHeader>
            <UserInfo onClick={() => handleLoader(true)}>
                Media
            </UserInfo>
        </FlexContainer >
    );
}


const UserHeader = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StatWrapper = styled.div`
    height: auto;
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const UserInfo = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const TitleBlock = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 16px;
`;