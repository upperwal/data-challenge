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
import EconomyIntroImage from './img/economy_intro.svg';

function Economy(props) {

    const [state, setState] = useState("All")
    const [settlementType, setSettlementType] = useState("All")
    const paramMap = {
        'Percent households having car': 'asset_car_jeep_van_per',
        'Percent households having mobile only': 'asset_mobileOnly_per',
        'Percent households having landline only': 'asset_landlineOnly_per',
        'Percent households having scooter': 'asset_scooter_motorcycle_moped_per',
        'Percent households having bicycle': 'asset_bicycle_per',
        'Percent households having computer with internet': 'asset_computerWithInternet_per'
    }
    const [parameter, setParameter] = useState("Percent households having car")

    function onInputChange(e) {
        console.log(e.target)
        if(e.target.name === 'state') {
            setState(e.target.value)
        } else if(e.target.name === 'settlementType') {
            setSettlementType(e.target.value)
        } else if(e.target.name === 'parameter') {
            setParameter(e.target.value)
        }
    }

    function prepareBarData() {
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

        WithInternetData.forEach((item) => {
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

    function renderParamMenu() {
        let res = []

        Object.keys(paramMap).forEach((s, idx) => {
            res.push(
                <MenuItem key={idx} value={s}>{s}</MenuItem>
            )
        })

        return res
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
                introImg={EconomyIntroImage}
                data={[
                    {
                        label: 'Households owning a TV (Metros)',
                        value: 83.6,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'Households owning a transistors (Metros)',
                        value: 32.6,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'Households owning a computer (Metros)',
                        value: 24.1,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'Households owning a mobile phone (Metros)',
                        value: 64.3,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'Households owning a landline phone (Metros)',
                        value: 7.0,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'Households owning a bicycle (Metros)',
                        value: 43.2,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'Households owning a two-wheelers (Metros)',
                        value: 44.0,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'Households owning a four-wheelers (Metros)',
                        value: 14.0,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    }
                ]}
                title="Economy"
                description={[
                    "This economic data refers to socioeconomic information for all the urban settlements in India expressed statistically including asset holding, poverty and unemployment change, asset holding index (AHI) and economic permanence index (EPI)."
                ]}
            />
            <div className="row">
                <div className="col-md-4 insights-box">
                    <h4>Asset Holdings</h4>
                    <p>The charts show the value as the percentage of households for various asset holdings parameters listed below</p>
                    <ul>
                        <li>Radio/transistor</li>
                        <li>Television</li>
                        <li>Computer without internet</li>
                        <li>Computer with internet</li>
                        <li>Landline</li>
                        <li>Mobile</li>
                        <li>Mobile and Landline</li>
                        <li>Bicycle</li>
                        <li>Motorcycle/Scooter/Moped</li>
                        <li>Car/Jeep</li>
                    </ul>
                </div>
                <div className="col-md-8">
                    <div className="row input-control-row">
                        <div className="col-md-4">
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
                        </div>
                        <div className="col-md-4">
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
                        </div>
                        <div className="col-md-4">
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
                    </div>
                    <Bar data={prepareBarData()} options={{
                        indexAxis: 'y',
                    }}/>
                </div>
            </div>
            
        </div>
    )

}

export default Economy;