import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import home from './pages/home';
import signin from './pages/signin';
import signup from './pages/signup';

import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
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
  );
}

export default App;