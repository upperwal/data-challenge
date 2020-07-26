import React from 'react'
import {HorizontalBar} from 'react-chartjs-2';
import pm25 from './images/dust.svg';
import so2 from './images/pollution.svg'
import no2 from './images/air-pollution.svg'
import pm10 from './images/donut-pm10.png'

import './Health.scss';

function Health(props) {
    const cityState = props.cityState
    const cityNameState = props.cityNameState
    const cityStatic = props.cityStatic


    const state = {
        labels: cityState.health.active_mobility.x , 
        datasets: [
          {
            label: cityNameState,
            backgroundColor: '#f6264c',
            data: cityState.health.active_mobility.y
          }
        ]
    }

    function footpathBenchmark() {
        if (cityState.health['percent_roads_are_footpath']===null) return;
        var result=''
        if(cityState.health['percent_roads_are_footpath']>30) {
            result = cityStatic.percent_roads_are_footpath[0].replace('[0]', cityNameState)
        } 
        else if(cityState.health['percent_roads_are_footpath']<=30 && cityState.health['percent_roads_are_footpath']>20) {
            result = cityStatic.percent_roads_are_footpath[1].replace('[0]', cityNameState)
        }
        else if(cityState.health['percent_roads_are_footpath']<=20 && cityState.health['percent_roads_are_footpath']>10) {
            result = cityStatic.percent_roads_are_footpath[2].replace('[0]', cityNameState)
        }
        else if(cityState.health['percent_roads_are_footpath']<=10) {
            result = cityStatic.percent_roads_are_footpath[3].replace('[0]', cityNameState)
        }
        return (
            <div className="footpath-percentage-header">
                <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                            <h4><span className="footpath-percentage">{cityNameState}</span> has <span className="footpath-percentage">{cityState.health['percent_roads_are_footpath'].toFixed(2)}</span>% of road network covered by footpaths.</h4>
                            </div>
                        <div className="col-md-6 ">
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
            result = cityStatic.percent_roads_are_cyclepath[0].replace('[0]', cityNameState)} 
        else if(cityState.health['percent_roads_are_cyclepath']<=75 && cityState.health['percent_roads_are_cyclepath']>50) {
            result = cityStatic.percent_roads_are_cyclepath[1].replace('[0]', cityNameState)}
        else if(cityState.health['percent_roads_are_cyclepath']<=50 && cityState.health['percent_roads_are_cyclepath']>25) {
            result = cityStatic.percent_roads_are_cyclepath[2].replace('[0]', cityNameState)}
        else if(cityState.health['percent_roads_are_cyclepath']<=25) {
            result = cityStatic.percent_roads_are_cyclepath[3].replace('[0]', cityNameState)}

        return (
            <div>
                <div className="cycle-track-percentage-header">
                    <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                <h4><span className="cycle-track-percentage">{cityNameState}</span> has <span className="cycle-track-percentage">{cityState.health['percent_roads_are_cyclepath'].toFixed(2)}</span>% of road network covered by cycle tracks.</h4>
                                </div>
                            <div className="col-md-6 ">
                                <h4> {result}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <section>
            <div className="chart">
                <h2>How healthy / active is your city?</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6" id="bar-chart">
                            <HorizontalBar
                            data = {state}
                            options={{
                                title:{
                                    display:true,
                                    // text:'Average Rainfall per month',
                                    fontSize:20
                                },
                                legend:{
                                    display:true,
                                    position:'top'
                                },
                                scales: {
                                    xAxes: [{
                                        type: 'logarithmic'
                                    }]
                                }
                            }}
                            />
                        </div>
                        <div className="col-md-6">
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

            <div className="chart">
                <h3 className="data">Is an active lifestyle reduces your city's health expenditure?</h3>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            Image <br></br> 
                            You have 4th highest # of parks 
                        </div>
                        <div className="col-md-6">
                            Image <br></br>
                            You have 4th _____________
                        </div>
                    </div>
                </div>
                <div className="data"><h4>On an average you spend <span>Rs 1234</span> amount more than the city on "What??"</h4></div>
            </div>

            <div className="chart">
                <div className="data"><h4>What are you breathing everyday?</h4>
                <h4>Do you know what you are breathing everyday?</h4>
                <h4>Do you that greener mobility/cleaner transp can improve air quality?</h4></div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-image">
                                    <img src={no2} ></img>
                                </div>
                                <b>{cityState.health.avg_annual_pollution.NO2}</b>
                                <p>NO2</p> 
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-image">
                                    <img src={pm25} ></img>
                                </div>
                                <b>{cityState.health.avg_annual_pollution['PM2.5']}</b>
                                <p>PM2.5</p> 
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-image">
                                    <img src={pm10} ></img>
                                </div>
                                <b>{cityState.health.avg_annual_pollution.PM10}</b>
                                <p>PM10</p> 
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-image">
                                    <img src={so2} ></img>
                                </div>
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
            
            <div className="chart">
                <h4 className="data">How much fuel do we consume?</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>675874 L / KM</h2> 
                        </div>
                        <div className="col-md-6">
                            <h2>945663 L / KM</h2> 
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Health;
