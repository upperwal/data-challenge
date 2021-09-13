import React from 'react';
import {Bar} from 'react-chartjs-2';

import Overview from './Overview';

import HousingData from './housing_data.json';
import HousingRoomData from './housing_room_data.json';
import HousingOccupiedVacantData from './housing_occupied_vacant_data.json';
import IndexData from './index.json';
import HousingStock from './housing_stock_pop.json';

import GoodQualityIcon from './img/icons/housing_good.svg';
import LivableQualityIcon from './img/icons/housing_livable.svg';
import DilapidatedQualityIcon from './img/icons/housing_dilapidated.svg';
import HousingIntroImage from './img/housing_intro.svg';

function Housing(props) {

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
            if(item.state !== props.state.state && props.state.state !== 'All') {
                return
            }
            if(item.settlementType !== props.state.settlementType && props.state.settlementType !== 'All') {
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
            if(item.state !== props.state.state && props.state.state !== 'All') {
                return
            }
            if(item.settlementType !== props.state.settlementType && props.state.settlementType !== 'All') {
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
            if(item.state !== props.state.state && props.state.state !== 'All') {
                return
            }
            if(item.settlementType !== props.state.settlementType && props.state.settlementType !== 'All') {
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

    function prepareBarIndexData() {
        let data = []
        let cityList = []
        const barData = {
            datasets: [
                {
                    label: 'Housing Quality Index',
                    backgroundColor: '#f6264c'
                }
            ]
        };

        IndexData.sort(function(a, b) {
            return a.housigQualityIndex - b.housigQualityIndex;
        })

        IndexData.forEach((item) => {
            if(item.housigQualityIndex === null ) {
                return
            }
            if(item.state !== props.state.state && props.state.state !== 'All') {
                return
            }
            if(item.settlementType !== props.state.settlementType && props.state.settlementType !== 'All') {
                return
            }
            data.push(item.housigQualityIndex)
            cityList.push(item.UA_city)
        })

        barData['labels'] = cityList
        barData.datasets[0]['data'] = data

        return barData
    }

    function prepareBarHousingStockData() {
        let barData = {
            datasets: [
                {
                    label: 'Housing Stock Share',
                    backgroundColor: '#f6264c'
                },
                {
                    label: 'Population Share',
                    backgroundColor: '#592F93'
                }
            ]
        };
        let res= [[], []]
        let cityList = []

        HousingStock.forEach((item) => {
            if(item.housingStock_residential_shareIn52metros_per === null || item.population_shareIn52metros_per === null) {
                return
            }
            if(item.state !== props.state.state && props.state.state !== 'All') {
                return
            }
            if(item.settlementType !== props.state.settlementType && props.state.settlementType !== 'All') {
                return
            }
            res[0].push(item.housingStock_residential_shareIn52metros_per)
            res[1].push(item.population_shareIn52metros_per)
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
                introImg={HousingIntroImage}
                data={[
                    {
                        label: 'City with Highest Good Houses %',
                        value: 88.9,
                        imgSrc: GoodQualityIcon,
                        fixTo: 1,
                        unitLabel: 'Tirupati'
                    },
                    {
                        label: 'City with Highest Livable Houses %',
                        value: 61.5,
                        imgSrc: LivableQualityIcon,
                        fixTo: 1,
                        unitLabel: 'Bagaha'
                    },
                    {
                        label: 'City with Highest Dilapidated Houses %',
                        value: 18.9,
                        imgSrc: DilapidatedQualityIcon,
                        fixTo: 1,
                        unitLabel: 'Raiganj'
                    }
                ]}
                title="Housing"
                description={[
                    "This housing data refers to the information for all the urban settlements in India expressed statistically including housing quality, occupancy, room availability, share of housing stock and housing index."
                ]}
            />
            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <h4>Housing Quality</h4>
                    <p>Quality of housing in Census is reported as 'good', 'liveable' or 'dilapidated'. The chart shows the percentage of each category for a city.</p>
                    <p>Overall in Urban India, 68.5 % of the total houses were classified as ‘good’ in the Census 2011, better than the 53.2% figure for India. Nearly 28.6% were reported to be in 'livable' condition and 2.9% as 'dilapidated'.</p>
                    <p>Among cities, Tirupati had the highest percentage of 'good' quality housing at 88.91%, whereas Raiganj had the highest percentage of 'dilapidated' quality housing at 18.95%.</p>
                </div>
                <div className="col-md-8 viz-box">
                    {props.renderer.controls()}
                    <Bar data={prepareBarQualityData()} options={{
                        scales: {
                            yAxes: [
                                {
                                    stacked: true,
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Percentage'
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

            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <h4>Room Availability</h4>
                    <p>When it comes to adequate housing, Greater Mumbai appears to be the most congested metropolitan city with 7.7% of the households having no exclusive room and a further 57.3% living in just one room.</p>
                    <p>In rest of the cities, Bhiwandi, had 11% households having no exclusive room and 59.3% with just one room. Srinagar  had the largest percentage of houses with six rooms or more (22.6%).</p>
                </div>
                <div className="col-md-8 viz-box">
                    {props.renderer.controls()}
                    <Bar data={prepareBarRoomData()} options={{
                        scales: {
                            yAxes: [
                                {
                                    stacked: true,
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Percentage'
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

            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <h4>Houses Occupied vs Vacant</h4>
                    <p>At 52.04%, Greater Noida had the highest percentage of vacant houses in the country, followed by Bhiwadi at 33.32%.</p>
                    <p>On the other end of the spectrum were cities like Balurghat and Santipur having just 2.41% and 2.81% of vacant housing, respectively.</p>
                </div>
                <div className="col-md-8 viz-box">
                    {props.renderer.controls()}
                    <Bar data={prepareBarOccupiedVacantData()} options={{
                        scales: {
                            yAxes: [
                                {
                                    stacked: true,
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Percentage'
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


            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <h4>Share of Housing Stock and Share of Population in 52 Metropolitan</h4>
                    <p>The chart shows the share of residential housing stock and share of population of each city in the sum total of 52 metropolitan cities.</p>
                    <p>Among 52 metropolitan cities, Greater Mumbai had almost similar share of residential housing stock and population.</p>
                    <p>While looking at the difference between two measures, Kolkata had just 3.85% of residential housing stock for 8.84% share of the population. The situation becomes mirrored for Bengaluru, where the share of residential housing stock is 8.43% whereas the share of population is just 5.32%.</p>
                </div>
                <div className="col-md-8 viz-box">
                    {props.renderer.controls()}
                    {props.renderer.bar(
                        prepareBarHousingStockData(),
                        '',
                        'Percentage share in 52 Metropolitan',
                        true
                    )}
                </div>
            </div>


            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <h4>Housing Quality Index</h4>
                    <p>The chart shows value of housing quality index for each city. The parameters considered for the calculation of this index include Condition of houses as ‘good’, Houses using permanent material for roofs, Houses using permanent material for walls, Houses using permanent material for floors, Houses having more than one room.</p>
                    <p>Among metropolitan cities, Surat (1.730) had the highest value of the index while Dhanbad (-2.596) had the lowest value.</p>
                    <p>In case of class-I non-metropolitan cities, Tiruppur (1.597) had the highest index value whereas Bagaha (-4.866) had the lowest index value.</p>
                </div>
                <div className="col-md-8 viz-box">
                    {props.renderer.controls()}
                    <Bar data={prepareBarIndexData()} options={{
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