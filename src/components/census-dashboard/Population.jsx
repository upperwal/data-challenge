import React, {useState, useEffect} from 'react';
import {Scatter} from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

import Kepler from './Kepler';

import Overview from './Overview';

import PopulationGrowthData from './pop_growth.json';
import AegrCorePeri from './aegr_core_peri.json';

import PopulationIntroImage from './img/population_intro.svg';
import PopIcon from './img/icons/pop_india.svg';
import PopUrbanIcon from './img/icons/pop_urban.svg';
import PopRuralIcon from './img/icons/pop_rural.svg';


function Population(props) {

    // const [parameter, setParameter] = useState("AEGR 2001-2011 Percentage")
    const chartLegend = [
        'AEGR 2001-2011 Percentage',
        'Population Difference from 2001 to 2011'
    ]
    const [scatterData, setScatterData] = useState([{}, {}])

    useEffect(() => {
        prepareScatterPopGrowthData()
    }, [props.state.state, props.state.settlementType])

    function prepareScatterPopGrowthData() {
        let res= [[],[]]
        let cityList = [[],[]]
        const scatterDataTemplate = [
            {
                datasets: [{
                    radius: 3,
                    pointHoverRadius: 8,
                    backgroundColor: '#f6264c',
                }]
            },
            {
                datasets: [{
                    radius: 3,
                    pointHoverRadius: 8,
                    backgroundColor: '#f6264c',
                }]
            }
        ]

        PopulationGrowthData.forEach((item, idx) => {
            if(item.state !== props.state.state && props.state.state !== 'All') {
                return
            }
            if(item.settlementType !== props.state.settlementType && props.state.settlementType !== 'All') {
                return
            }
            if(item.aegr2001_2011_per !== null) {
                res[0].push({
                    'y': item.totalPop_2011_num,
                    'x': item.aegr2001_2011_per
                })
                cityList[0].push(item.UA_city)
            }
            if(item.pop_diff !== null) {
                res[1].push({
                    'y': item.totalPop_2011_num,
                    'x': item.pop_diff
                })
                cityList[1].push(item.UA_city)
            }
        })

        res.forEach((r, idx) => {
            scatterDataTemplate[idx]['labels'] = cityList[idx]
            scatterDataTemplate[idx].datasets[0]['data'] = r
        })

        setScatterData(scatterDataTemplate)
    }

    function renderScatterPlot(data, xAxesLabel) {
        return (
            <Scatter
                data={data}
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
                                labelString: xAxesLabel,
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
                                return label + ': (' + xAxesLabel + ': ' + tooltipItem.xLabel.toFixed(2) + ', Total Population in 2011: ' + tooltipItem.yLabel.toFixed(2) + ')';
                            }
                        }
                    }
                }}
            />
        )
    }

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
            if(item.state !== props.state.state && props.state.state !== 'All') {
                return
            }
            if(item.settlementType !== props.state.settlementType && props.state.settlementType !== 'All') {
                return
            }
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
    
    return (
        <div className="census-item-section">
            <Overview 
                introImg={PopulationIntroImage}
                data={[
                    {
                        label: 'Population 2011',
                        value: 1210.6,
                        imgSrc: PopIcon,
                        fixTo: 1,
                        unitLabel: 'Million'
                    },
                    {
                        label: 'Rural Population 2011',
                        value: 833.5,
                        imgSrc: PopRuralIcon,
                        fixTo: 1,
                        unitLabel: 'Million'
                    },
                    {
                        label: 'Urban Population 2011',
                        value: 377.1,
                        imgSrc: PopUrbanIcon,
                        fixTo: 1,
                        unitLabel: 'Million'
                    }
                ]}
                title="Population"
                description={[
                    "In absolute numbers, out of the total increase of 182 million added since 2001, the contribution of rural and urban are equal i.e. 91 million each."
                ]}
            />
            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <h4>Population Clusters</h4>
                    <p>The city population cluster map displays the clusters of urban population. The state-wise urban population map depicts the share and size of urban population in each state and union territory.</p>
                    <p>When looked in terms of state, Goa is the most urbanised state with 62.17% of population classified as urban and Delhi is the most urbanised UT with 97.6% of population classified as urban whereas Himachal Pradesh is the least urbanised state with 11.51% of population classified  as urban and Lakshadweep is the least urbanised UT with 76.5% of population classified as urban.</p>
                </div>
                <div className="col-md-8 gis-container">
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
                            <Kepler src="https://gis.iuo.dataspace.mobi/census/population?readOnly=true" frameBorder="0" width="100%" height="900px" />
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
            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <h4>The 2 paradigms of urban population growth</h4>
                    <p>The first chart shows the growth of settlements in terms of AEGR from 2001 to 2011.</p>
                    <p>The second chart shows growth of settlements in terms of absolute number of people added from 2001 to 2011.</p>
                    <p>Cities like Ghaziabad Kanoor, Trissur, Mallapuram are smaller in size but have high growth rate, implying the possibilities of becoming major urban agglomeration in near future. At the same time the Largest Metropolitan Cities continue to add the most number of people.</p>
                </div>
                <div className="col-md-8 viz-box">
                    {props.renderer.controls()}
                    <ul className="nav nav-tabs nav-fill" id="myTab" role="tablist">
                        <li className="nav-item " role="presentation">
                            <a className="nav-link active" data-toggle="tab" href="#aegr" role="tab" aria-controls="home">AEGR 2001-2011 Percentage</a>
                        </li>
                        <li className="nav-item " role="presentation">
                            <a className="nav-link" data-toggle="tab" href="#pop_diff" role="tab" aria-controls="profile" >Population difference from 2001 and 2011</a>
                        </li>
                    </ul>

                    <div className="tab-content" width="100%">
                        <div role="tabpanel" className="tab-pane active" id="aegr">
                            {renderScatterPlot(scatterData[0], chartLegend[0])}
                        </div>
                        <div role="tabpanel" className="tab-pane" id="pop_diff">
                            {renderScatterPlot(scatterData[1], chartLegend[1])}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <h4>Core and Periphery in cities</h4>
                    <p>This chart depicts the growth of population in core and periphery of the urban settlement from 2001 to 2011.</p>
                    <p>The fastest expansion of periphery happened in Thrissur, whereas the fastest shrinkage of periphery occurred in Dhanbad.</p>
                    <p>In case of settlement core, Vasai Virar City had the fastest expansion, while Kollam had the fastest shrinkage.</p>
                </div>
                <div className="col-md-8 viz-box">
                    {props.renderer.controls()}
                    {props.renderer.bar(
                        prepareBarData(),
                        '',
                        'Percent Growth',
                        false
                    )}
                    {/* <Bar data={prepareBarData()} options={{
                        scales: {
                            yAxes: [
                            {
                                ticks: {
                                beginAtZero: true,
                                },
                            },
                            ],
                        },
                    }}/> */}
                </div>
            </div>
        </div>
    )

}

export default Population;