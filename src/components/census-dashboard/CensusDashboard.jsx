import React, {useState} from 'react';
import {Scatter, Bar} from 'react-chartjs-2';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Header from './Header';
import Economy from './Economy';
import Housing from './Housing';
import Tableau from './Tableau';

import './CensusDashboard.scss';
import Demographics from './Demographics';
import Indices from './Indices';
import Population from './Population';
import UrbanSettlements from './UrbanSettlements';
import BasicInfra from './BasicInfra';

function CensusDashboard() {
    
    const [state, setState] = useState("All")
    const [settlementType, setSettlementType] = useState("All")
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
        // setCityNameState(e.target.value)
        // setCityState({})
    }

    function renderBarChart(data, xLabel, yLabel, legendDisplay = true) {
        return (
            <Bar data={data} options={{
                scales: {
                    yAxes: [
                        {
                            stacked: true,
                            scaleLabel: {
                                display: true,
                                labelString: yLabel,
                            }
                        }
                    ],
                    xAxes: [
                        {
                            stacked: true,
                            scaleLabel: {
                                display: true,
                                labelString: xLabel
                            }
                        }
                    ]
                },
                legend: {
                    display: legendDisplay
                }
            }}/>
        )
    }

    function onInputChange(e, setParameter) {
        console.log(e.target)
        if(e.target.name === 'state') {
            setState(e.target.value)
        } else if(e.target.name === 'settlementType') {
            setSettlementType(e.target.value)
        } else if(e.target.name === 'parameter') {
            setParameter(e.target.value)
        }
    }

    /* function prepareBarData(dataset) {
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

        dataset.forEach((item) => {
            if(item[paramMap[parameter]] === null) {
                return
            }
            if(item.state !== props.state.state && props.state.state !== 'All') {
                return
            }
            if(item.settlementType !== props.state.settlementType && props.state.settlementType !== 'All') {
                return
            }
            res.push(item[paramMap[parameter]])
            cityList.push(item.UA_city)
        })

        barData['labels'] = cityList
        barData.datasets[0]['data'] = res

        return barData
    } */

    function renderControls(paramObject, col = 6) {
        let paramSelect = ''
        if(paramObject !== undefined && 
            paramObject.paramMap !== undefined && 
            paramObject.paramState !== undefined && 
            paramObject.onParamChange !== undefined) {

            col = 4
            paramSelect =   <div className={"col-md-" + col}>
                                <FormControl className="full-width-select">
                                    <InputLabel id="parameter-select-label">Parameters</InputLabel>
                                    <Select
                                        labelId="parameter-select-label"
                                        id="parameter-select"
                                        name="parameter"
                                        value={paramObject.paramState}
                                        onChange={(e) => onInputChange(e, paramObject.onParamChange)}
                                    >
                                        {renderParamMenu(paramObject.paramMap)}
                                    </Select>
                                </FormControl>
                            </div>
        }
        return (
            <>
                <div className="row input-control-row">
                    {paramSelect}
                    <div className={"col-md-" + col}>
                        <FormControl className="full-width-select">
                            <InputLabel id="state-literacy-select-label">State</InputLabel>
                            <Select
                                labelId="state-literacy-select-label"
                                id="state-literacy-select"
                                name="state"
                                value={state}
                                onChange={onInputChange}
                            >
                                {renderControlMenu('state')}
                            </Select>
                        </FormControl>
                    </div>
                    <div className={"col-md-" + col}>
                        <FormControl className="full-width-select">
                            <InputLabel id="settlement-literacy-select-label">Settlement Type</InputLabel>
                            <Select
                                labelId="settlement-literacy-select-label"
                                id="settlement-literacy-select"
                                name="settlementType"
                                value={settlementType}
                                onChange={onInputChange}
                            >
                                {renderControlMenu('settlement')}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </>
        )
    }

    function renderParamMenu(paramMap) {
        let res = []

        Object.keys(paramMap).forEach((s, idx) => {
            res.push(
                <MenuItem key={idx} value={s}>{s}</MenuItem>
            )
        })

        return res
    }

    function renderControlMenu(type) {
        let list = []
        let res = []

        if(type === 'state') {
            list = stateList
        } else if(type === 'settlement') {
            list = settlementTypeList
        }

        list.forEach((s, idx) => {
            res.push(
                <MenuItem key={idx} value={s}>{s}</MenuItem>
            )
        })

        console.log(res)

        return res
    }

    /* function renderSettlementType() {
        let typeList = props.settlementTypeList
        let res = []

        typeList.forEach((s, idx) => {
            res.push(
                <MenuItem key={idx} value={s}>{s}</MenuItem>
            )
        })

        return res
    } */

    const renderer = {
        bar: renderBarChart,
        controls: renderControls
    }
    
    return (
        <>
            <Header cityList={["Gurgaon", "Delhi"]} callback={cityChangeEvent}/>
            <section className="CensusDashboard">

                <div className="container intro-box">
                    <p>This storyboard showcases the four studies prepared under the collaborative research project titled <span className="highlight">“Status of Demography, Economy, Social Structure, Housing and Basic Infrastructure of the Different Sizes of Urban Settlements”</span> by the Human Settlement Management Institute (HSMI) – Housing and Urban Development Corporation (HUDCO) Chair – National Institute of Urban Affairs (NIUA). The first report had concentrated on <span className="highlight">52 metropolitan cities</span> of India. The second report focused on analysis of <span className="highlight">non-metropolitan cities.</span> The third report focused on <span className="highlight">Towns of India.</span> The fourth report focused on the consolidated analysis of <span className="highlight">Urban India.</span></p>
                    <p>The interactive and geospatial dimensions added by the India Urban Observatory augment the analytical capabilities of these reports. This not only changes the perception of how we analyse trends and patterns for the future development of our cities but also enables us to translate this data to the citizens in a more perceivable manner for better participatory decision making. <span className="highlight">Let's begin by looking at what is 'urban' in India.</span></p>
                </div>

                <UrbanSettlements stateList={stateList} settlementTypeList={settlementTypeList}/>
                <Population stateList={stateList} settlementTypeList={settlementTypeList}/>
                <Demographics stateList={stateList} settlementTypeList={settlementTypeList}/>
                <Economy stateList={stateList} settlementTypeList={settlementTypeList}/>
                <Housing stateList={stateList} settlementTypeList={settlementTypeList}/>
                <BasicInfra state={{state: state, settlementType: settlementType}} renderer={renderer}/>
                <Indices state={{state: state, settlementType: settlementType}} renderer={renderer}/>

                {/* <Tableau/> */}

                {/* <iframe src="https://public.tableau.com/app/profile/naman1592/viz/CensusCityProfile-3/CityStory?publish=yes" frameBorder="0" width="100%" height="1900px"></iframe> */}
                

                {/* <h2>Population Density Map</h2>    */}
                {/* <iframe src="http://localhost:3001/census/nightlight?readOnly=true" frameborder="0" width="100%" height="900px"></iframe>  */}
                
            </section>
        </>
    )

}

export default CensusDashboard;