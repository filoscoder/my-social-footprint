import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useContext, useEffect } from 'react';

import { Context } from '../../lib/store';
import { FlexContainer } from './flexContainer';
import { getMe } from '../../lib/api/instagram';

const { Sider, Content } = Layout;

type ContentProps = {
    theme: "light" | "dark",
    social: "facebook" | "instagram" | "youtube",
    children: React.ReactNode
};

const InstagramContainer: React.FC<ContentProps> = ({ theme, social, children }) => {
    const [state, dispatch] = useContext(Context);
    const [selectedMenu, setMenuTab] = React.useState<string>("1");

    useEffect(() => {
        console.log(state)
        const token = sessionStorage.getItem('instagram_token');
        getMe(state.instagram_token || token);
    }, [])


    const onSelectMenu = ({ item, key, keyPath, selectedKeys, domEvent }: any) => {
        console.log({ item, key, keyPath, selectedKeys, domEvent })
        setMenuTab(key)
    }

    return (
        <Layout>
            <Sider theme={state.theme} defaultCollapsed={true} collapsible >
                <Menu defaultSelectedKeys={['1']} mode="inline" theme={state.theme} onSelect={onSelectMenu}>
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        Option 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        Option 2
                    </Menu.Item>
                    <Menu.Item key="sub1" icon={<UserOutlined />}>
                        User
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Content>
                    <FlexContainer>
                        {"asdasd"}
                    </FlexContainer>
                </Content>
            </Layout>
        </Layout>
    );
}

export default InstagramContainer;
