import React, {useState, useEffect} from 'react';
import {Scatter, Bar} from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Kepler from './Kepler';

import Overview from './Overview';

import SettlementPopData from './settlement_pop_params.json';

import AreaImage from './img/area.svg'
import UrbanSettlementIntroImage from './img/housing_intro.svg';

function UrbanSettlements(props) {

    const [barData, setBarData] = useState([{}, {}, {}, {}])
    const barLabels = [
        "Distribution of Population Sum",
        "Distribution of Households Sum",
        "Distribution of Avg Basic Infra Index",
        "Distribution of Avg Social Index"
    ]
    let barDataTemplate = [
        {
            datasets: [
                {
                    label: barLabels[0],
                    backgroundColor: '#f6264c'
                }
            ]
        },
        {
            datasets: [
                {
                    label: barLabels[1],
                    backgroundColor: '#592F93'
                }
            ]
        },
        {
            datasets: [
                {
                    label: barLabels[2],
                    backgroundColor: '#592F93'
                }
            ]
        },
        {
            datasets: [
                {
                    label: barLabels[3],
                    backgroundColor: '#f6264c'
                }
            ]
        }
    ]

    useEffect(() => {
        prepareBarData()
    }, [])

    function prepareBarData() {
        let res= [[],[],[],[]]
        let xList = []

        SettlementPopData.forEach((item) => {
            res[0].push(item["Sum of totalPop_2011_num"])
            res[1].push(item["Sum of HH_num"])
            res[2].push(item["Average of basicInfrastructureIndex"])
            res[3].push(item["Average of socialIndex"])
            xList.push(item.settlementSizeClass)
        })

        res.forEach((r, idx) => {
            barDataTemplate[idx]['labels'] = xList
            barDataTemplate[idx].datasets[0]['data'] = r
        })

        setBarData(barDataTemplate)
    }
    
    return (
        <div className="census-item-section">
            {/* <h3>Let's begin by looking at the governance structure of India</h3> */}
            <Overview 
                introImg={UrbanSettlementIntroImage}
                data={[
                    {
                        label: 'States/UT',
                        value: 35,
                        imgSrc: AreaImage,
                        unitLabel: 'Nos'
                    },
                    {
                        label: 'Districts',
                        value: 640,
                        imgSrc: AreaImage,
                        unitLabel: 'Nos'
                    },
                    {
                        label: 'Sub-Districts',
                        value: 5924,
                        imgSrc: AreaImage,
                        unitLabel: 'Nos'
                    },
                    {
                        label: 'Towns',
                        value: 7933,
                        imgSrc: AreaImage,
                        unitLabel: 'Nos'
                    },
                    {
                        label: 'Villages',
                        value: 640930,
                        imgSrc: AreaImage,
                        unitLabel: 'Nos'
                    }
                ]}
                title="Urban Settlements"
                description={[
                    "Urban settlements in India consist of Statutory towns, Census towns, Cities, Metropolitan cities, Urban agglomerations and Outgrowth.",
                ]}
            />
            <div className="row">
                <div className="col-md-4 insights-box">
                    <h4>Types of urban settlements in India</h4>
                    <p>The maps here represent the distribution of different types of urban settlements across states and union territories (UT), on the basis of</p>
                    <ul>
                        <li>Size class classification</li>
                        <li>Type of governing body</li>
                    </ul>
                    <p>Distribution of urban settlement sizes in states is not uniform across the country. For example the share of class I settlements was largest in Kerala (28%) whereas in West Bengal 52% of the settlements were class V towns.</p>
                    <p>In case of urban governance structure, 88% of the settlements in West Bengal were governed as Census Towns. On the other hand, Sikkim had the highest number of settlements governed as Municipal Corporations.</p>
                </div>
                <div className="col-md-8 gis-container">
                    <Kepler src="http://iuo.dataspace.mobi:3001/census/towns?readOnly=true" width="100%" height="900px" />
                </div>
            </div>
            <div className="row">
            <div className="col-md-4 insights-box">
                    <h4>Comparing settlement size with population, household, avg social and basic infra index</h4>
                    <p>The charts here show the distribution of population, household size, basic infrastructure, and social conditions among different settlement size classes.</p>
                    <p>Clearly, the 52 Metropolitan cities held the highest share of urban population.</p>
                    <p>In case of household size, class-III towns had the highest figure of 5.05.</p>
                    <p>The average value of Basic Infrastructure Index was found to be the highest in class II towns (0.869).</p>
                    <p>The average value of Social Index was found to be the highest in class VI towns (0.264).</p>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-6">
                            <Bar data={barData[0]} options={{
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                        beginAtZero: true,
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: barLabels[0],
                                        }
                                    }],
                                },
                            }}/>
                        </div>
                        <div className="col-md-6">
                            <Bar data={barData[1]} options={{
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                        beginAtZero: true,
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: barLabels[1],
                                        }
                                    }],
                                },
                            }}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Bar data={barData[2]} options={{
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                        beginAtZero: true,
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: barLabels[2],
                                        }
                                    }],
                                },
                            }}/>
                        </div>
                        <div className="col-md-6">
                            <Bar data={barData[3]} options={{
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                        beginAtZero: true,
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: barLabels[3],
                                        }
                                    }],
                                },
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default UrbanSettlements;