import React, {useState, useEffect} from 'react';
import {Scatter, Bar} from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Overview from './Overview';

import IndexData from './index.json';

import PopImage from './img/population.svg'
import AreaImage from './img/area.svg'
import DistanceImage from './img/distance.svg'

function Indices(props) {

    const [xAxisIndex, setXAxisIndex] = useState("Basic Infrastructure Index")
    const [yAxisIndex, setYAxisIndex] = useState("Housing Quality Index")
    const [stateIndex, setStateIndex] = useState("All")
    const [settlementTypeIndex, setSettlementTypeIndex] = useState("All")
    const [stateIndexLiteracy, setStateIndexLiteracy] = useState("All")
    const [settlementTypeIndexLiteracy, setSettlementTypeIndexLiteracy] = useState("All")

    function onScatterInputChange(e) {
        console.log(e.target)
        if(e.target.name == 'xaxis') {
            setXAxisIndex(e.target.value)
        } else if(e.target.name == 'yaxis') {
            setYAxisIndex(e.target.value)
        } else if(e.target.name == 'state') {
            setStateIndex(e.target.value)
        } else if(e.target.name == 'settlementType') {
            setSettlementTypeIndex(e.target.value)
        } else if(e.target.name == 'state-literacy') {
            setStateIndexLiteracy(e.target.value)
        } else if(e.target.name == 'settlementType-literacy') {
            setSettlementTypeIndexLiteracy(e.target.value)
        }
    }

    function prepareScatterIndexData() {
        let res= []
        let cityList = []
        let indexMap = {
            "Asset Holding Index": "assetHoldingsIndex",
            "Economic Performance Index": "ecomonicPerformanceIndex",
            "Housing Quality Index": "housigQualityIndex",
            "Basic Infrastructure Index": "basicInfrastructureIndex",
            "Social Index": "socialIndex"
        }
        let scatterStateLocal = {
            datasets: [{
                radius: 3,
                pointHoverRadius: 8,
                backgroundColor: '#f6264c',
            }]
        }

        IndexData.forEach((item, idx) => {
            if(item[indexMap[xAxisIndex]] === null || item[indexMap[yAxisIndex]] === null) {
                return
            }
            if(item.state !== stateIndex && stateIndex !== 'All') {
                return
            }
            if(item.settlementType !== settlementTypeIndex && settlementTypeIndex !== 'All') {
                return
            }
            res.push({
                'y': item[indexMap[yAxisIndex]],
                'x': item[indexMap[xAxisIndex]]
            })
            cityList.push(item.UA_city)
        })

        scatterStateLocal['labels'] = cityList
        scatterStateLocal.datasets[0]['data'] = res
        
        console.log(res)
        console.log(scatterStateLocal)

        return scatterStateLocal
    }

    function renderStateMenu() {
        let res = []

        props.stateList.forEach((s, idx) => {
            res.push(
                <MenuItem value={s}>{s}</MenuItem>
            )
        })

        return res
    }

    function renderSettlementType() {
        let res = []

        props.settlementTypeList.forEach((s, idx) => {
            res.push(
                <MenuItem value={s}>{s}</MenuItem>
            )
        })

        return res
    }
    
    return (
        <div className="census-item-section">
            <Overview 
                data={[
                    {
                        label: 'Best city in Asset Holding',
                        value: 1.97,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Thrissur'
                    },
                    {
                        label: 'Best city in economic performance',
                        value: 3.57,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Gurgaon'
                    },
                    {
                        label: 'Best city in housing quality',
                        value: 1.73,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Surat'
                    },
                    {
                        label: 'Best City for Basic Infrastructure',
                        value: 2.85,
                        imgSrc: PopImage,
                        fixTo: 2,
                        unitLabel: 'Mysore'
                    },
                    {
                        label: 'Best City in Social Index',
                        value: 2.05,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Aizawl'
                    }
                ]}
                title="Indices"
                description={[
                    "In absolute numbers, out of the total increase of 182 million added since 2001, the contribution of rural and urban are equal i.e. 91 million each."
                ]}
            />
            <div className="row">
                <div className="col-md-4 insights-box">
                    <p>Phasellus dictum arcu sit amet leo tempor bibendum. Aliquam eu imperdiet nulla, sed consectetur dui. Mauris velit libero, venenatis a congue vel, luctus id nunc. Suspendisse a laoreet metus.</p>
                </div>
                <div className="col-md-8">
                    <FormControl>
                        <InputLabel id="xaxis-index-select-label">X Axis</InputLabel>
                        <Select
                            labelId="xaxis-index-select-label"
                            id="xaxis-index-select"
                            name="xaxis"
                            value={xAxisIndex}
                            onChange={onScatterInputChange}
                            className="index-select"
                        >
                            <MenuItem value={"Asset Holding Index"}>Asset Holding Index</MenuItem>
                            <MenuItem value={"Economic Performance Index"}>Economic Performance Index</MenuItem>
                            <MenuItem value={"Housing Quality Index"}>Housing Quality Index</MenuItem>
                            <MenuItem value={"Basic Infrastructure Index"}>Basic Infrastructure Index</MenuItem>
                            <MenuItem value={"Social Index"}>Social Index</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="yaxis-index-select-label">Y Axis</InputLabel>
                        <Select
                            labelId="yaxis-index-select-label"
                            id="yaxis-index-select"
                            name="yaxis"
                            value={yAxisIndex}
                            onChange={onScatterInputChange}
                        >
                            <MenuItem value={"Asset Holding Index"}>Asset Holding Index</MenuItem>
                            <MenuItem value={"Economic Performance Index"}>Economic Performance Index</MenuItem>
                            <MenuItem value={"Housing Quality Index"}>Housing Quality Index</MenuItem>
                            <MenuItem value={"Basic Infrastructure Index"}>Basic Infrastructure Index</MenuItem>
                            <MenuItem value={"Social Index"}>Social Index</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="full-width-select">
                        <InputLabel id="state-index-select-label">State</InputLabel>
                        <Select
                            labelId="state-index-select-label"
                            id="state-index-select"
                            name="state"
                            value={stateIndex}
                            onChange={onScatterInputChange}
                        >
                            {renderStateMenu()}
                        </Select>
                    </FormControl>
                    <FormControl className="full-width-select">
                        <InputLabel id="settlement-index-select-label">Settlement Type</InputLabel>
                        <Select
                            labelId="settlement-index-select-label"
                            id="settlement-index-select"
                            name="settlementType"
                            value={settlementTypeIndex}
                            onChange={onScatterInputChange}
                        >
                            {renderSettlementType()}
                        </Select>
                    </FormControl>
                    <Scatter
                        data={prepareScatterIndexData()}
                        plugins={[ChartAnnotation]}
                        options={{
                            responsive:true,
                            title:{
                                display:true,
                                text:'Comparing various indices derived from Census 2011',
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
                                        labelString: xAxisIndex,
                                    }
                                }],
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: yAxisIndex,
                                    }
                                }]
                            },
                            tooltips: {
                                callbacks: {
                                    label: function(tooltipItem, data) {
                                        var label = data.labels[tooltipItem.index];
                                        return label + ': (' + xAxisIndex + ': ' + tooltipItem.xLabel.toFixed(2) + ', ' + yAxisIndex + ': ' + tooltipItem.yLabel.toFixed(2) + ')';
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
                                        value: 0,
                                        borderColor: "black",
                                        borderWidth: 1
                                    },
                                    {
                                        // drawTime: "afterDatasetsDraw",
                                        // id: "hline",
                                        type: "line",
                                        mode: "vertical",
                                        scaleID: "x-axis-1",
                                        value: 0,
                                        borderColor: "black",
                                        borderWidth: 1
                                    }
                                ]
                            }
                        }}
                    />
                </div>
            </div>
            
        </div>
    )

}

export default Indices;