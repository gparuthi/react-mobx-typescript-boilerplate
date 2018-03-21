import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

class Content {
  @observable text: string

  constructor(text = 'hello') {
    this.text = text
    let timeout = setInterval(()=>{
      this.text += '!'
    }, 1000)
  }

}

class AppState {
  @observable currentContent: Content

  constructor() {
    this.currentContent = new Content()
  }
}

interface Props{
  store: AppState
}

@observer
export class App extends React.Component<Props>{
  render() {
    const store = this.props.store
    return (
      <div>
        Hi {store.currentContent.text}
      </div>
    )
  }
}

ReactDOM.render(
  <App store={ new AppState() }/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
