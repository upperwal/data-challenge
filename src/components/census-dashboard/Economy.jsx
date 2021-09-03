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
                data={[
                    {
                        label: 'Households owning a TV set (Metros)',
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
                    "The Houselisting and Housing Census was conducted in 2011 to generate information on a large number of social and economic indicators relating to households across the country. This Economic data refers to socioeconomic information for all the cities in India expressed statistically including asset holding, poverty and unemployment change, asset holding index (AHI) and economic permanence index.(EPI)"
                ]}
            />
            <div className="row">
                <div className="col-md-4 insights-box">
                    <p>As per 2011 census in Metropolitan India, Pune had the largest number of households owning TV, computer, mobile and two/four-wheeler together (32.3 per cent), and Dhanbad the least (7.5 per cent). The largest concentration of four wheelers was found in Chandigarh, with 27.6 per cent of the households owning one. The concentration of four wheelers was the least in Vasai Virar city and Asansol (both 5.0 percent). The largest concentration of mobile phones was found in Patna, with 73.9 per cent owning mobile phones. The least concentration of mobile phones was found at Kannur, where 43.3 per cent own mobile phones.</p>
                    <p>For non metropolitan India, largest concentration of four wheelers was found in Panchkula in Haryana, with 38.8 percent of the households owning at least one, four wheeler followed by Chandigarh with36.0 percent of the households owning at least one four wheeler. The concentration of four wheelers was the least in Murshidabad in West Bengal (1.8 percent) and YSR Kapada in Andhra Pradesh (1.9 percent). The largest concentration of mobile phones was found in South Andamans, with 81.5 percent owning mobile phones. The least concentration of mobile phones was found at Kottayam in Kerala, where 37.7 percent owned mobile phones.</p>
                </div>
                <div className="col-md-8">
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
                    <Bar data={prepareBarData()} options={{
                        indexAxis: 'y',
                    }}/>
                </div>
            </div>
            
        </div>
    )

}

export default Economy;