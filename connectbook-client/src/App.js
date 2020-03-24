import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './utilities/theme';
import home from './pages/home';
import signin from './pages/signin';
import signup from './pages/signup';

import Navbar from './components/Navbar';

import './App.css';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={home} />
            <Route path="/signin" component={signin} />
            <Route path="/signup" component={signup} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
