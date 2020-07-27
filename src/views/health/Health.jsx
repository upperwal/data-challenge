import React from 'react'
import {HorizontalBar} from 'react-chartjs-2';
import {Scatter} from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation'

import pm25 from './images/dust.svg';
import so2 from './images/pollution.svg'
import no2 from './images/air-pollution.svg'
import pm10 from './images/pm10.svg'

import CycleImg from './images/bicycle.svg'
import FootImg from './images/dog.svg'
import HealthImg from './images/health.svg'
import PollutionImg from './images/pollution_car.svg'
import PetrolImg from './images/petrol.svg'
import DieselImg from './images/gas.svg'

import './Health.scss';

function Health(props) {
    const cityState = props.cityState
    const cityNameState = props.cityNameState
    const cityStatic = props.cityStatic
    const data = props.data


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

    const scatterState = {
        datasets: [{
            backgroundColor: '#ff2b5b',
        }]
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

    function prepareScatterParkFootExpenditureData() {
        let res= []
        let cityList = []

        data.overall.norm_health_ex_vs_pcf.x.forEach((v, idx) => {
            let ex_hh = data.overall.norm_health_ex_vs_pcf.y[idx]
            if(v === null || ex_hh == null) {
                return
            }
            res.push({
                'y': ex_hh,
                'x': v
            })
            cityList.push(data.city_list[idx])
        })

        scatterState['labels'] = cityList
        scatterState.datasets[0]['data'] = res

        return scatterState
    }

    function getHealthExpenseReport() {
        let health_expense_relative = cityState.health.health_expense_relative
        let relativeTerm = 'more'
        if(health_expense_relative === null || health_expense_relative == 0) {
            return <h3>Sorry, we don't have this data for now.</h3>
        } else if(health_expense_relative < 0) {
            relativeTerm = 'less'
        }
        return <h3>{cityNameState}’s residents spend <span className="imp-unit">Rs {Math.abs(health_expense_relative).toFixed(2)} {relativeTerm}</span> than the average household in other smart cities on health annually.</h3>
    }

    return(
        <section class="tab-content-box">
            <div className="chart">
                <div className="container">
                    
                    <section className="sub-section-container">
                        <h1>Is your city built for active mobility?</h1>
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
                                    <h4>{cityNameState} has {cityState.health.active_mobility.y[0]} kms of road network out of which <span className="imp-unit">{cityState.health.active_mobility.y[1]} kms is footpath</span> and {cityState.health.active_mobility.y[2] || '0'} kms is cycle track</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row icon-container">
                            <div className="col-md-6">
                                <img src={CycleImg}/>
                            </div>
                            <div className="col-md-6">
                                <img src={FootImg}/>
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
                        <h1>Move more, save more!</h1> 
                        <h3>An active lifestyle is shown to reduce expenditure on health!</h3>
                        <div className="row">
                            <div className="col-md-6 icon-container">
                                <img src={HealthImg}/>
                            </div>
                            <div className="col-md-6">
                                {getHealthExpenseReport()}
                            </div>
                        </div>
                        <Scatter
                            data={prepareScatterParkFootExpenditureData()}
                            plugins={ChartAnnotation}
                            options={{
                                responsive:true,
                                title:{
                                    display:true,
                                    text:'Active Spaces in a city Annual Household Expenditure vs (parks, cycle tracks, foot paths)',
                                    fontSize: 12
                                },
                                legend:{
                                    display: false,
                                    position:'top'
                                },
                                scales: {
                                    xAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Normalised Score combining no. of parks, footpath and cycle track length',
                                        }
                                    }],
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Normalised Annual Health Expenditure',
                                        }
                                    }]
                                },
                                tooltips: {
                                    callbacks: {
                                        label: function(tooltipItem, data) {
                                            var label = data.labels[tooltipItem.index];
                                            return label + ': (Ridership: ' + tooltipItem.xLabel + ', HH Expense: ' + tooltipItem.yLabel + ')';
                                        }
                                    }
                                },
                                annotation: {
                                    annotations: [
                                        {
                                            // drawTime: "afterDatasetsDraw",
                                            // id: "hline",
                                            type: "line",
                                            mode: "horizontal",
                                            scaleID: "y-axis-1",
                                            value: 0,
                                            borderColor: "black",
                                            borderWidth: 1,
                                            label: {
                                                backgroundColor: "red",
                                                content: "Mean Expenditure",
                                                enabled: false
                                            }
                                        },
                                        {
                                            // drawTime: "afterDatasetsDraw",
                                            // id: "hline",
                                            type: "line",
                                            mode: "vertical",
                                            scaleID: "x-axis-1",
                                            value: 0,
                                            borderColor: "black",
                                            borderWidth: 1,
                                            label: {
                                                backgroundColor: "red",
                                                content: "Mean Ridership",
                                                enabled: false
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                        <hr/>
                        <a href="http://mohua.gov.in/upload/uploadfiles/files/NMTGuidanceFINAL.pdf" target="_blank"><h3>Check out these guidelines to build a healthier city!</h3></a>

                        <div className="short-excerpt">
                            <h3>Here’s a short excerpt for you</h3>
                            <div className="row">
                                
                                <div className="col-md-6 right-aligned">
                                    <h5>Promotion of walking and cycling in cities requires a multi-pronged approach which involves policy, planning, design and implementation. Some of the actionable steps taken by leading cities across the world which can help promote NMT usage are:</h5>
                                    <small>Source: Ministry of Housing and Urban Affairs</small>
                                </div>
                                <div className="col-md-6 left-aligned">
                                    <ul>
                                        <li>Provision of dedicated, high quality and user friendly facilities such as shaded pedestrian pathways and cycle tracks supported by public amenities.</li>
                                        <li>Provision of a safe and secure environment such as parking of bicycles, street lighting and organized spaces for the informal sector.</li>
                                        <li>Integration of walking and cycling facilities with transit.</li>
                                        <li>Planning for compact and walkable neighbourhoods with mixed land uses.</li>
                                        <li>Leveraging public events such as Car Free Day, Raahgiri, and other similar initiatives to promote the message of sustainable transportation.</li>
                                        <li>Disincentivise usage of motorised modes by making motorists pay the full societal costs of their transport.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                    </section>

                    <section className="sub-section-container">
                        <h1>Breath Easy with Green Mobility</h1>
                        <h3>Investment in greener transport systems can improve the quality of air we breathe and help us live longer, healthier lives!</h3>

                        <div className="chart">

                            <div className="container">
                                <div className="row pollution-cards">
                                    <div className="col-md-3">
                                        <div className="card ">
                                            <div className="card-image">
                                                <img src={no2}></img>
                                            </div>
                                            <h3 className="digits pop_digits">{cityState.health.avg_annual_pollution.NO2}</h3>
                                            <small>gm/cu.m</small>
                                            <p>NO2</p> 
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card">
                                            <div className="card-image">
                                                <img src={pm25} ></img>
                                            </div>
                                            <h3 className="digits pop_digits">{cityState.health.avg_annual_pollution['PM2.5']}</h3>
                                            <small>gm/cu.m</small>
                                            <p>PM2.5</p> 
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card">
                                            <div className="card-image">
                                                <img src={pm10} ></img>
                                            </div>
                                            <h3 className="digits pop_digits">{cityState.health.avg_annual_pollution.PM10}</h3>
                                            <small>gm/cu.m</small>
                                            <p>PM10</p> 
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card">
                                            <div className="card-image">
                                                <img src={so2} ></img>
                                            </div>
                                            <h3 className="digits pop_digits">{cityState.health.avg_annual_pollution.SO2.toFixed(0)}</h3>
                                            <small>gm/cu.m</small>
                                            <p>SO2</p> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr/>
                        <br/>
                        <br/>

                        <h3>Did you know that air pollution due to fossil fuels costs India $150 billion and a loss of 490 million workdays every year?</h3>
                        <div className="chart">

                            <div className="container">
                                <div className="row pollution-cards">
                                    <div className="col-md-6">
                                        <div className="card ">
                                            <div className="card-image">
                                                <img className="small-image" src={DieselImg}></img>
                                            </div>
                                            <h3 className="digits pop_digits">{(cityState.health.fossil_fuel.per_capita || 0).toFixed(1)}</h3>
                                            <small>Litre</small>
                                            <p>Per Capita</p> 
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-image">
                                                <img className="small-image" src={PetrolImg} ></img>
                                            </div>
                                            <h3 className="digits pop_digits">{(cityState.health.fossil_fuel.per_km || 0).toFixed(1)}</h3>
                                            <small>Litre</small>
                                            <p>Per Km</p> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a class="large-padding" href="https://smartnet.niua.org/content/db8f78b4-5e68-4ffb-a603-4d7e7f4ab3c3" target="_blank"><h3>Join the fight and shift to non-fossil fuel based urban transport! Learn more about how to green your transport system</h3></a>

                        <div className="short-excerpt">
                            <h3>Here’s a short excerpt for you</h3>
                            <div className="row">
                                
                                <div className="col-md-4">
                                    <img src={PollutionImg} height="200px"/>
                                </div>
                                <div className="col-md-8">
                                    <p className="quote">“The “Shift” component seeks to encourage a modal shift from motorized travel to more environment-friendly and energy-efficient modes. This can be achieved by promoting non-motorized (walking and cycling) and public transport. Initiatives to increase seamless, frequent and affordable public transport systems will lower the associated emissions per passenger-kilometer traveled, as well as reduce congestion while improving access and travel time.”</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    )
}

export default Health;
