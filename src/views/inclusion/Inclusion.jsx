import React from 'react'
import {Bar, HorizontalBar, Scatter} from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation'

import './Inclusion.scss'

function Inclusion(props) {
    const data = props.data;
    const cityNameState = props.cityNameState
    let internalState = {}

    const state = {
        labels: data.overall.spend_per_km_road.x ,
        datasets: [
          {
            radius: 4,
            pointHoverRadius: 8,
            backgroundColor: '#ff2b5b',
            data: data.overall.spend_per_km_road.y
          }
        ]
    }

    const scatterState = {
        datasets: [{
            radius: 4,
            pointHoverRadius: 8,
            backgroundColor: '#ff2b5b',
        }]
    }

    const scatterSeatsSlumState = {
        datasets: [{
            radius: 4,
            pointHoverRadius: 8,
            backgroundColor: '#ff2b5b',
        }]
    }

    function prepareRoadSpendData() {
        let data = []
        state.datasets[0].data.forEach((v, idx) => {
            data.push({
                x: state.labels[idx],
                y: v
            })
        })
        data.sort((l, r) => {
            return l.y < r.y ? 1 : -1;
        })

        let x = [], y = []
        data.forEach(v => {
            x.push(v.x)
            y.push(v.y.toFixed(2))
        })

        state.labels = x
        state.datasets[0].data = y

        return state
    }

    

    function prepareScatterData() {
        let res= []
        let cityList = []

        data.overall.public_transport_ridership.forEach((v, idx) => {
            if(v === null || data.overall.annual_hh_expenditure[idx] == null || v < 24 || data.overall.annual_hh_expenditure[idx] < 100000) {
                return
            }
            res.push({
                'y': data.overall.annual_hh_expenditure[idx],
                'x': v
            })
            cityList.push(data.city_list[idx])
        })

        scatterState['labels'] = cityList
        scatterState.datasets[0]['data'] = res

        return scatterState
    }

    function prepareScatterDataSeatsSlums() {
        let res= []
        let cityList = []
        let mean_seats = 0
        let mean_slum = 0
        let cnt = 0
        
        data.overall.seats_per_lakh.forEach((v, idx) => {
            if(v === null || data.overall.no_people_in_slums[idx] == null || v == 0 || data.overall.no_people_in_slums[idx] == 0) {
                return
            }
            mean_seats = mean_seats + v
            mean_slum += data.overall.no_people_in_slums[idx]
            cnt++
            res.push({
                'x': data.overall.no_people_in_slums[idx],
                'y': v.toFixed(2)
            })
            cityList.push(data.city_list[idx])
        })

        internalState['scatterDataSeatsSlums'] = {
            'mean_seats': mean_seats / cnt,
            'mean_slum': mean_slum / cnt
        }

        scatterSeatsSlumState['labels'] = cityList
        scatterSeatsSlumState.datasets[0]['data'] = res

        return scatterSeatsSlumState
    }

    function spendingCredit() {
        let spend = data[cityNameState].equality.spend_per_km_road * 100 - data.overall.mean_spend_per_km_road
        if(spend < 0) {
            return <h3>It’s time to catch up! <b>{cityNameState}</b> spends <b className="imp-unit">Rs {Math.abs(spend.toFixed(1))} lakh less</b> than the average Smart City in India.</h3>
        } else {
            return <h3>Way to go! <b>{cityNameState}</b> spends <b className="imp-unit">Rs {spend.toFixed(1)} lakh more</b>  than the average Smart City in India.</h3>
        }
    }

    function relativeComputation( meanValue, actualValue, round) {
        let diff = actualValue - meanValue
        if(diff < 0) {
            return Math.abs(diff).toFixed(round) + ' less';
        } else {
            return diff.toFixed(round) + ' more';
        }
    }

    function ridershipExpenseCredit() {
        let hh = data[cityNameState].health.annual_hh_expenditure
        let hh_mean = data.overall.mean_annual_hh_expenditure
        let rider = data[cityNameState].overall.avg_daily_ridership
        let rider_mean = data.overall.mean_public_transport_ridership
        
        if(hh <= hh_mean) {
            if(rider <= rider_mean) {
                return <h3>There’s room for improvement! <b>{cityNameState}</b> needs to build an accessible and inclusive public transport system.</h3>
            } else {
                return <h3>Great Work! <b>{cityNameState}’s</b> public transport is accessible for all! Residents with a lower annual household expenditure make more trips on public transport.</h3>
            }
        } else {
            if(rider <= rider_mean) {
                return <h3>In <b>{cityNameState}</b>, a higher annual household expenditure results in lower preference for public transport.</h3>
            } else {
                return <h3>Great work! <b>{cityNameState}</b> has successfully cultivated a dedicated public transport ridership! Despite their higher annual household expenditure, city name’s residents prefer public transport </h3>
            }
        }
    }

    function seatsSlumCredit() {
        let seats = data[cityNameState].overall.seats_per_lakh
        let seats_mean = data.overall.mean_seats_per_lakh
        let slum = data[cityNameState].health.no_people_in_slums
        let slum_mean = data.overall.mean_no_people_in_slums
        
        if(seats <= seats_mean) {
            if(slum <= slum_mean) {
                return <h3>You’re on the right track, <b>{cityNameState}</b>! Increasing the availability of affordable public transport is an essential factor for transforming lives and livelihoods of slum dwellers.</h3>
            } else {
                return <h3>There’s room to improve, <b>{cityNameState}</b>! Increasing the availability of affordable public transport is an essential factor for transforming lives and livelihoods of slum dwellers.</h3>
            }
        } else {
            if(slum <= slum_mean) {
                return <h3>You’re on the right track, <b>{cityNameState}</b>! Increasing the availability of affordable public transport is an essential factor for transforming lives and livelihoods of slum dwellers.</h3>
            } else {
                return <h3>You’ve got it right, <b>{cityNameState}</b>! Increasing the availability of affordable public transport is an essential factor for transforming lives and livelihoods of slum dwellers.</h3>

            }
        }
    }

    let seatSlumData = prepareScatterDataSeatsSlums()
    
    return(
        <section className="Inclusion tab-content-box">
            <div className="container">
                <section className="sub-section-container">
                    <h1>Rally for Roads!</h1>
                    <h3>Good quality road infrastructure is essential for improved mobility in your city!</h3>
                    <div className="row">
                        <div className="col-md-12 spending-bar">
                            <Bar
                                data = {prepareRoadSpendData()}
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
                            
                        </div>
                        <div className="col-md-6">
                            <div className="vertical-middle">
                                <h1>In 2019, {cityNameState} spent <span className="imp-unit">{(data[cityNameState].equality.spend_per_km_road*100).toFixed(2)} lakh rupees per km</span> on road maintenance</h1>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="vertical-middle">
                                {spendingCredit()}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="sub-section-container">
                    <h1>Don’t miss the bus!</h1>
                    <h3>The first step to a more inclusive city is accessible public transport for all! Let’s review where {cityNameState} is placed compared to the rest of urban India.</h3>
                    <div>
                        <h5 className="description">Affordable public transport is the first step. Does {cityNameState} make the cut?</h5>
                        <Scatter
                            data={prepareScatterData()}
                            plugins={[ChartAnnotation]}
                            options={{
                                responsive:true,
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
                                    xAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Public Transport Ridership',
                                        },
                                        type: 'logarithmic'
                                    }],
                                    yAxes: [{
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
                                            return label + ': (HH Expense: ' + tooltipItem.yLabel + ', Ridership: ' + tooltipItem.xLabel + ')';
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
                                            value: data.overall.mean_annual_hh_expenditure,
                                            borderColor: "black",
                                            borderWidth: 1,
                                            label: {
                                                backgroundColor: "red",
                                                content: "Mean Expenditure",
                                                enabled: true
                                            }
                                        },
                                        {
                                            // drawTime: "afterDatasetsDraw",
                                            // id: "hline",
                                            type: "line",
                                            mode: "vertical",
                                            scaleID: "x-axis-1",
                                            value: data.overall.mean_public_transport_ridership,
                                            borderColor: "black",
                                            borderWidth: 1,
                                            label: {
                                                backgroundColor: "red",
                                                content: "Mean Ridership",
                                                enabled: true
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                        <div className="row ">
                            <div className="col-md-6 right-aligned">
                                <h4>The average daily ridership on public transport in an Indian Smart City is <span className="imp-unit">{(data.overall.mean_public_transport_ridership).toFixed(2)} people</span> </h4>
                            </div>
                                <div className="col-md-6 left-aligned">
                                    <h4>{cityNameState} has <span className="imp-unit">{relativeComputation(data.overall.mean_public_transport_ridership, data[cityNameState].overall.avg_daily_ridership || 0, 0)}</span> public transport riders than average. </h4>
                                </div>
                            <div className="col-md-6 right-aligned">
                                <h4>The average annual household expenditure in an Indian Smart City is <span className="imp-unit">Rs. {(data.overall.mean_annual_hh_expenditure).toFixed(2)}</span></h4>
                            </div>
                            <div className="col-md-6 left-aligned">
                                <h4>{cityNameState}’s residents spend <span className="imp-unit">Rs {relativeComputation(data.overall.mean_annual_hh_expenditure, data[cityNameState].health.annual_hh_expenditure || 0, 2)}</span> than average. </h4>
                            </div>
                        </div>
                        
                    </div>
                    {ridershipExpenseCredit()}
                
                </section>

                <section className="sub-section-container">
                    <h1>Move Forward Together!!</h1>
                    <div>
                        <h5>Let’s take a second look. The public transport supply in {cityNameState} is compared to the population of low income residents in the city. Here, the number of slum dwellers is used as a suitable proxy for low income residents. </h5>
                        <Scatter
                            data={seatSlumData}
                            plugins={[ChartAnnotation]}
                            options={{
                                responsive:true,
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
                                    xAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'People residing in slums',
                                        },
                                        type: 'logarithmic'
                                    }],
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Seats per lakh population',
                                        },
                                        type: 'logarithmic'
                                    }]
                                },
                                tooltips: {
                                    callbacks: {
                                        label: function(tooltipItem, data) {
                                            var label = data.labels[tooltipItem.index];
                                            return label + ': (Seats: ' + tooltipItem.yLabel + ', People in Slum: ' + tooltipItem.xLabel + ')';
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
                                            value: internalState.scatterDataSeatsSlums.mean_seats,
                                            borderColor: "black",
                                            borderWidth: 1,
                                            label: {
                                                backgroundColor: "red",
                                                content: "Mean no of seats",
                                                enabled: true
                                            }
                                        },
                                        {
                                            // drawTime: "afterDatasetsDraw",
                                            // id: "hline",
                                            type: "line",
                                            mode: "vertical",
                                            scaleID: "x-axis-1",
                                            value: internalState.scatterDataSeatsSlums.mean_slum,
                                            borderColor: "black",
                                            borderWidth: 1,
                                            label: {
                                                backgroundColor: "red",
                                                content: "Mean no of people in slums",
                                                enabled: true
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                        <div className="row ">
                            <div className="col-md-6 right-aligned">
                                <h4>The average number of seats available on public transport per lakh residents in an Indian Smart City is <span className="imp-unit">{(data[cityNameState].overall.seats_per_lakh || 0).toFixed(1)}</span> </h4>
                            </div>
                                <div className="col-md-6 left-aligned">
                                    <h4>{cityNameState} has <span className="imp-unit">{relativeComputation(internalState.scatterDataSeatsSlums.mean_seats, data[cityNameState].overall.seats_per_lakh || 0, 0)}</span> available seats per lakh residents on public transport than average. </h4>
                                </div>
                            <div className="col-md-6 right-aligned">
                                <h4>The average number of slum dwellers in an Indian Smart City is <span className="imp-unit">{data[cityNameState].health.no_people_in_slums || 0}</span></h4>
                            </div>
                            <div className="col-md-6 left-aligned">
                                <h4>{cityNameState} has <span className="imp-unit">{relativeComputation(internalState.scatterDataSeatsSlums.mean_slum, data[cityNameState].health.no_people_in_slums || 0, 0)}</span> residents than average living in slums. </h4>
                            </div>
                        </div>
                        
                    </div>
                    {seatsSlumCredit()}
                    <br/>
                    <a href="https://smartnet.niua.org/content/dd309560-d242-401d-8162-e0e7fd502a9e" target="_blank"><h3>Here’s how {cityNameState} can move forward together! </h3></a>

                    <div className="short-excerpt">
                        <div className="row">
                            
                            <div className="col-md-5 right-aligned">
                                <h3 className="no-margin-top">Here’s a short excerpt for you</h3>
                            </div>
                            <div className="col-md-7 left-aligned">
                                <p className="quote">“Special attention should be given to improving access to efficient public transit in India to ensure that all citizens have reliable and affordable transportation. As public transit operates on fixed routes and schedules, improving first- and last-mile connectivity will be paramount in maintaining, or improving India’s existing mode share of public transit. Improving public transit efficiency and convenience with route rationalization and better vehicles will also support public transit."</p>
                            </div>
                        </div>
                    </div>
                
                </section>
                
            </div>
        </section>
    )
}

export default Inclusion;
