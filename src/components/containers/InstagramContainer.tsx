import { Avatar, Badge, Layout, Menu, PageHeader, Select } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { IgDashboard, IgSettings, IgUser } from '../../pages/instagram';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { getMe, getMedias } from '../../lib/api/instagram';

import { Context } from '../../lib/store';
import { FbPageInfoType } from '../../pages/facebook/types'
import { FlexContainer } from './flexContainer';
import { IgUserType } from '../../pages/instagram/types';
import Indicator from '../common/Indicator';
import StyledText from '../common/StyledText';
import styled from 'styled-components';

const { Sider, Content } = Layout;
const { Option } = Select;

type ContentProps = {
    theme: "light" | "dark",
    social: "facebook" | "instagram" | "youtube",
    children: React.ReactNode
};

const InstagramContainer: React.FC<ContentProps> = ({ theme, social, children }) => {
    const igAccounts = JSON.parse(localStorage.getItem("igBusinessAccounts") || "[]")

    const [state, dispatch] = useContext(Context);
    const [currentAccount, setCurrentAccount] = React.useState(igAccounts[0] || { name: '', id: '' });
    const [currentAccountInfo, setCurrentAccountInfo] = React.useState<IgUserType>({
        biography: '',
        follows_count: 0,
        followers_count: 0,
        id: '',
        ig_id: 0,
        media_count: 0,
        name: '',
        profile_picture_url: '',
        username: ''
    });
    const [waiting, setWaiting] = React.useState(false);
    const [selectedMenu, setMenuTab] = React.useState<string>("1");

    const { path, url } = useRouteMatch();
    console.log(igAccounts)

    useEffect(() => {
        (async function () {
            const ig: IgUserType = await getMe(currentAccount);

            if (ig) {
                setCurrentAccountInfo(ig);
                console.log(currentAccountInfo)
            }
        })();
    }, [currentAccount])


    const onSelectMenu = async ({ item, key, keyPath, selectedKeys, domEvent }: any) => {
        console.log({ item, key, keyPath, selectedKeys, domEvent })
        setMenuTab(key)
        if (key === "1") {
            const data: any = await getMedias(currentAccount);
            console.log(data)
        }
    }

    const handleAccountSelect = (value: number) => {
        setCurrentAccount(igAccounts[value])
        console.log(igAccounts[value])
    }

    const handleLoader = (isLoaded: boolean) => setWaiting(isLoaded);

    return igAccounts ?
        (
            <Layout>
                <Sider theme={state.theme} defaultCollapsed={true} collapsible >
                    <Menu defaultSelectedKeys={[selectedMenu]} mode="inline" theme={state.theme} onSelect={onSelectMenu}>
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <Link to={`${url}`}>
                                User
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            <Link to={`${url}/option2`}>
                                User
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UserOutlined />}>
                            <Link to={`${url}/user`}>
                                User
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<SettingOutlined />}>
                            <Link to={`${url}/settings`}>
                                Settings
                        </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout>
                    <Content>
                        <HeadBlock>
                            <Select defaultValue={0} bordered={false} onChange={handleAccountSelect}>
                                {igAccounts.length > 0 &&
                                    igAccounts.map((account: FbPageInfoType, index: number) => {
                                        return (
                                            <Option key={index} value={index}>
                                                {account.name}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </HeadBlock>

                        {waiting ?
                            <Indicator />
                            :
                            <Switch>
                                <Route exact path={`${path}`} render={() => <IgDashboard currentAccount={currentAccount} handleLoader={handleLoader} />} />
                                <Route exact path={`${path}/user`} render={() => <IgUser currentAccount={currentAccount} user={currentAccountInfo} handleLoader={handleLoader} />} />
                                <Route exact path={`${path}/settings`} component={IgSettings} />
                            </Switch>
                        }
                    </Content>
                </Layout>
            </Layout>
        ) :
        (
            <FlexContainer>
                <StyledText>{`페이스북 계정에 연결된`}</StyledText>
                <StyledText>{`인스타그램 비지니스 계정이 없습니다.`}</StyledText>
            </FlexContainer>
        )
}

const HeadBlock = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
`;


export default InstagramContainer;
