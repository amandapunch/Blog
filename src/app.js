import React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import Home from './components/home';
import Admin from './components/admin';
import About from './components/about';
import Posts from './components/posts';
import BlogPost from './components/blogpost';

class App extends React.Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/admin' component={Admin}/>
          <Route path='/about' component={About}/>
          <Route path='/posts' component={Posts}/>
          <Route path="/post/:title/:id" component={BlogPost} />
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
