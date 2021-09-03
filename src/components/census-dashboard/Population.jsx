import React, {useState, useEffect} from 'react';
import {Scatter, Bar} from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Kepler from './Kepler';

import Overview from './Overview';

import PopulationGrowthData from './pop_growth.json';

import PopImage from './img/population.svg'
import AreaImage from './img/area.svg'
import DistanceImage from './img/distance.svg'

function Population(props) {

    const [state, setState] = useState("All")
    const [settlementType, setSettlementType] = useState("All")
    const [parameter, setParameter] = useState("AEGR 2001-2011 Percentage")
    const paramMap = {
        'AEGR 2001-2011 Percentage': 'aegr2001_2011_per',
        'Population Difference from 2001 to 2011': 'pop_diff'
    }

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

    function prepareScatterPopGrowthData() {
        let res= []
        let cityList = []
        // let xSum = 0
        // let ySum = 0
        // let count = 0
        let scatterStateLocal = {
            datasets: [{
                radius: 3,
                pointHoverRadius: 8,
                backgroundColor: '#FD981E',
            }]
        }

        PopulationGrowthData.forEach((item, idx) => {
            if(item[paramMap[parameter]] === null) {
                return
            }
            if(item.state !== state && state !== 'All') {
                return
            }
            if(item.settlementType !== settlementType && settlementType !== 'All') {
                return
            }
            res.push({
                'y': item.totalPop_2011_num,
                'x': item[paramMap[parameter]]
            })
            /* xSum += item.literacyRate_persons_per
            ySum += item.sexRatio_num
            count += 1 */
            cityList.push(item.UA_city)
        })

        scatterStateLocal['labels'] = cityList
        scatterStateLocal.datasets[0]['data'] = res

        /* literacyAndSexRatioStats = {
            sexRatioMean: ySum / count,
            literacyRateMean: xSum / count
        } */

        return scatterStateLocal
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
            <h2>Looking at urban population in detail</h2>
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
                title="Population"
                description={[
                    "In absolute numbers, out of the total increase of 182 million added since 2001, the contribution of rural and urban are equal i.e. 91 million each."
                ]}
            />
            <div className="row gis-container">
                <div className="col-md-4">
                    <p>The city population cluster map displays the clusters of urban population. The state-wise urban population map depicts the share and size of urban population in each state and union territory</p>
                    <p>When looked in terms of state, Goa is the most urbanised state with 62.17% of population classified as urban and Delhi is the most urbanised UT with 97.6% of population classified as urban</p>
                    <p>whereas Himachal Pradesh is the least urbanised state with 11.51% of population classified  as urban and Lakshadweep is the least urbanised UT with 76.5% of population classified as urban</p>
                </div>
                <div className="col-md-8">
                    <ul className="nav nav-tabs nav-fill" id="myTab" role="tablist">
                        <li className="nav-item " role="presentation">
                            <a className="nav-link active" data-toggle="tab" href="#health" role="tab" aria-controls="home">City Population Cluster</a>
                        </li>
                        <li className="nav-item " role="presentation">
                            <a className="nav-link" data-toggle="tab" href="#inclusion" role="tab" aria-controls="profile" >State Population</a>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id="health">
                            <Kepler src="http://iuo.dataspace.mobi:3001/census/population?readOnly=true" frameBorder="0" width="100%" height="900px" />
                        </div>
                        <div role="tabpanel" className="tab-pane" id="inclusion">
                            <iframe
                                src="http://13.235.244.95:3000/public/question/f562f1c2-4bf8-494e-927c-d23e1f30d57a"
                                frameBorder="0"
                                width="100%"
                                height="600"
                                allowtransparency="true"
                            ></iframe> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 insights-box">
                    <h4>Urban Population Growth</h4>
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
                    <p>Cities like Ghaziabad Kanoor, Trissur, Mallapuram are smaller in size but have high growth rate, implying the possibilities of becoming major urban agglomeration in near future. At the same time the Largest Metropolitan Cities continue to add the most number of people</p>
                </div>
                <div className="col-md-8">
                    <Scatter
                        data={prepareScatterPopGrowthData()}
                        plugins={[ChartAnnotation]}
                        options={{
                            responsive:true,
                            title:{
                                display:true,
                                text:'Urban Population Growth',
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
                                        labelString: parameter,
                                    }
                                }],
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Total Population in 2011",
                                    }
                                }]
                            },
                            tooltips: {
                                callbacks: {
                                    label: function(tooltipItem, data) {
                                        var label = data.labels[tooltipItem.index];
                                        return label + ': (' + parameter + ': ' + tooltipItem.xLabel.toFixed(2) + ', Total Population in 2011: ' + tooltipItem.yLabel.toFixed(2) + ')';
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )

}

export default Population;