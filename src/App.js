import React, { Component } from 'react';
import {Route} from 'react-router-dom'; 

import Landing from './landing/LandingContainer';
import Portal from './portal/PortalContainer';

import './App.scss';

class App extends Component {
  render() {
    console.log('Variables', process.env);
    return (
      <div className="App">
        <Route exact path={`/s/`} component={Portal} className="app-portal" />
        <Route exact path={`/s/:id`} component={Landing} className="app-landing" />
        
        <Route exact path={`/:id`} component={Landing} className="app-landing" />
        <Route exact path={`/`} component={Portal} className="app-portal" />

        {/* <Route exact path={`${process.env.PUBLIC_URL}/`} component={Landing} className="app-landing" />
        <Route exact path={`${process.env.PUBLIC_URL}/portal`} component={Portal} className="app-portal" /> */}
      </div>
    );
  }
}

export default App;
