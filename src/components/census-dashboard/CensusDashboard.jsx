import React, {useState, useEffect} from 'react';
import {Scatter, Bar} from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Header from './Header';
import Overview from './Overview';
import Kepler from './Kepler';
import Economy from './Economy';
import Housing from './Housing';

import PopImage from './img/population.svg'
import AreaImage from './img/area.svg'
import DistanceImage from './img/distance.svg'

// # TODO: To be replaced with fetch
import IndexData from './index.json';
import SexRatioLiteracyPerData from './sex_ratio_literacy_percentage.json';
import WithInternetData from './with_internet.json';

import './CensusDashboard.scss';

function CensusDashboard() {

    const [cityState, setCityState] = useState({});
    const [cityNameState, setCityNameState] = useState('Delhi');
    const [xAxisIndex, setXAxisIndex] = useState("Basic Infrastructure Index")
    const [yAxisIndex, setYAxisIndex] = useState("Housing Quality Index")
    const [stateIndex, setStateIndex] = useState("All")
    const [settlementTypeIndex, setSettlementTypeIndex] = useState("All")
    const [stateIndexLiteracy, setStateIndexLiteracy] = useState("All")
    const [settlementTypeIndexLiteracy, setSettlementTypeIndexLiteracy] = useState("All")
    let literacyAndSexRatioStats = {
        sexRatioMean: 0,
        literacyRateMean: 0
    }
    const stateList = [
        "All",
        "Andaman and Nicobar Islands",
        "Andhra Pradesh",
        "Assam",
        "Bihar",
        "Chandigarh",
        "Chhattisgarh",
        "Delhi",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Puducherry",
        "Punjab",
        "Rajasthan",
        "Tamil Nadu",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal"
    ]
    const settlementTypeList = [
        "All",
        "CMC",
        "CT",
        "KatniMCorp.",
        "M",
        "MC",
        "M Cl",
        "MCl",
        "M Corp.",
        "MCorp.",
        "Nagar Parishad",
        "NagarParishad",
        "NPP",
        "NT",
        "PetUA"
    ]

    // useEffect(() => {
    //     fetch('http://13.235.244.95:3000/public/question/0ea4b419-8808-4ab0-b0c0-37cfba7aa634.json')
    //         .then(res => res.json())
    //         .then(console.log)
    // })

    function cityChangeEvent(e) {
        setCityNameState(e.target.value)
        setCityState({})
    }

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

    function renderStateMenu() {
        let res = []

        stateList.forEach((s, idx) => {
            res.push(
                <MenuItem value={s}>{s}</MenuItem>
            )
        })

        return res
    }

    function renderSettlementType() {
        let res = []

        settlementTypeList.forEach((s, idx) => {
            res.push(
                <MenuItem value={s}>{s}</MenuItem>
            )
        })

        return res
    }
    
    return (
        <>
        <Header cityList={["Gurgaon", "Delhi"]} callback={cityChangeEvent}/>
        <section className="CensusDashboard">

            <h1>Let's summarise Census 2011</h1>
            <p>This summary is compiled from the <a href="https://www.censusindia.gov.in/2011census/PCA/PCA_Highlights/pca_highlights_file/India/4Executive_Summary.pdf" target="_blank">Executive Summary</a> available on Census of India's website.</p>
                

            <div className="census-item-section">
                <Overview 
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
                    title="Administrative Units (AU)"
                    description={[
                        "AU's in census follow a hierarchical structure where states / UTs are divided into districts followed by sub-districts, towns and villages.",
                        "Here we cover number of AUs covered in Census 2011. There is an increase of 47 districts, 461 sub-districts, 2772 towns and 2342 villages since Census 2001."
                    ]}
                />
                <div className="row gis-container">
                    <div className="col-md-4">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo sem, tempor eu ornare ornare, lobortis vitae nisi. Quisque eget orci sed odio pellentesque elementum eu pretium est.</p>
                        <p>Sed tempor vulputate purus, at viverra justo accumsan eu. In lobortis consectetur dapibus. Suspendisse potenti. Donec molestie, eros malesuada viverra hendrerit, augue ex varius massa, pulvinar semper leo turpis ac tortor. Sed venenatis fringilla imperdiet. Proin erat neque, dapibus imperdiet augue id, mollis malesuada dui. </p>
                        <p>Proin condimentum pharetra sem. Fusce bibendum diam id odio tristique, ac rutrum est tempor. Integer lorem sem, condimentum sed tincidunt id, facilisis ut arcu.</p>
                    </div>
                    <div className="col-md-8">
                        <Kepler src="http://13.235.244.95:3001/census/towns?readOnly=true" width="100%" height="900px" />
                    </div>
                </div>
            </div>

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
                    title="Population"
                    description={[
                        "In absolute numbers, out of the total increase of 182 million added since 2001, the contribution of rural and urban are equal i.e. 91 million each."
                    ]}
                />
                <div className="row gis-container">
                    <div className="col-md-4">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo sem, tempor eu ornare ornare, lobortis vitae nisi. Quisque eget orci sed odio pellentesque elementum eu pretium est.</p>
                        <p>Sed tempor vulputate purus, at viverra justo accumsan eu. In lobortis consectetur dapibus. Suspendisse potenti. Donec molestie, eros malesuada viverra hendrerit, augue ex varius massa, pulvinar semper leo turpis ac tortor. Sed venenatis fringilla imperdiet. Proin erat neque, dapibus imperdiet augue id, mollis malesuada dui. </p>
                        <p>Proin condimentum pharetra sem. Fusce bibendum diam id odio tristique, ac rutrum est tempor. Integer lorem sem, condimentum sed tincidunt id, facilisis ut arcu.</p>
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
                                <Kepler src="http://13.235.244.95:3001/census/population?readOnly=true" frameBorder="0" width="100%" height="900px" />
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
            </div>


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
                    </div>
                    <div className="col-md-8">
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



            <div className="census-item-section">
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
                        <p>Phasellus dictum arcu sit amet leo tempor bibendum. Aliquam eu imperdiet nulla, sed consectetur dui. Mauris velit libero, venenatis a congue vel, luctus id nunc. Suspendisse a laoreet metus.</p>
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
                    </div>
                    <div className="col-md-8">
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
                    </div>
                </div>
                
            </div>


            <Economy stateList={stateList} settlementTypeList={settlementTypeList}/>
            <Housing stateList={stateList} settlementTypeList={settlementTypeList}/>

            <iframe src="https://public.tableau.com/app/profile/naman1592/viz/CensusCityProfile-3/CityStory?publish=yes" frameBorder="0" width="100%" height="1900px"></iframe>
            

            {/* <h2>Population Density Map</h2>    */}
            {/* <iframe src="http://localhost:3001/census/nightlight?readOnly=true" frameborder="0" width="100%" height="900px"></iframe>  */}
            
            


            
        </section>
        </>
    )

}

export default CensusDashboard;