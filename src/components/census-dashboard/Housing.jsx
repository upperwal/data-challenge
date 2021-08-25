import React, {useState, useEffect} from 'react';
import {Scatter, Bar} from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Overview from './Overview';

import HousingData from './housing_data.json';
import HousingRoomData from './housing_room_data.json';
import HousingOccupiedVacantData from './housing_occupied_vacant_data.json';

import PopImage from './img/population.svg'
import AreaImage from './img/area.svg'
import DistanceImage from './img/distance.svg'

function Housing(props) {

    const [state, setState] = useState("All")
    const [settlementType, setSettlementType] = useState("All")
    
    


    function onInputChange(e) {
        console.log(e.target)
        if(e.target.name == 'state') {
            setState(e.target.value)
        } else if(e.target.name == 'settlementType') {
            setSettlementType(e.target.value)
        }
    }

    function prepareBarQualityData() {
        let d1 = [], d2 = [], d3 = []
        let cityList = []
        const barData = {
            datasets: [
                {
                    label: 'Housing Quality: Good',
                    backgroundColor: '#f6264c'
                },
                {
                    label: 'Housing Quality: Livable',
                    backgroundColor: '#592F93'
                },
                {
                    label: 'Housing Quality: Dilapidated',
                    backgroundColor: '#22979E'
                }
            ]
        };

        HousingData.forEach((item) => {
            if(item.housing_quality_good_per === null || item.housing_quality_livable_per === null || item.housing_quality_dilapidated_per === null) {
                return
            }
            if(item.state !== state && state !== 'All') {
                return
            }
            if(item.settlementType !== settlementType && settlementType !== 'All') {
                return
            }
            d1.push(item.housing_quality_good_per)
            d2.push(item.housing_quality_livable_per)
            d3.push(item.housing_quality_dilapidated_per)
            cityList.push(item.UA_city)
        })

        barData['labels'] = cityList
        barData.datasets[0]['data'] = d1
        barData.datasets[1]['data'] = d2
        barData.datasets[2]['data'] = d3

        return barData
    }
    
    function prepareBarRoomData() {
        let data = [[], [], [], [], [], [], []]
        let cityList = []
        const barData = {
            datasets: [
                {
                    label: '% Households with no exclusive room',
                    backgroundColor: '#22979E'
                },
                {
                    label: '% Households with one room',
                    backgroundColor: '#592F93'
                },
                {
                    label: '% Households with two rooms',
                    backgroundColor: '#f6264c'
                },
                {
                    label: '% Households with three rooms',
                    backgroundColor: '#88572C'
                },
                {
                    label: '% Households with four rooms',
                    backgroundColor: '#FF991F'
                },
                {
                    label: '% Households with five rooms',
                    backgroundColor: '#F5D18A'
                },
                {
                    label: '% Households with six rooms',
                    backgroundColor: '#16B8BE'
                }
            ]
        };

        HousingRoomData.forEach((item) => {
            if(
                item.housing_noExclusiveRoom_per === null || 
                item.housing_oneRroom_per === null || 
                item.housing_twoRooms_per === null ||
                item.housing_threeRooms_per === null ||
                item.housing_fourRooms_per === null ||
                item.housing_fiveRooms_per === null ||
                item.housing_sixRoomsPlus_per === null
            ) {
                return
            }
            if(item.state !== state && state !== 'All') {
                return
            }
            if(item.settlementType !== settlementType && settlementType !== 'All') {
                return
            }
            data[0].push(item.housing_noExclusiveRoom_per)
            data[1].push(item.housing_oneRroom_per)
            data[2].push(item.housing_twoRooms_per)
            data[3].push(item.housing_threeRooms_per)
            data[4].push(item.housing_fourRooms_per)
            data[5].push(item.housing_fiveRooms_per)
            data[6].push(item.housing_sixRoomsPlus_per)
            cityList.push(item.UA_city)
        })

        barData['labels'] = cityList
        data.forEach((d, idx) => {
            barData.datasets[idx]['data'] = d
        })

        return barData
    }

    function prepareBarOccupiedVacantData() {
        let data = [[], []]
        let cityList = []
        const barData = {
            datasets: [
                {
                    label: 'Occupied Houses',
                    backgroundColor: '#f6264c'
                },
                {
                    label: 'Vacant Houses',
                    backgroundColor: '#592F93'
                }
            ]
        };

        HousingOccupiedVacantData.forEach((item) => {
            if(item.occupiedHouses_per === null || item.vacantHouses_per === null) {
                return
            }
            if(item.state !== state && state !== 'All') {
                return
            }
            if(item.settlementType !== settlementType && settlementType !== 'All') {
                return
            }
            data[0].push(item.occupiedHouses_per)
            data[1].push(item.vacantHouses_per)
            cityList.push(item.UA_city)
        })

        barData['labels'] = cityList
        data.forEach((d, idx) => {
            barData.datasets[idx]['data'] = d
        })

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
                title="Housing"
                description={[
                    "Along with socioeconomic data, the Houselisting and Housing Census was also conducted to identify each building/census house and also to ascertain the quality of the census house, amenities accessible to it and assets available to the households living in those census houses. This Housing data refers to socioeconomic information for all the cities in India expressed statistically including housing quality, occupancy, housing amenities, share of  housing stock and housing index."
                ]}
            />
            <div className="row">
                <div className="col-md-4 insights-box">
                    <h5>Housing Quality</h5>
                    <p>Phasellus dictum arcu sit amet leo tempor bibendum. Aliquam eu imperdiet nulla, sed consectetur dui. Mauris velit libero, venenatis a congue vel, luctus id nunc. Suspendisse a laoreet metus.</p>
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
                </div>
                <div className="col-md-8">
                    <Bar data={prepareBarQualityData()} options={{
                        scales: {
                            yAxes: [
                                {
                                    stacked: true,
                                    ticks: {
                                        beginAtZero: true,
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    stacked: true
                                }
                            ]
                        }
                    }}/>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 insights-box">
                    <h5>Room Availability</h5>
                    <p>Phasellus dictum arcu sit amet leo tempor bibendum. Aliquam eu imperdiet nulla, sed consectetur dui. Mauris velit libero, venenatis a congue vel, luctus id nunc. Suspendisse a laoreet metus.</p>
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
                </div>
                <div className="col-md-8">
                    <Bar data={prepareBarRoomData()} options={{
                        scales: {
                            yAxes: [
                                {
                                    stacked: true,
                                    ticks: {
                                        beginAtZero: true,
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    stacked: true
                                }
                            ]
                        }
                    }}/>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 insights-box">
                    <h5>Houses Occupied vs Vacant</h5>
                    <p>Phasellus dictum arcu sit amet leo tempor bibendum. Aliquam eu imperdiet nulla, sed consectetur dui. Mauris velit libero, venenatis a congue vel, luctus id nunc. Suspendisse a laoreet metus.</p>
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
                </div>
                <div className="col-md-8">
                    <Bar data={prepareBarOccupiedVacantData()} options={{
                        scales: {
                            yAxes: [
                                {
                                    stacked: true,
                                    ticks: {
                                        beginAtZero: true,
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    stacked: true
                                }
                            ]
                        }
                    }}/>
                </div>
            </div>


            
        </div>
    )

}

export default Housing;