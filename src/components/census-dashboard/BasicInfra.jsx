import React, {useState, useEffect} from 'react';
import {Scatter, Bar} from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Overview from './Overview';

import BasicInfraData from './basic_infra.json';
import SlumPopData from './slum_pop.json';
import IndexData from './index.json';

import PopImage from './img/population.svg'
import AreaImage from './img/area.svg'
import DistanceImage from './img/distance.svg'

function BasicInfra(props) {

    const [state, setState] = useState("All")
    const [settlementType, setSettlementType] = useState("All")
    const paramMap = {
        'Percent households with bathroom within premises': 'bathroom_withinPremises_HH_per',
        'Percent households with source of fuel as gas': 'sourceOfFuel_gas_HH_per',
        'Percent households with electricity as the main source of lighting': 'mainSourceOfLighting_Electricity_HH_per',
        'Percent households availing banking services': 'availingBankingServices_HH_per',
        'Percent households with drinking source within primises': 'drinkingWaterSourece_withinPremises_HH_per',
        'Percent households with latrine facility along with flush': 'latrinFacility_flushLatrineWithPipedSewerWithinPremises_HH_per',
        'Percent households with latrine facility': 'latrinFacility_withinPremises_HH_per',
        'Percent households with watewater outlet connected with closed drainage': 'wasteWater_outletConnectedToClosedDrainage_HH_per'
    }
    const [parameter, setParameter] = useState("Percent households with bathroom within premises")

    function onInputChange(e) {
        console.log(e.target)
        if(e.target.name == 'state') {
            setState(e.target.value)
        } else if(e.target.name == 'settlementType') {
            setSettlementType(e.target.value)
        } else if(e.target.name === 'parameter') {
            setParameter(e.target.value)
        }
    }

    function prepareVariousParamBarData() {
        let res= []
        let cityList = []
        let barData = {
            datasets: [
                {
                    label: parameter,
                    backgroundColor: '#f6264c'
                }
            ]
        };

        BasicInfraData.forEach((item) => {
            if(item[paramMap[parameter]] === null) {
                return
            }
            if(item.state !== state && state !== 'All') {
                return
            }
            if(item.settlementType !== settlementType && settlementType !== 'All') {
                return
            }
            res.push(item[paramMap[parameter]])
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

    function renderParamMenu() {
        let res = []

        Object.keys(paramMap).forEach((s, idx) => {
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
                title="Basic Infrastructure"
                description={[
                    "Along with socioeconomic data, the Houselisting and Housing Census was also conducted to identify each building/census house and also to ascertain the quality of the census house, amenities accessible to it and assets available to the households living in those census houses. This Housing data refers to socioeconomic information for all the cities in India expressed statistically including housing quality, occupancy, housing amenities, share of  housing stock and housing index."
                ]}
            />

            <div className="row">
                <div className="col-md-4 insights-box">
                    <h4>Basic Infrastructure Parameters</h4>
                    <FormControl className="full-width-select">
                        <InputLabel id="parameter-select-label">Parameters</InputLabel>
                        <Select
                            labelId="parameter-select-label"
                            id="parameter-select"
                            name="parameter"
                            value={parameter}
                            onChange={onInputChange}
                        >
                            {renderParamMenu()}
                        </Select>
                    </FormControl>
                    <p>The charts show the value as the percentage of households for various basic infrastructure parameters listed below:</p>
                    <ul>
                        <li>Tap Water From Treated Source Within Premise</li>
                        <li>Drinking water source within premises</li>
                        <li>Electricity as main source of lighting</li>
                        <li>Latrine facility</li>
                        <li>Latrine facility with flush within premises</li>
                        <li>Bathroom within premises</li>
                        <li>Wastewater-outlet connected to closed drainage</li>
                        <li>Gas as source of fuel</li>
                        <li>Availing banking services</li>
                    </ul>
                </div>
                <div className="col-md-8">
                    <Bar data={prepareVariousParamBarData()} options={{}}/>
                </div>
            </div>


            
        </div>
    )

}

export default BasicInfra;