import React from 'react';
import {Scatter, Doughnut} from 'react-chartjs-2';
import streetLight from './images/street-light.svg';
import safety from './images/safety.svg';
import roadSafety from './images/road.svg';

import './Security.scss';

function Security(props) {
    const cityState = props.cityState
    const cityNameState = props.cityNameState
    const data = props.data


    var pieState = {
        labels: ['January', 'February'],
        datasets: [{
            label: 'Rainfall',
            backgroundColor: [
                '#B21F00',
                '#C9DE00'
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
                            <div className="light-network">
                                <h4><span className="light-network-length ">{cityNameState}</span> has <span className="light-network-length">{lightNetwork}</span> km of roads with street lights, accounting for <span className="light-network-length">{cityState.overall.road_length}</span>% of the total road network length. </h4>  
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="safety">
                                <img src={safety} alt="safety" ></img>
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
                                display:true,
                                text:'Delhi Road Accidents',
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
                            <h4>In <span className="road-accident-fatalities">{cityNameState}</span>, <span className="road-accident-fatalities">{roadAccident}</span>% of total deaths are due to road accident fatalities. </h4>
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
        <div className="Security"> 
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="street-light">
                            <img src={streetLight} alt="Street light" ></img>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h3 className="heading">There’s no doubt that optimum street lighting significantly improves safety for drivers, riders, and pedestrians.</h3>
                    </div>
                </div>
            </div>

            {lightNetworkLength()}
            
            <div>
                <h3 className="heading">Moreover, several studies have shown that improved street lighting can promote safety and security in public spaces.</h3>
            </div>
            <div className="scatter">
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
                                    return label + ': (Ridership: ' + tooltipItem.yLabel + ', HH Expense: ' + tooltipItem.xLabel + ')';
                                }
                            }
                        }
                    }}
                />
            </div>
            <div className="heading">
                <h2 >Did you know that road injuries are among the top 10 leading causes of premature death in India?</h2>
                source: <a href="http://www.healthdata.org/india">http://www.healthdata.org/india</a>
            </div>
            {roadAccidentDeath()}
            <div className="footer">
                <h5>A quick guide to building a safer city can be found here! <br></br><a href="https://smartnet.niua.org/content/57d27450-3f73-4cab-813e-2bbb2fb6eecb">https://smartnet.niua.org/content/57d27450-3f73-4cab-813e-2bbb2fb6eecb</a></h5> 
            </div>
        </div>
    )
}

export default Security;