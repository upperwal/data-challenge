import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import MobilityDashboard from './components/mobility-dashboard/MobilityDashboard';
import CensusDashboard from './components/census-dashboard/CensusDashboard';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CensusDashboard/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
