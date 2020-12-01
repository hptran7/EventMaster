import { React } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import '../css/index.css';
import "antd/dist/antd.css"

const { Header, Content, Footer } = Layout;
function BaseLayout(props){
    

    return(
        <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1"><a href="/">My Page</a></Menu.Item>
            <Menu.Item key="2">Add Event</Menu.Item>
            <Menu.Item key="3">Event Search</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">{props.children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    )
}

export default BaseLayout