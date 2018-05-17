import React from 'react';
import ReactDOM from 'react-dom';
import {Router, BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Full from './containers/Full/';
import Login from './views/Login/';
import ForgotPassword from './views/ForgotPassword/ForgotPassword'
import store, { history } from './main_store';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../scss/style.scss';
import '../scss/core/_dropdown-menu-right.scss';
import axios from "axios/index";
import PasswordResetConfirm from "./views/ForgotPassword/PasswordResetConfirm";


function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  } else {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    return true;
  }
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login}/>
          <Route exact path="/forgot-password" name="Forgot Password" component={ForgotPassword}/>
          <Route path="/password-reset/:uid/:token" name="Password Reset Confirm" component={PasswordResetConfirm}/>
          <PrivateRoute path="/" name="Home" component={Full} />
        </Switch>
      </Router>
      </Provider>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

store.subscribe(render);
render();
