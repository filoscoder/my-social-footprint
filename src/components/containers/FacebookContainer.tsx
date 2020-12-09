import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import { FlexContainer } from './flexContainer';
import React from 'react';

const { Sider, Content } = Layout;

type ContentProps = {
    theme: "light" | "dark",
    social: "facebook" | "instagram" | "youtube",
    children: React.ReactNode
};

const FacebookContainer: React.FC<ContentProps> = ({ theme, social, children }) => {

    const [selectedMenu, setMenuTab] = React.useState<string>("1");


    const onSelectMenu = ({ item, key, keyPath, selectedKeys, domEvent }: any) => {
        console.log({ item, key, keyPath, selectedKeys, domEvent })
        setMenuTab(key)
    }

    return (
        <Layout>
            <Sider theme={theme} defaultCollapsed={true} collapsible >
                <Menu defaultSelectedKeys={['1']} mode="inline" theme={theme} onSelect={onSelectMenu}>
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
                        {children}
                    </FlexContainer>
                </Content>
            </Layout>
        </Layout>
    );
}

export default FacebookContainer;
