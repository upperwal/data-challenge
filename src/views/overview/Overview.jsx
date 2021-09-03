import React from 'react'

import Pop from './img/population.svg'
import Area from './img/area.svg'
import Len from './img/distance.svg'
import Seats from './img/seats.svg'
import Ridership from './img/ridership.svg'
import Bus from './img/bus.svg'

import './Overview.scss'

function Overview(props) {
    const cityState = props.cityState
    const cityNameState = props.cityNameState

    console.log(cityState)

    const label = {
        area: ["City Area", "Sq Km Area", 0, Area],
        avg_daily_ridership: ["Avg Daily Bus Ridership", "Nos", 0, Ridership],
        bus_fleet: ["No of public buses", "Nos", 0, Bus],
        population: ["Population", "Lakh People", 2, Pop],
        road_length: ["Road Network Length", "Km", 0, Len],
        seats_per_lakh: ["Seats in public transport", "Seats per lakh", 0, Seats]
    }

    function overallStats(data) {
        let res = []
        Object.keys(data).forEach((o, idx) => {
            if(data[o] == null || data[o] == 0) {
                return
            }
            let norm_value = 0
            if(o === 'population') {
                norm_value = data[o] / 1e5
            } else {
                norm_value = data[o]
            }
            res.push(
                <div key={idx} className="col-md-3">
                    <div className="card">
                        <small>{label[o][0]}</small>
                        <img src={label[o][3]}/>
                        <h3 className="digits">{norm_value.toFixed(label[o][2])}</h3>
                        <p>{label[o][1]}</p> 
                    </div>
                </div>
            )
        })
        return res
    }

    return (
        <section className="Overview">
            <div className="city-facts">
                
                {/* <h2>Do you know that Delhi has the largest road network with total road length {cityState.overall.road_length} kms?</h2><br/>

                <h2>but it also has the highest fatality rate of XX %</h2> */}

                <h2>Ready, set, go! Here’s the rundown on {cityNameState}</h2>
                
                <div className="container">
                    <div className="row">
                        {overallStats(cityState.overall)}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Overview;
