import {
    FacebookFilled,
    InstagramFilled,
    YoutubeFilled,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, Switch } from 'react-router-dom';
import React, { useContext, useState } from 'react';

import AuthPage from './pages/AuthPage';
import AuthRoute from './routes/AuthRoute';
import { Context } from './lib/store';
import MainPage from './pages/MainPage';
import NAuthRoute from './routes/NAuthRoute';
import styled from 'styled-components';

const { Header } = Layout;


function App() {
    const [state, dispatch] = useContext(Context);
    const [selectedTab, setSelectedTab] = useState(state.defaultSocial);

    const onSelectTab = ({ item, key, keyPath, selectedKeys, domEvent }: any) => {
        setSelectedTab(key);
        dispatch({ type: 'SET_SOCIAL', social: key });
    }

    return (
        <Layout style={{ height: "-webkit-fill-available" }}>
            <Header style={{ padding: 0 }}>
                <LeftBlock>
                    <LogoBlock href={`/${selectedTab}`}>
                        {selectedTab}
                    </LogoBlock>
                    <Menu mode="horizontal" defaultSelectedKeys={[state.defaultSocial]} theme={state.theme}
                        onSelect={onSelectTab}
                    >
                        <Menu.Item key="facebook">
                            <Link to="/facebook">
                                <FacebookFilled style={{ margin: 0 }} />
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="instagram">
                            <Link to="/instagram">
                                <InstagramFilled style={{ margin: 0 }} />
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="youtube">
                            <Link to="/youtube">
                                <YoutubeFilled style={{ margin: 0 }} />
                            </Link>
                        </Menu.Item>
                    </Menu>
                </LeftBlock>
            </Header>
            <Switch>
                <AuthRoute exact path={`/${selectedTab}`} component={MainPage} social={selectedTab} />
                <NAuthRoute exact path={`/${selectedTab}/signin`} component={AuthPage} social={state.social} />
            </Switch>
        </Layout>
    );
}

const LeftBlock = styled.div`
display: flex;
justify-content: space-between;
margin: 0 10px;
`;
const LogoBlock = styled.a`
width: 60px;
display: flex;
justify-content: center;
background-color: lightgray;
`;


export default App;