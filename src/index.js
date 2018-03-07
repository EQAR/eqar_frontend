import React from 'react';
import ReactDOM from 'react-dom';
import { Router, BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import Full from './containers/Full/';
import Login from './views/Login/';
import store from './main_store';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../scss/style.scss';
import '../scss/core/_dropdown-menu-right.scss';

const render = () => {
  ReactDOM.render((
    <Provider store={store}>
      <Router history={createHistory()}>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login}/>
          <Route path="/" name="Home" component={Full}/>
        </Switch>
      </Router>
    </Provider>
  ), document.getElementById('root'));
}

store.subscribe(render);
render();
