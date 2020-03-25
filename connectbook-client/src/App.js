import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './utilities/theme';
import home from './pages/home';
import signin from './pages/signin';
import signup from './pages/signup';

import Navbar from './components/Navbar';
import AuthRoute from './utilities/AuthRoute';
import decodeToken from './utilities/decodeToken';

import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';

function App() {
  const authenticated = decodeToken('idToken');

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute
                path="/signin"
                component={signin}
                authenticated={authenticated}
              />
              <AuthRoute
                path="/signup"
                component={signup}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;

// 5:50
