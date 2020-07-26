import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom'

import Header from './views/header/Header'
import MobilityDashboard from './components/mobility-dashboard/MobilityDashboard'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router basename='/'>
        <Header/>
        <Switch>
        
          <Route exact path="/" component={MobilityDashboard} />
        </Switch>
		  </Router>
    </div>
  );
}

export default App;
