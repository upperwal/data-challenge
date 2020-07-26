import React from 'react'
import {HorizontalBar} from 'react-chartjs-2';
import pm25 from './images/dust.svg';
import so2 from './images/pollution.svg'
import no2 from './images/air-pollution.svg'
import pm10 from './images/pm10.svg'

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
        return result
    }

    function cycleTrackBenchmark() {
        let cyclePath = cityState.health['percent_roads_are_cyclepath']
        if (cyclePath===null) {
            return 'Zero!! That\'s strange. Hopefully we can obtain this data someday.'
        } else if(cyclePath > 100) {
            return cityStatic.percent_roads_are_cyclepath[0].replace('[0]', cityNameState)} 
        else if(cyclePath <= 75 && cyclePath > 50) {
            return cityStatic.percent_roads_are_cyclepath[1].replace('[0]', cityNameState)}
        else if(cyclePath <= 50 && cyclePath > 25) {
            return cityStatic.percent_roads_are_cyclepath[2].replace('[0]', cityNameState)}
        else if(cyclePath <= 25) {
            return cityStatic.percent_roads_are_cyclepath[3].replace('[0]', cityNameState)}

    }

    return(
        <section class="tab-content-box">
            <div className="chart">
                <div className="container">
                    
                    <section className="sub-section-container">
                        <h1>How active is your city?</h1>
                        <div className="row">
                            <div className="col-md-6" id="bar-chart">
                                <HorizontalBar
                                data = {state}
                                options={{
                                    title:{
                                        display:false,
                                        fontSize:20
                                    },
                                    legend:{
                                        display:false,
                                        position:'top'
                                    },
                                    scales: {
                                        xAxes: [{
                                            type: 'logarithmic',
                                            ticks: {
                                                callback: function(tick, index, ticks) {
                                                    return tick
                                                }
                                            }
                                        }]
                                    }
                                }}
                                />
                            </div>
                            <div className="col-md-6" id="bar-chart">
                                <div className="vertical-middle">
                                    <h4>{cityNameState} has {cityState.health.active_mobility.y[0]} kms of road network out of which <span className="imp-unit">{cityState.health.active_mobility.y[1]} kms is footpath</span> and {cityState.health.active_mobility.y[2] || '0 (strange)'} kms is cycletrack</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="vertical-middle">
                                    <h3><span className="cycle-track-percentage">{cityNameState}</span> has <span className="cycle-track-percentage imp-unit">{(cityState.health.percent_roads_are_cyclepath || 0).toFixed(2)}%</span> of road network covered by cycle tracks.</h3>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="vertical-middle">
                                    <h3><span className="footpath-percentage">{cityNameState}</span> has <span className="imp-unit footpath-percentage">{(cityState.health.percent_roads_are_footpath || 0).toFixed(2)}%</span> of road network covered by footpaths.</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="vertical-middle">
                                    <h4>{cycleTrackBenchmark()}</h4>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="vertical-middle">
                                    <h4>{footpathBenchmark()}</h4>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="sub-section-container">
                        {footpathBenchmark()} 
                    </section>
                </div>
            </div>
 
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
