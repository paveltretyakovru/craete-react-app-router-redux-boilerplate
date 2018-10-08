import React, { Component } from 'react';
import {Route} from 'react-router-dom'; 

import Landing from './landing/LandingContainer';
import Portal from './portal/PortalContainer';
import ReactGA from 'react-ga';
import './App.scss';


let userId;

try {
    userId = window.location.pathname.split('/')[2] || '';
} catch(error) {}

ReactGA.initialize('UA-126134239-1', {
    titleCase: false,
    gaOptions: {
        userId: userId
    }
});


const withTracker = (WrappedComponent) => {
    const trackPage = (page) => {
        try {
            let landingUri = new RegExp('^/s/.*');

            if(landingUri.test(page)) {
                ReactGA.set({ page : '/s/private' });
                ReactGA.pageview('/s/private');
            } else {
                ReactGA.set({ page });
                ReactGA.pageview(page);
            }
        } catch(error) {}
    };

    const HOC = (props) => {
        const page = props.location.pathname;
        trackPage(page);

        return (
            <WrappedComponent {...props} />
        );
    };

    return HOC;
};


class App extends Component {
  render() {
    return (
        <div className="App">
          <Route exact path={`/s/`} component={withTracker(Portal)} className="app-portal"/>
          <Route exact path={`/s/:id`} component={withTracker(Landing)} className="app-landing"/>

          {/* <Route exact path={`${process.env.PUBLIC_URL}/`} component={Landing} className="app-landing" />
          <Route exact path={`${process.env.PUBLIC_URL}/portal`} component={Portal} className="app-portal" /> */}
        </div>
    );
  }
}

export default App;
