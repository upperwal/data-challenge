import React, {useState, useEffect} from 'react';
import {Scatter, Bar} from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Overview from './Overview';

import WithInternetData from './with_internet.json';
import SexRatioLiteracyPerData from './sex_ratio_literacy_percentage.json';
import AegrCorePeri from './aegr_core_peri.json';

import PopImage from './img/population.svg'
import AreaImage from './img/area.svg'
import DistanceImage from './img/distance.svg'

function Demographics(props) {

    // const [state, setState] = useState("All")
    // const [settlementType, setSettlementType] = useState("All")
    const [stateIndexLiteracy, setStateIndexLiteracy] = useState("All")
    const [settlementTypeIndexLiteracy, setSettlementTypeIndexLiteracy] = useState("All")
    let literacyAndSexRatioStats = {
        sexRatioMean: 0,
        literacyRateMean: 0
    }

    function onScatterInputChange(e) {
        console.log(e.target)
        if(e.target.name == 'state-literacy') {
            setStateIndexLiteracy(e.target.value)
        } else if(e.target.name == 'settlementType-literacy') {
            setSettlementTypeIndexLiteracy(e.target.value)
        }
    }

    function prepareScatterSexRatioLiteracyData() {
        let res= []
        let cityList = []
        /* let indexMap = {
            "Sex Ratio": "sexRatio_num",
            "Literacy Rate Percentage": "literacyRate_persons_per"
        } */
        let xSum = 0
        let ySum = 0
        let count = 0
        let scatterStateLocal = {
            datasets: [{
                radius: 3,
                pointHoverRadius: 8,
                backgroundColor: '#f6264c',
            }]
        }

        SexRatioLiteracyPerData.forEach((item, idx) => {
            if(item.literacyRate_persons_per === null || item.sexRatio_num === null || item.literacyRate_persons_per > 100) {
                return
            }
            if(item.state !== stateIndexLiteracy && stateIndexLiteracy !== 'All') {
                return
            }
            if(item.settlementType !== settlementTypeIndexLiteracy && settlementTypeIndexLiteracy !== 'All') {
                return
            }
            res.push({
                'y': item.sexRatio_num,
                'x': item.literacyRate_persons_per
            })
            xSum += item.literacyRate_persons_per
            ySum += item.sexRatio_num
            count += 1
            cityList.push(item.UA_city)
        })

        scatterStateLocal['labels'] = cityList
        scatterStateLocal.datasets[0]['data'] = res

        literacyAndSexRatioStats = {
            sexRatioMean: ySum / count,
            literacyRateMean: xSum / count
        }

        return scatterStateLocal
    }


    // function onInputChange(e) {
    //     console.log(e.target)
    //     if(e.target.name == 'state') {
    //         setState(e.target.value)
    //     } else if(e.target.name == 'settlementType') {
    //         setSettlementType(e.target.value)
    //     }
    // }

    function prepareBarData() {
        let barData = {
            datasets: [
                {
                    label: 'Core Growth from 2001 to 2011',
                    backgroundColor: '#f6264c'
                },
                {
                    label: 'Periphery Growth from 2001 to 2011',
                    backgroundColor: '#592F93'
                }
            ]
        };
        let res= [[], []]
        let cityList = []

        AegrCorePeri.forEach((item) => {
            if(item.aegr2001_11_core_per === null || item.aegr2001_11_periphery_per === null) {
                return
            }
            if(item.state !== stateIndexLiteracy && stateIndexLiteracy !== 'All') {
                return
            }
            // if(item.settlementType !== settlementType && settlementType !== 'All') {
            //     return
            // }
            res[0].push(item.aegr2001_11_core_per)
            res[1].push(item.aegr2001_11_periphery_per)
            cityList.push(item.UA_city)
        })

        barData['labels'] = cityList
        barData.datasets[0]['data'] = res[0]
        barData.datasets[1]['data'] = res[1]

        console.log(barData)

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
            <h3>Now we will explore Urban India on various themes</h3>
            <Overview 
                data={[
                    {
                        label: 'Effective Literacy Rate',
                        value: 73,
                        imgSrc: PopImage,
                        unitLabel: 'Percent'
                    },
                    {
                        label: 'Population Growth rate',
                        value: 17.7,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percent'
                    },
                    {
                        label: 'National Sex Ratio',
                        value: 943,
                        imgSrc: PopImage,
                        unitLabel: 'Per 1k males'
                    }
                ]}
                title="Demographics"
                description={[
                    "Demographic analysis is the study of a population based on factors such as age, race, and sex. This Demographic data refers to people related  information for all the cities in India expressed statistically including population growth, literacy rates, sex ratio and other social indices."
                ]}
            />
            <div className="row">
                <div className="col-md-4 insights-box">
                    <h4>Sex Ratio vs Literacy Rate Percentage</h4>
                    <p>The overall literacy rate was highest in metropolitan cities (87.1%) followed by non-metropolitan Class I cities (83.7%) and all towns (80.9%) as compared to 84.1 per cent in urban India in 2011. The same pattern holds true for gender as well. In towns, the male literacy rate was 86.9 per cent and female literacy rate was 74.6 per cent.</p>
                    <p>The gender gap in towns of India was quite high at 12.3 per cent in 2011; much larger than the gender gap of urban India. The gender gap in non-metropolitan Class I cities of India was almost the same as in urban India (9.7%), while it was lowest in metropolitan India (7.6%).</p>
                </div>
                <div className="col-md-8">
                <FormControl className="full-width-select">
                        <InputLabel id="state-literacy-select-label">State</InputLabel>
                        <Select
                            labelId="state-literacy-select-label"
                            id="state-literacy-select"
                            name="state-literacy"
                            value={stateIndexLiteracy}
                            onChange={onScatterInputChange}
                        >
                            {renderStateMenu()}
                        </Select>
                    </FormControl>
                    <FormControl className="full-width-select">
                        <InputLabel id="settlement-literacy-select-label">Settlement Type</InputLabel>
                        <Select
                            labelId="settlement-literacy-select-label"
                            id="settlement-literacy-select"
                            name="settlementType-literacy"
                            value={settlementTypeIndexLiteracy}
                            onChange={onScatterInputChange}
                        >
                            {renderSettlementType()}
                        </Select>
                    </FormControl>
                    <Scatter
                        data={prepareScatterSexRatioLiteracyData()}
                        plugins={[ChartAnnotation]}
                        options={{
                            responsive:true,
                            title:{
                                display:true,
                                text:'Sex Ratio vs Literacy Rate Percentage',
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
                                        labelString: "Literacy Rate Percentage",
                                    }
                                }],
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Sex Ratio",
                                    }
                                }]
                            },
                            tooltips: {
                                callbacks: {
                                    label: function(tooltipItem, data) {
                                        var label = data.labels[tooltipItem.index];
                                        return label + ': (Literacy Rate Percentage: ' + tooltipItem.xLabel.toFixed(2) + ', Sex Ratio: ' + tooltipItem.yLabel.toFixed(2) + ')';
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
                                        value: literacyAndSexRatioStats.sexRatioMean,
                                        borderColor: "black",
                                        borderWidth: 1,
                                        label: {
                                            backgroundColor: "red",
                                            content: "Mean Sex Ratio Percentage",
                                            enabled: true
                                        }
                                    },
                                    {
                                        // drawTime: "afterDatasetsDraw",
                                        // id: "hline",
                                        type: "line",
                                        mode: "vertical",
                                        scaleID: "x-axis-1",
                                        value: literacyAndSexRatioStats.literacyRateMean,
                                        borderColor: "black",
                                        borderWidth: 1,
                                        label: {
                                            backgroundColor: "red",
                                            content: "Mean Literacy Rate",
                                            enabled: true
                                        }
                                    }
                                ]
                            }
                        }}
                    />

                    <div className="gap"></div>

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

export default Demographics;