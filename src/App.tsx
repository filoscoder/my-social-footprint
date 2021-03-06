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
import FacebookContainer from './components/containers/FacebookContainer';
import InstagramContainer from './components/containers/InstagramContainer';
import NAuthRoute from './routes/NAuthRoute';
import YoutubeContainer from './components/containers/YoutubeContainer';
import styled from 'styled-components';

const { Header } = Layout;


function App() {
    const currentTab = window.location.pathname.split('/')[2]
    const [state, dispatch] = useContext(Context);
    const [selectedTab, setSelectedTab] = useState(currentTab || state.defaultSocial);

    const onSelectTab = ({ item, key, keyPath, selectedKeys, domEvent }: any) => {
        setSelectedTab(key);
        dispatch({ type: 'SET_SOCIAL', social: key });
    }

    if (currentTab === '') {
        window.location.href = `/${selectedTab}`;
    }

    return (
        <Layout style={{ height: "-webkit-fill-available" }}>
            <Header style={{ padding: 0 }}>
                <LeftBlock>
                    <LogoBlock href={`/${selectedTab}`}>
                        {selectedTab}
                    </LogoBlock>
                    <Menu mode="horizontal" selectedKeys={[selectedTab]} theme={state.theme}
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
                <AuthRoute path={`/facebook`} component={FacebookContainer} social={selectedTab} />
                <AuthRoute path={`/instagram`} component={InstagramContainer} social={selectedTab} />
                <AuthRoute path={`/youtube`} component={YoutubeContainer} social={selectedTab} />
                <NAuthRoute exact path={`/signin/${selectedTab}`} component={AuthPage} />
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