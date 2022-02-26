import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom'

import MobilityDashboard from './components/mobility-dashboard/MobilityDashboard';
import CensusDashboard from './components/census-dashboard/CensusDashboard';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router basename='/'>
        <Switch>
        
          {/* <Route exact path="/" component={MobilityDashboard} /> */}
          <Route exact path="/" component={CensusDashboard} />
        </Switch>
		  </Router>
    </div>
  );
}

export default App;
