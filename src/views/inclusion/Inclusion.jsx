import React from 'react'
import {Bar, HorizontalBar, Scatter} from 'react-chartjs-2';

import './Inclusion.scss'

function Inclusion(props) {
    const data = props.data;
    const cityNameState = props.cityNameState

    const state = {
        labels: data.overall.spend_per_km_road.x , //['Total', 'Cycle', 'foot','Road Length'],
        datasets: [
          {
            backgroundColor: '#ff2b5b',
            data: data.overall.spend_per_km_road.y
          }
        ]
    }

    const scatterState = {
        datasets: [{
            backgroundColor: '#ff2b5b',
        }]
    }

    function prepareScatterData() {
        let res= []
        let cityList = []

        data.overall.public_transport_ridership.forEach((v, idx) => {
            if(v === null || data.overall.annual_hh_expenditure[idx] == null) {
                return
            }
            res.push({
                'x': data.overall.annual_hh_expenditure[idx],
                'y': v
            })
            cityList.push(data.city_list[idx])
        })

        scatterState['labels'] = cityList
        scatterState.datasets[0]['data'] = res

        return scatterState
    }

    function spendingCredit() {
        let spend = data[cityNameState].equality.spend_per_km_road * 100 - data.overall.mean_spend_per_km_road
        if(spend < 0) {
            return <h3>It’s time to catch up! <b>{cityNameState}</b> spends <b>Rs {Math.abs(spend.toFixed(1))} lakh</b> less than the average Smart City in India.</h3>
        } else {
            return <h3>Way to go! <b>{cityNameState}</b> spends <b>Rs {spend.toFixed(1)} lakh</b> more than the average Smart City in India.</h3>
        }
    }

    console.log(prepareScatterData())

    return(
        <section className="Inclusion tab-content-box">
            <section>
                <h3>Good quality road infrastructure is essential for improved mobility in your city!</h3>
                <div className="row">
                    <div className="col-md-6 spending-bar">
                        <Bar
                            data = {state}
                            options={{
                                title:{
                                    display:true,
                                    text:'Expenditure on road maintenance per km in the city',
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
                                            labelString: 'Spendings per Km in Lakh',
                                        },
                                        type: 'logarithmic'
                                    }]
                                }  
                            }}
                        />
                        {spendingCredit()}
                    </div>
                    <div className="col-md-6">
                        <div className="main-content">
                            <h1>In 2019, {cityNameState} spent <span className="imp-unit">{(data[cityNameState].equality.spend_per_km_road*100).toFixed(2)} lakh rupees per km</span> on road maintenance</h1>
                        </div>
                        

                    
                        
                    </div>
                </div>
            </section>


            <section>
                <h3>The first step to a more inclusive city is accessible public transport for all! Let’s review where {cityNameState} is placed compared to the rest of urban India.</h3>

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
                                    labelString: 'Public Transport Ridership',
                                },
                                type: 'logarithmic'
                            }],
                            xAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Avg Annual Household Expenditure (Rs)',
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
            
            </section>
        </section>
    )
}

export default Inclusion;
