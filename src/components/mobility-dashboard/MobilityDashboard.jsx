import React, {useState} from 'react';
import {Bar, Pie, Doughnut, Chart} from 'react-chartjs-2';
import data from './compiled_data';

import './MobilityDashboard.scss';

var cityName = data.city_list[0]

var pollutionKey =[]

const state = {
    labels: data[cityName].health.active_mobility.x , //['Total', 'Cycle', 'foot','Road Length'],
    datasets: [
      {
        label: cityName,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: data[cityName].health.active_mobility.y
      }
    ]
}

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

const pieState = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: [60, 70, 40, 81, 56]
      }
    ]
}


function MobilityDashboard() {

    const [cityState, setCityState] = useState(data['Delhi']);
    const [cityNameState, setCityNameState] = useState('Delhi');
    const staticData = data['overall']

    function footpathBenchmark() {
        if (cityState.health['percent_roads_are_footpath']===null) return;
        var result=''
        if(cityState.health['percent_roads_are_footpath']>30) {
            result='You’re doing great, ' +cityNameState + '! You’ve achieved Level of Service 1 as per the national benchmarks for footpath infrastructure'
        } 
        else if(cityState.health['percent_roads_are_footpath']<=30 && cityState.health['percent_roads_are_footpath']>20) {
            result ="You’re on the right track, " + cityNameState +"! You’ve achieved Level of Service 2 as per the national benchmarks for footpath infrastructure"
        }
        else if(cityState.health['percent_roads_are_footpath']<=20 && cityState.health['percent_roads_are_footpath']>10) {
            result ="There’s quite a way to go, " + cityNameState +"! You’re at Level of Service 3 as per the national benchmarks for footpath infrastructure."
        }
        else if(cityState.health['percent_roads_are_footpath']<=10) {
            result ="There’s quite a way to go, " + cityNameState +"! You’re at Level of Service 4 as per the national benchmarks for footpath infrastructure."
        }
        return (
            <div class="footpath-percentage-header">
                <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                            <h4><span class="footpath-percentage">{cityNameState}</span> has <span class="footpath-percentage">{cityState.health['percent_roads_are_footpath']}</span>% of road network covered by footpaths.</h4>
                            </div>
                        <div class="col-md-6 ">
                            <h4>{result}</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function cycleTrackBenchmark() {
        if (cityState.health['percent_roads_are_cyclepath']===null) return;
        var result=''
        if(cityState.health['percent_roads_are_cyclepath']>100) {
            result='You’re doing great, ' +cityNameState + '! You’ve achieved Level of Service 1 as per the national benchmarks for footpath infrastructure'
        } 
        else if(cityState.health['percent_roads_are_cyclepath']<=75 && cityState.health['percent_roads_are_cyclepath']>50) {
            result ="You’re on the right track, " + cityNameState +"! You’ve achieved Level of Service 2 as per the national benchmarks for footpath infrastructure"
        }
        else if(cityState.health['percent_roads_are_cyclepath']<=50 && cityState.health['percent_roads_are_cyclepath']>25) {
            result ="There’s quite a way to go, " + cityNameState +"! You’re at Level of Service 3 as per the national benchmarks for footpath infrastructure."
        }
        else if(cityState.health['percent_roads_are_cyclepath']<=25) {
            result ="There’s quite a way to go, " + cityNameState +"! You’re at Level of Service 4 as per the national benchmarks for footpath infrastructure."
        }

        return (
            <div>
                <div class="cycle-track-percentage-header">
                    <div class="container">
                            <div class="row">
                                <div class="col-md-6">
                                <h4><span class="cycle-track-percentage">{cityNameState}</span> has <span class="cycle-track-percentage">{cityState.health['percent_roads_are_cyclepath']}</span>% of road network covered by cycle tracks.</h4>
                                </div>
                            <div class="col-md-6 ">
                                <h4> {result}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <section class="MobilityDashboard container">
            {cityState.overall.population}
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
            <h1 class="city-name">Delhi</h1>
            <div class="city-facts">
                <h2>Do you know that Delhi has the largest road network with total road length {data[cityName].overall.road_length} kms?</h2><br/>

                <h2>but it also has the highest fatality rate of XX %</h2>
                
                <div class="container">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="card">
                                <b> {data[cityName].overall.population}</b>
                                <p> People</p> 

                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <b>{data[cityName].overall.area}</b>
                                <p>Total Area</p> 
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <b>{data[cityName].overall.bus_fleet}</b>
                                <p>Buses</p> 
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <b>{data[cityName].overall.road_length}</b>
                                <p>Kms Road</p> 
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="card">
                                <b>{data[cityName].overall.seats_per_lakh}</b>
                                <p>Seat Per lakh population</p> 
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <b>{data[cityName].overall.avg_daily_ridership}</b>
                                <p>Ridership</p> 
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <b>y/n</b>
                                CMP
                                <p>(click link)</p> 
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <b></b>
                                <p></p> 
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>



            <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
                <li class="nav-item " role="presentation">
                    <a class="nav-link" data-toggle="tab" href="#health" role="tab" aria-controls="home" >Health</a>
                </li>
                <li class="nav-item " role="presentation">
                    <a class="nav-link" data-toggle="tab" href="#inclusion" role="tab" aria-controls="profile" >Inclusion</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" data-toggle="tab" href="#security" role="tab" aria-controls="contact" >Security</a>
                </li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="health">
            
                    <div class="chart">
                        <h2>How healthy / active is your city?</h2>
                        <div class="container">
                            <div class="row">
                                <div class="col-md-6" id="bar-chart">
                                    <Bar
                                    data={state}
                                    options={{
                                        title:{
                                            display:true,
                                            text:'Average Rainfall per month',
                                            fontSize:20
                                        },
                                        legend:{
                                            display:true,
                                            position:'top'
                                        }
                                    }}
                                    />
                                </div>
                                <div class="col-md-6">
                                    TEXT 
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    {footpathBenchmark()} 
                    {cycleTrackBenchmark()}
                    
                    {/* <div id="chart">
                        <ReactApexChart options={this.state.options} series={this.state.series} type="scatter" height={350} />
                    </div> */}

                    <div class="chart">
                        <h3 class="data">Is an active lifestyle reduces your city's health expenditure?</h3>
                        <div class="container">
                            <div class="row">
                                <div class="col-md-6">
                                    Image <br></br> 
                                    You have 4th highest # of parks 
                                </div>
                                <div class="col-md-6">
                                    Image <br></br>
                                    You have 4th _____________
                                </div>
                            </div>
                        </div>
                        <div class="data"><h4>On an average you spend <span>Rs 1234</span> amount more than the city on "What??"</h4></div>
                    </div>

                    <div class="chart">
                        <div class="data"><h4>What are you breathing everyday?</h4>
                        <h4>Do you know what you are breathing everyday?</h4>
                        <h4>Do you that greener mobility/cleaner transp can improve air quality?</h4></div>

                        <div class="container">
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="card">
                                        <b>{cityState.health.avg_annual_pollution.NO2}</b>
                                        <p>NO2</p> 
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card">
                                        <b>{cityState.health.avg_annual_pollution['PM2.5']}</b>
                                        <p>PM2.5</p> 
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card">
                                        <b>{cityState.health.avg_annual_pollution.PM10}</b>
                                        <p>PM10</p> 
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card">
                                        <b>{cityState.health.avg_annual_pollution.SO2}</b>
                                        <p>SO2</p> 
                                    </div>
                                </div>
                                Avg annual pollution level 
                                

                                {/* <Pie
                                    data={pieState}
                                    options={{
                                        title:{
                                        display:true,
                                        text:'Average Rainfall per month',
                                        fontSize:20
                                        },
                                        legend:{
                                        display:true,
                                        position:'right'
                                        }
                                    }}
                                />
                                Fuel con in buses

                                <Doughnut
                                    data={pieState}
                                    options={{
                                        title:{
                                        display:true,
                                        text:'Average Rainfall per month',
                                        fontSize:20
                                        },
                                        legend:{
                                        display:true,
                                        position:'right'
                                    }
                                }}
                                /> */}
                            </div>
                        </div>
                    </div>
                    
                    <div class="chart">
                        <h4 class="data">How much fuel do we consume?</h4>
                        <div class="container">
                            <div class="row">
                                <div class="col-md-6">
                                    675874 L / KM 
                                </div>
                                <div class="col-md-6">
                                    945663 L / KM 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane" id="inclusion">inclusion
                
                </div>
                
                <div role="tabpanel" class="tab-pane" id="security">security
                
                </div>
            </div>
        </section>
    )

}

export default MobilityDashboard;