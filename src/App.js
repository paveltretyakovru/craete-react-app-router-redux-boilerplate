import React, { Component } from 'react';
import {Route} from 'react-router-dom'; 

import Landing from './landing/LandingContainer';
import Portal from './portal/PortalContainer';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Landing} className="app-landing" />
        <Route exact path={`${process.env.PUBLIC_URL}/portal`} component={Portal} className="app-portal" />
      </div>
    );
  }
}

export default App;
