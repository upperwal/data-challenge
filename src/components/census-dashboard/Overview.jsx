import React from 'react';

import './Overview.scss';

function Overview(props) {
    const data = props.data
    const title = props.title
    const description = props.description
    const cityNameState = props.cityNameState

    console.log(data)

    /* const label = {
        states: ["States/UTs", "Nos", 0, Area],
        districts: ["Districts", "Nos", 0, Area],
        subdistricts: ["Sub-Districts", "Nos", 0, Area],
        towns: ["Towns", "Nos", 0, Area],
        villages: ["Villages", "Nos", 0, Area],
        population_total: ["Population", "Million", 1, Pop],
        population_rural: ["Rural Population", "Million", 1, Pop],
        population_urban: ["Urban Population", "Million", 1, Pop],
        avg_daily_ridership: ["Avg Daily Bus Ridership", "Nos", 0, Ridership],
        bus_fleet: ["No of public buses", "Nos", 0, Bus],
        population: ["Population", "Lakh People", 2, Pop],
        road_length: ["Road Network Length", "Km", 0, Len],
        seats_per_lakh: ["Seats in public transport", "Seats per lakh", 0, Seats]
    } */

    function overallStats(data) {
        let res = []
        if(!Array.isArray(data)) {
            return
        }
        data.forEach((o, idx) => {
            if(o.value == null || o.value == 0) {
                return
            }
            res.push(
                <div key={idx} className="col-md-4">
                    <div className="card">
                        <small>{o.label}</small>
                        <img src={o.imgSrc}/>
                        <h3 className="digits">{o.value.toFixed(o.fixTo || 0).toLocaleString()}</h3>
                        <p>{o.unitLabel}</p> 
                    </div>
                </div>
            )
        })
        return res
    }

    function renderDescription() {
        let res = []
        description.forEach((d, idx) => {
            res.push(
                <p className="overview-description">{d}</p>
            )
        })

        return res
    }

    return (
        <section className="Overview">
            <div className="city-facts">

                {/* <div className="container"> */}
                    <div className="row">
                        <div className="col-md-4 card-container-description">
                            <h2>{title}</h2>
                            {renderDescription()}
                        </div>
                        <div className="col-md-8 card-container">
                            <div className="row">
                                {overallStats(data)}
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        </section>
    )
}

export default Overview;
