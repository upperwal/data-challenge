import React, {useState} from 'react';
import data from './compiled_data';

import Overview from '../../views/overview/Overview'
import Health from '../../views/health/Health'

import './MobilityDashboard.scss';


// var ctx = document.getElementById('bar-chart').getContext('2d');
// var stateBarChart = new Chart(ctx, {
//     type: 'horizontalBar',
//     data: data,
//     options: {
//         scales: {
//             xAxes: [{
//                 gridLines: {
//                     offsetGridLines: true
//                 }
//             }]
//         }
//     }
// });

// const pieState = {
//     labels: ['January', 'February', 'March',
//              'April', 'May'],
//     datasets: [
//       {
//         label: 'Rainfall',
//         backgroundColor: [
//           '#B21F00',
//           '#C9DE00',
//           '#2FDE00',
//           '#00A6B4',
//           '#6800B4'
//         ],
//         hoverBackgroundColor: [
//         '#501800',
//         '#4B5000',
//         '#175000',
//         '#003350',
//         '#35014F'
//         ],
//         data: [60, 70, 40, 81, 56]
//       }
//     ]
// }


function MobilityDashboard() {

    const [cityState, setCityState] = useState(data['Delhi']);
    const [cityNameState, setCityNameState] = useState('Delhi');
    const staticOverallData = data['overall']

    
    
    return (
        <section className="MobilityDashboard container">
            {cityState.overall.population}
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="/#">Action</a>
                    <a className="dropdown-item" href="/#">Another action</a>
                    <a className="dropdown-item" href="/#">Something else here</a>
                </div>
            </div>
            <h1 className="city-name">Delhi</h1>
            

            <Overview cityState={cityState} cityNameState={cityNameState}/>


            <ul className="nav nav-tabs nav-fill" id="myTab" role="tablist">
                <li className="nav-item " role="presentation">
                    <a className="nav-link" data-toggle="tab" href="#health" role="tab" aria-controls="home" >Health</a>
                </li>
                <li className="nav-item " role="presentation">
                    <a className="nav-link" data-toggle="tab" href="#inclusion" role="tab" aria-controls="profile" >Inclusion</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" data-toggle="tab" href="#security" role="tab" aria-controls="contact" >Security</a>
                </li>
            </ul>

            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="health">
                    <Health cityState={cityState} cityNameState={cityNameState}/>        
                </div>
                <div role="tabpanel" className="tab-pane" id="inclusion">inclusion
                
                </div>
                
                <div role="tabpanel" className="tab-pane" id="security">security
                
                </div>
            </div>
        </section>
    )

}

export default MobilityDashboard;