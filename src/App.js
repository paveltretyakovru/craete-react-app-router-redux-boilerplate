import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom'; 

import Landing from './landing/LandingContainer';
import Portal from './portal/PortalContainer';
import ReactGA from 'react-ga';
import './App.scss';


let userId;

try {
    userId = window.location.pathname.split('/')[2] || '';
} catch(error) {}

ReactGA.initialize('UA-126134239-1', {
    // debug: true,
    gaOptions: {
        userId: userId
    }
});

// Feature detects Navigation Timing API support.
if (window.performance) {
    // Gets the number of milliseconds since page load
    // (and rounds the result since the value must be an integer).
    var timeSincePageLoad = Math.round(performance.now());

    ReactGA.timing({
      category: 'JS App',
      variable: 'load',
      value: timeSincePageLoad, // in milliseconds
      label: 'performance.now'
    });
}


class App extends Component {
  render() {
    return (
        <div className="App">
          <Switch>
            <Route exact path={`/s/`} component={Portal} className="app-portal"/>
            <Route exact path={`/s/:id`} component={Landing} className="app-landing"/>
            <Redirect to="/s/welcome" />
          </Switch>
        </div>
    );
  }
}

export default App;
