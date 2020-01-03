import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Admin from './components/admin';

class App extends React.Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/admin' component={Admin}/>
        </Switch>
      </div>
    )
    return (
      <div>
        <App/>
      </div>
    );
  }
}

export default App;
