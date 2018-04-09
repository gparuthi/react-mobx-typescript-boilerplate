import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { Layout, Menu, Breadcrumb, Button, Input } from 'antd';
import 'antd/dist/antd.css'; 
import './index.css';
import { Motion, spring } from 'react-motion';
import FlipMove from 'react-flip-move';

const { Header, Content, Footer } = Layout;

class ContentModel {
  @observable text: string

  constructor(text = 'a,b,c') {
    this.text = text
  }

  @computed get articles() {
    return this.text.split(',')
  }

}

class AppState {
  @observable currentContent: ContentModel

  constructor() {
    this.currentContent = new ContentModel()
  }
}

interface Props{
  store: AppState
}


@observer
export class ContentView extends React.Component<Props>{
  render() {
    const store = this.props.store
    return (
      <FlipMove enterAnimation="fade" leaveAnimation="fade" duration={200} easing="ease-out">
              {store.currentContent.articles.map((article,index) => (
                <div key={article}>{article}</div>
              ))}
            </FlipMove>
    )
  }
}

@observer
export class App extends React.Component<Props>{
  render() {
    const store = this.props.store
    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
      store.currentContent.text = event.currentTarget.value
    }
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 10, minHeight: 280 }}>
            <ContentView store={store}></ContentView>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Input value={store.currentContent.text} onChange={handleChange} />
    </Footer>
      </Layout>
    )
  }
}

ReactDOM.render(
  <App store={ new AppState() }/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
