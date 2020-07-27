import React, {useState} from 'react';
import data from './compiled_data';

import Header from '../../views/header/Header'
import Overview from '../../views/overview/Overview'
import Health from '../../views/health/Health'
import Inclusion from '../../views/inclusion/Inclusion'
import Security from '../../views/security/Security'

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
    const [cityNameState, setCityNameState] = useState(data.city_list[0]);
    const cityStatic = data.static;
    const staticOverallData = data['overall']

    console.log(data.city_list)

    function cityChangeEvent(e) {
        setCityNameState(e.target.value)
        setCityState(data[e.target.value])
    }
    
    return (
        <>
        <Header cityList={data.city_list} callback={cityChangeEvent}/>
        <section className="MobilityDashboard container">
            {/* <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="/#">Action</a>
                    <a className="dropdown-item" href="/#">Another action</a>
                    <a className="dropdown-item" href="/#">Something else here</a>
                </div>
            </div> */}
            {/* <h1 className="city-name">Delhi</h1> */}
            

            <Overview cityState={cityState} cityNameState={cityNameState}/>


            <ul className="nav nav-tabs nav-fill" id="myTab" role="tablist">
                <li className="nav-item " role="presentation">
                    <a className="nav-link active" data-toggle="tab" href="#health" role="tab" aria-controls="home" >City On The Move</a>
                </li>
                <li className="nav-item " role="presentation">
                    <a className="nav-link" data-toggle="tab" href="#inclusion" role="tab" aria-controls="profile" >City For All</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" data-toggle="tab" href="#security" role="tab" aria-controls="contact" >Watchful City</a>
                </li>
            </ul>

            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="health">
                    <Health data={data} cityState={cityState} cityNameState={cityNameState} cityStatic={cityStatic}/>        
                </div>
                <div role="tabpanel" className="tab-pane" id="inclusion">
                    <Inclusion data={data} cityNameState={cityNameState}/>
                </div>
                
                <div role="tabpanel" className="tab-pane" id="security">
                    <Security data={data} cityNameState={cityNameState} cityState={cityState}/>
                </div>
            </div>
        </section>
        </>
    )

}

export default MobilityDashboard;