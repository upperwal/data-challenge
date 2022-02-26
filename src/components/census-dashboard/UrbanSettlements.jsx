import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';

import Kepler from './Kepler';

import Overview from './Overview';

import SettlementPopData from './settlement_pop_params.json';

import UrbanSettlementIntroImage from './img/settlement_types_intro.svg';

import StatutaryTownIcon from './img/statutary_town_icon.svg';
import CensusTownIcon from './img/census_town_icon.svg';
import CitiesIcon from './img/cities_icon.svg';
import MetropolitanCitiesIcon from './img/metropolitan_cities_icon.svg';
import UrbanAgglomerationIcon from './img/urban_agglomerations_icon.svg';

function UrbanSettlements(props) {

    const [barData, setBarData] = useState([{}, {}, {}, {}])
    const barLabels = [
        "Sum of Population",
        "Avg of Households Size",
        "Avg Basic Infra Index",
        "Avg Social Index"
    ]
    const defContent = [
        {
            img: MetropolitanCitiesIcon,
            title: "Metropolitan Cities",
            description: "Cities with a population of at least 10 lakh (1 million)."
        },
        {
            img: CitiesIcon,
            title: "Cities",
            description: "‘Urban areas’ with a population of atleast one lakh (0.1 million). Others are termed as Towns."
        },
        {
            img: CensusTownIcon,
            title: "Census Town",
            description: "Places with a minimum population of 5,000 with atleast 75% of male working population engaged in non-agricultural pursuits and a population density of atleast 400 people per sq km."
        },
        {
            img: StatutaryTownIcon,
            title: "Statutary Towns",
            description: "All places with a municipality, corporation, cantonment board or notified town area committee as declared by the state law."
        },
        {
            img: UrbanAgglomerationIcon,
            title: "Urban Agglomeration",
            description: "Continous urban spreads constituting one or more towns and its adjoining urban outgrowths. A UA must consists of at least one statutory town, and its total population of all constituents put together should not be less than 20,000 as enumerated in the Census of 2001."
        }
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
            res[0].push(item["Sum of totalPop_2011_num"].toFixed(2))
            res[1].push(item["Average of hh_size"].toFixed(2))
            res[2].push(item["Average of basicInfrastructureIndex"].toFixed(2))
            res[3].push(item["Average of socialIndex"].toFixed(2))
            xList.push(item.settlementSizeClass)
        })

        res.forEach((r, idx) => {
            barDataTemplate[idx]['labels'] = xList
            barDataTemplate[idx].datasets[0]['data'] = r
        })

        setBarData(barDataTemplate)
    }

    function renderUSDef() {
        let res = []
        defContent.forEach((c, idx) => {
            res.push(
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-3 img-container">
                            <img src={c.img} alt="" />
                        </div>
                        <div className="col-md-9 text-container">
                            <h5>{c.title}</h5>
                            <p>{c.description}</p>
                        </div>
                    </div>
                </div>
            )
        })

        return res
    }

    function renderSettlementBatChart(data, yAxisLabel) {
        return (
            <Bar data={data} options={{
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Settlement Size Classes',
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: yAxisLabel,
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }}/>
        )
    }
    
    return (
        <div className="census-item-section">
            {/* <h3>Let's begin by looking at the governance structure of India</h3> */}
            <Overview 
                introImg={UrbanSettlementIntroImage}
                hideStats={true}
                title="Urban Settlements"
            />
            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <h4>Defining Urban Settlements</h4>
                    <p>Urban settlements in India consist of Statutory towns, Census towns, Cities, Metropolitan cities, Urban agglomerations and Outgrowth.</p>
                </div>
                <div className="col-md-8 viz-box">
                    <div className="row us-def-container">
                        {renderUSDef()}
                    </div>
                </div>
            </div>
            <div className="row item-sub-section">
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
                    <Kepler src="https://gis.iuo.dataspace.mobi/census/towns?readOnly=true" width="100%" height="900px" />
                </div>
            </div>
            <div className="row item-sub-section">
            <div className="col-md-4 insights-box">
                    <h4>Comparing settlement size with population, household, avg social and basic infra index</h4>
                    <p>The charts here show the distribution of population, household size, basic infrastructure, and social conditions among different settlement size classes.</p>
                    <p>Clearly, the 52 Metropolitan cities held the highest share of urban population.</p>
                    <p>In case of household size, class-III towns had the highest figure of 5.05.</p>
                    <p>The average value of Basic Infrastructure Index was found to be the highest in class II towns (0.869).</p>
                    <p>The average value of Social Index was found to be the highest in class VI towns (0.264).</p>
                </div>
                <div className="col-md-8 viz-box">
                    <div className="row">
                        <div className="col-md-6">
                            {renderSettlementBatChart(barData[0], barLabels[0])}
                        </div>
                        <div className="col-md-6">
                            {renderSettlementBatChart(barData[1], barLabels[1])}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            {renderSettlementBatChart(barData[2], barLabels[2])}
                        </div>
                        <div className="col-md-6">
                            {renderSettlementBatChart(barData[3], barLabels[3])}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default UrbanSettlements;