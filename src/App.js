import React, { Component } from 'react';
import {Route} from 'react-router-dom'; 

import Landing from './landing/LandingContainer';
import Portal from './portal/PortalContainer';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/portal" component={Portal} />
      </div>
    );
  }
}

export default App;
