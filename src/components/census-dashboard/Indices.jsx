import React, {useState, useEffect} from 'react';
import {Scatter} from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Overview from './Overview';

import IndicesIntroImage from './img/indices_intro.svg';
import IndexData from './index.json';

function Indices(props) {

    const [xAxisIndex, setXAxisIndex] = useState("Basic Infrastructure Index")
    const [yAxisIndex, setYAxisIndex] = useState("Housing Quality Index")

    function onScatterInputChange(e) {
        console.log(e.target)
        if(e.target.name == 'xaxis') {
            setXAxisIndex(e.target.value)
        } else if(e.target.name == 'yaxis') {
            setYAxisIndex(e.target.value)
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
            if(item.state !== props.state.state && props.state.state !== 'All') {
                return
            }
            if(item.settlementType !== props.state.settlementType && props.state.settlementType !== 'All') {
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
    
    return (
        <div className="census-item-section">
            <Overview 
                introImg={IndicesIntroImage}
                hideStats={true}
                title="Comparison of Indices"
            />
            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <p>This sections allows users to compare the urban settlements across the various indices discussed above in the story.</p>
                </div>
                <div className="col-md-8 viz-box">
                    <div className="row input-control-row">
                        <div className="col-md-6">
                            <FormControl className="full-width-select">
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
                        </div>
                        <div className="col-md-6">
                            <FormControl className="full-width-select">
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
                        </div>
                    </div>
                    {props.renderer.controls()}
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