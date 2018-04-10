import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Intent, Spinner, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Alignment } from "@blueprintjs/core";
import { Colors, Text, Classes } from "@blueprintjs/core"
import './index.css';
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import { Motion, spring } from 'react-motion';
import FlipMove from 'react-flip-move';

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
      <div className={Classes.DARK} style={{backgroundColor: Colors.DARK_GRAY3, minHeight: '1500px'}}>
        <Navbar>
          <NavbarGroup align={Alignment.RIGHT}>
            <NavbarHeading>Blueprint</NavbarHeading>
            <NavbarDivider />
            <Button className="pt-minimal" icon="home" text="Home" />
            <Button className="pt-minimal" icon="document" text="Files" />
          </NavbarGroup>
        </Navbar>
        <div className='content'>
          <Text>Hello World!</Text>
          <ContentView store={store}></ContentView>
          <input className={Classes.INPUT} value={store.currentContent.text} onChange={handleChange} />
    </div>
      
        
      </div>
    )
  }
}

ReactDOM.render(
  <App store={ new AppState() }/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
