import React from 'react'

function Overview(props) {
    const cityState = props.cityState
    //const cityNameState = props.cityNameState
    return (
        <div className="city-facts">
            <h2>Do you know that Delhi has the largest road network with total road length {cityState.overall.road_length} kms?</h2><br/>

            <h2>but it also has the highest fatality rate of XX %</h2>
            
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card">
                            <b> {cityState.overall.population}</b>
                            <p> People</p> 

                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <b>{cityState.overall.area}</b>
                            <p>Total Area</p> 
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <b>{cityState.overall.bus_fleet}</b>
                            <p>Buses</p> 
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <b>{cityState.overall.road_length}</b>
                            <p>Kms Road</p> 
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card">
                            <b>{cityState.overall.seats_per_lakh}</b>
                            <p>Seat Per lakh population</p> 
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <b>{cityState.overall.avg_daily_ridership}</b>
                            <p>Ridership</p> 
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <b>y/n</b>
                            CMP
                            <p>(click link)</p> 
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <b></b>
                            <p></p> 
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Overview;
