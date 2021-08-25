import React, {useState, useEffect} from 'react';
import {Scatter, Bar} from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Overview from './Overview';

import WithInternetData from './with_internet.json';

import PopImage from './img/population.svg'
import AreaImage from './img/area.svg'
import DistanceImage from './img/distance.svg'

function Economy(props) {

    const [state, setState] = useState("All")
    const [settlementType, setSettlementType] = useState("All")
    const barData = {
        datasets: [{
            label: 'Households having computer with internet',
            backgroundColor: '#f6264c'
        }]
    };


    function onInputChange(e) {
        console.log(e.target)
        if(e.target.name == 'state') {
            setState(e.target.value)
        } else if(e.target.name == 'settlementType') {
            setSettlementType(e.target.value)
        }
    }

    function prepareBarData() {
        let res= []
        let cityList = []

        WithInternetData.forEach((item) => {
            if(item.asset_computerWithInternet_per === null) {
                return
            }
            if(item.state !== state && state !== 'All') {
                return
            }
            if(item.settlementType !== settlementType && settlementType !== 'All') {
                return
            }
            res.push(item.asset_computerWithInternet_per)
            cityList.push(item.UA_city)
        })

        barData['labels'] = cityList
        barData.datasets[0]['data'] = res

        return barData
    }

    function renderStateMenu() {
        let stateList = props.stateList
        let res = []

        stateList.forEach((s, idx) => {
            res.push(
                <MenuItem key={idx} value={s}>{s}</MenuItem>
            )
        })

        return res
    }

    function renderSettlementType() {
        let typeList = props.settlementTypeList
        let res = []

        typeList.forEach((s, idx) => {
            res.push(
                <MenuItem key={idx} value={s}>{s}</MenuItem>
            )
        })

        return res
    }
    
    return (
        <div className="census-item-section">
            <Overview 
                data={[
                    {
                        label: 'Population',
                        value: 1210.6,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Million'
                    },
                    {
                        label: 'Rural Population',
                        value: 833.5,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Million'
                    },
                    {
                        label: 'Urban Population',
                        value: 377.1,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Million'
                    }
                ]}
                title="Economy"
                description={[
                    "The Houselisting and Housing Census was conducted in 2011 to generate information on a large number of social and economic indicators relating to households across the country. This Economic data refers to socioeconomic information for all the cities in India expressed statistically including asset holding, poverty and unemployment change, asset holding index (AHI) and economic permanence index.(EPI)"
                ]}
            />
            <div className="row">
                <div className="col-md-4 insights-box">
                    <p>Phasellus dictum arcu sit amet leo tempor bibendum. Aliquam eu imperdiet nulla, sed consectetur dui. Mauris velit libero, venenatis a congue vel, luctus id nunc. Suspendisse a laoreet metus.</p>
                    <FormControl className="full-width-select">
                        <InputLabel id="state-literacy-select-label">State</InputLabel>
                        <Select
                            labelId="state-literacy-select-label"
                            id="state-literacy-select"
                            name="state"
                            value={state}
                            onChange={onInputChange}
                        >
                            {renderStateMenu()}
                        </Select>
                    </FormControl>
                    <FormControl className="full-width-select">
                        <InputLabel id="settlement-literacy-select-label">Settlement Type</InputLabel>
                        <Select
                            labelId="settlement-literacy-select-label"
                            id="settlement-literacy-select"
                            name="settlementType"
                            value={settlementType}
                            onChange={onInputChange}
                        >
                            {renderSettlementType()}
                        </Select>
                    </FormControl>
                </div>
                <div className="col-md-8">
                    <Bar data={prepareBarData()} options={{
                        scales: {
                            yAxes: [
                              {
                                ticks: {
                                  beginAtZero: true,
                                },
                              },
                            ],
                          },
                    }}/>
                </div>
            </div>
            
        </div>
    )

}

export default Economy;