import React from 'react';
import {Scatter, Doughnut} from 'react-chartjs-2';
import streetLight from './images/street-light.svg';
import safety from './images/safety.svg';
import roadSafety from './images/road.svg';
import car from './images/car.svg';

import './Security.scss';

function Security(props) {
    const cityState = props.cityState
    const cityNameState = props.cityNameState
    const data = props.data


    var pieState = {
        labels: ['Road Accident', 'Others'],
        datasets: [{
            label: 'Rainfall',
            backgroundColor: [
                '#ff2b5b',
                '#bbb'
            ],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000'
            ],
            data: [cityState.safety.percent_road_acc_fatalities.toFixed(2), 100-cityState.safety.percent_road_acc_fatalities.toFixed(2)]
        }] 
    };

    const scatterState = {
        datasets: [{
            backgroundColor: '#ff2b5b',
        }]
    }

    function prepareScatterData() {
        let res= []
        let cityList = []

        data.overall.crimes_against_women.forEach((v, idx) => {
            if(v === null || data.overall.annual_hh_expenditure[idx] == null) {
                return
            }
            res.push({
                'x': data.overall.percent_roads_w_lights[idx],
                'y': v
            })
            cityList.push(data.city_list[idx])
        })

        scatterState['labels'] = cityList
        scatterState.datasets[0]['data'] = res

        return scatterState
    }

    function lightNetworkLength() {
        var lightNetwork = cityState.safety.percent_light_road_length.toFixed(2)
        if (lightNetwork ===null) return;
        var result=''
        if(lightNetwork >75) {
            result = 'Great work! You’re so close to the finish line, ' + cityNameState + '! Small steps towards improving street lighting can help build a safer city for all! '
        }
        else if(lightNetwork <=75 && lightNetwork >50) {
            result = 'You’re on the right track, ' + cityNameState + '! Small steps towards improving street lighting can help build a safer city for all! '
        }
        else if(lightNetwork <=50) {
            result = 'There’s room to improve, ' + cityNameState + '. Small steps towards improving street lighting can help build a safer city for all!'
        }
        return (
            <div className="light-network-length-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="street-light">
                                <img src={streetLight} alt="Street light" ></img>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="light-network">
                                <h4><span className="light-network-length">{cityNameState}</span> has <span className="light-network-length imp-unit">{cityState.overall.road_length} km</span> of roads with street lights, accounting for <span className="light-network-length imp-unit">{lightNetwork}%</span> of the total road network length. </h4>  
                            </div>
                            <h4>{result}</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function roadAccidentDeath() {
        var roadAccident = cityState.safety.percent_road_acc_fatalities.toFixed(2)
        if (roadAccident ===null) return;
        var result=''
        if(roadAccident >15) {
            result = 'Red flag, ' + cityNameState + '! Small steps towards improving street lighting can help build a safer city for all! '
        }
        else if(roadAccident <=15 && roadAccident >11) {
            result = 'There’s room to improve, ' + cityNameState + '! Help build a safer city by improving road safety for all. '
        }
        else if(roadAccident <=11) {
            result = 'You’re on the right track, ' + cityNameState + '! Help build a safer city by improving road safety for all. '
        }
        return (
            <div className="road-accident-fatalities-header">
                {console.log(result)}
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                        <Doughnut
                            data={pieState}
                            options={{
                                title:{
                                display:false,
                                text:'',
                                fontSize:20
                                },
                                legend:{
                                display:true,
                                position:'right'
                                }
                            }}
                        />
                        </div>
                        <div className="col-md-6 ">
                            <div className="vertical-middle">
                            <h4>In <span className="road-accident-fatalities">{cityNameState}</span>, <span className="road-accident-fatalities imp-unit">{roadAccident}%</span> of total deaths are due to road accident fatalities. </h4>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-12 road-safety">
                        <div className="safety">
                            <img src={roadSafety} alt="roadsafety" ></img>
                        </div>
                        <h4>{result}</h4>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className="tab-content-box">
            <div className="Security"> 
                <div className="container">

                    <section className="sub-section-container">
                        <h1>Light Up! </h1>
                        <div className="row">
                            <div className="col-md-6">
                                <h2> How safe are your city streets?</h2>
                                <h3 className="heading">There’s no doubt that optimum street lighting significantly improves safety for drivers, riders, and pedestrians.</h3>
                            </div>
                            <div className="col-md-6">
                                <div className="car">
                                    <img src={car} alt="Street light" ></img>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        {lightNetworkLength()}
                    </section>
                </div>
                <section className="sub-section-container">
                    <h1 >Moreover, several studies have shown that improved street lighting can promote safety and security in public spaces.</h1>
                
                    <div>
                        <Scatter
                            data={prepareScatterData()}
                            options={{
                                title:{
                                    display:true,
                                    text:'',
                                    fontSize: 12
                                },
                                legend:{
                                    display: false,
                                    position:'top'
                                },
                                scales: {
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Crimes against women',
                                        },
                                        type: 'logarithmic'
                                    }],
                                    xAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: '% road km covered by street lights',
                                        },
                                        type: 'logarithmic'
                                    }]
                                },
                                tooltips: {
                                    callbacks: {
                                        label: function(tooltipItem, data) {
                                            var label = data.labels[tooltipItem.index];
                                            return label + ': (Crime against women: ' + tooltipItem.yLabel + ', % Street light: ' + tooltipItem.xLabel + ')';
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </section> 
                <section className="sub-section-container">   
                    <div className="heading">
                        <h1>The Value of a Life</h1>
                        <h3>Did you know that road injuries are among the top 10 leading causes of premature death in India?</h3>
                        <a href="http://www.healthdata.org/india">source: healthdata.org</a>
                    </div>
                    {roadAccidentDeath()}
                    <hr></hr>
                    <div className="footer">
                        <a href="https://smartnet.niua.org/content/57d27450-3f73-4cab-813e-2bbb2fb6eecb"><h3>A quick guide to building a safer city can be found here! </h3></a> 
                    </div>
                    <div className="short-excerpt">
                        <div className="row">
                            <div className="col-md-5">
                                <h3>Here’s a short excerpt for you</h3>
                            </div>
                            <div className="col-md-7">
                                <p className="quote">“Clearly, the road injury problems that generate at urban level cannot be entirely solved without measurements specific for urban areas. Most of the urban injury accidents and fatalities involve vulnerable road users because of being unprotected from motorized traffic and existence of organized road spaces only for facilitating the movements of motorized vehicles and not vulnerable road users who are mostly pedestrians, cyclists and two wheelers.”</p>
                                <p>Source: Ministry of Urban Development</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    )
}

export default Security;