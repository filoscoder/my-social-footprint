import { BrowserRouter, Link, Route, Router, Switch, useRouteMatch } from 'react-router-dom';
import {
    DesktopOutlined,
    PieChartOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useContext } from 'react';

import { Context } from '../../lib/store';
import { FbSettings } from '../../pages/facebook';
import { FlexContainer } from './flexContainer';

const { Sider, Content } = Layout;

type ContentProps = {
    theme: "light" | "dark",
    social: "facebook" | "instagram" | "youtube",
    children: React.ReactNode
};

const FacebookContainer: React.FC<ContentProps> = ({ theme, social, children }) => {
    const [state, dispatch] = useContext(Context);
    const [selectedMenu, setMenuTab] = React.useState<string>("1");
    const { path, url } = useRouteMatch();

    const onSelectMenu = ({ item, key, keyPath, selectedKeys, domEvent }: any) => {
        console.log({ item, key, keyPath, selectedKeys, domEvent })
        setMenuTab(key)
    }

    return (
        <Layout>
            <Sider theme={state.theme} defaultCollapsed={true} collapsible >
                <Menu defaultSelectedKeys={['1']} mode="inline" theme={state.theme} onSelect={onSelectMenu}>
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
                    <Switch>
                        <Route exact path={`${path}`} component={FbSettings} />
                        <Route exact path={`${path}/user`} component={FbSettings} />
                        <Route exact path={`${path}/settings`} component={FbSettings} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

export default FacebookContainer;
