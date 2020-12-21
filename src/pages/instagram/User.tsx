import { IgAccountType, IgUserType } from './types';
import React, { useEffect } from 'react';

import Avatar from 'antd/lib/avatar/avatar';
import { FlexContainer } from '../../components/containers/flexContainer';
import StyledText from '../../components/common/StyledText';
import { getMediaList } from '../../lib/api/instagram';
import palette from '../../lib/styles/palette'
import styled from 'styled-components';

interface IgDashboardProps extends React.HTMLProps<HTMLDivElement> {
    currentAccount: IgAccountType,
    user: IgUserType,
    handleLoader: (isLoaded: boolean) => void
};

export const IgUser: React.FC<IgDashboardProps> = ({ currentAccount, user, handleLoader }) => {
    const [mediaList, setMediaList] = React.useState([]);
    const [moreMediaLink, setMoreMediaLink] = React.useState('');

    useEffect(() => {
        (async function () {
            const { data, next }: any = await getMediaList(currentAccount);
            setMediaList(data);
            setMoreMediaLink(next);

        })();
    }, [currentAccount])

    console.log(currentAccount)

    return (
        <FlexContainer style={{ justifyContent: 'flex-start' }}>
            <UserHeader>
                <Avatar size={100} src={user.profile_picture_url} alt={currentAccount.name[0].toUpperCase()} />
                <StatWrapper>
                    <StyledText fontSize={16} fontWeight={600} >
                        {user.media_count}
                    </StyledText>
                    <StyledText fontSize={14} >
                        {'게시물'}
                    </StyledText>
                </StatWrapper>

                <StatWrapper>
                    <StyledText fontSize={16} fontWeight={600} >
                        {user.follows_count}
                    </StyledText>
                    <StyledText fontSize={14} >
                        {'팔로워'}
                    </StyledText>
                </StatWrapper>

                <StatWrapper>
                    <StyledText fontSize={16} fontWeight={600} >
                        {user.followers_count}
                    </StyledText>
                    <StyledText fontSize={14} >
                        {'팔로잉'}
                    </StyledText>
                </StatWrapper>
            </UserHeader>
            <UserInfo>
                <StyledText fontSize={14} fontWeight={600} >
                    {user.name}
                </StyledText>
                <StyledText fontSize={14} >
                    <pre style={{ fontFamily: 'inherit' }}>
                        {user.biography}
                    </pre>
                </StyledText>
                <StyledText fontSize={14} >
                    {user.website}
                </StyledText>
            </UserInfo>
            <UserMedia>
                {mediaList.length > 0 &&
                    mediaList.map((media: any, index: number) => {
                        console.log(media);
                        return (
                            <MediaCard style={{ width: '32%', margin: '0.75px' }}>
                                <a href={media.permalink} target={'blank'}>
                                    <img src={media.media_type === 'VIDEO' ? media.thumbnail_url : media.media_url} alt={media.caption} style={{ width: '100%', height: 'auto' }} />
                                    <MediaOverlay>
                                        <OverlayText>
                                            <StyledText>
                                                💛 &nbsp;{media.like_count}
                                            </StyledText>
                                            <StyledText>
                                                💬 &nbsp;{media.comments_count}
                                            </StyledText>
                                        </OverlayText>
                                    </MediaOverlay>
                                </a>
                            </MediaCard>
                        )
                    })
                }
            </UserMedia>
        </FlexContainer >
    );
}


const UserHeader = styled.div`
    height: auto;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 32px;
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
    height: auto;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-top: 16px;
`;
const UserMedia = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;
const MediaCard = styled.div`
    position: relative;
    width: 32%;
    margin: 0.25%;

`;
const MediaOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
  background-color: rgb(0,0,0);
  &:hover {
        opacity: .9;
    }
`;
const OverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: ${palette.typo3};
  font-weight: 600;
  font-size: 16px;
`;