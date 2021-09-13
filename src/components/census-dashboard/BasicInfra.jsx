import React, {useState, useEffect} from 'react';
import {Scatter, Bar} from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Overview from './Overview';

import BasicInfraData from './basic_infra.json';
import SlumPopData from './slum_population.json';
import IndexData from './index.json';

import ElectricityIcon from './img/icons/bi_electricity.svg';
import LatrineIcon from './img/icons/bi_latrine.svg';
import TapwaterIcon from './img/icons/bi_tapwater.svg';
import BasicInfraIntroImage from './img/basic_infrastructure_intro.svg';

function BasicInfra(props) {

    const paramMap = {
        'Percent households with bathroom within premises': 'bathroom_withinPremises_HH_per',
        'Percent households with source of fuel as gas': 'sourceOfFuel_gas_HH_per',
        'Percent households with electricity as the main source of lighting': 'mainSourceOfLighting_Electricity_HH_per',
        'Percent households availing banking services': 'availingBankingServices_HH_per',
        'Percent households with drinking source within primises': 'drinkingWaterSourece_withinPremises_HH_per',
        'Percent households with latrine facility along with flush': 'latrinFacility_flushLatrineWithPipedSewerWithinPremises_HH_per',
        'Percent households with latrine facility': 'latrinFacility_withinPremises_HH_per',
        'Percent households with watewater outlet connected with closed drainage': 'wasteWater_outletConnectedToClosedDrainage_HH_per'
    }
    const [parameter, setParameter] = useState("Percent households with bathroom within premises")

    function prepareBarData(dataset, datasetOptions, sort = false) {
        let yList= []
        let xList = []
        let barData = {
            datasets: [
                {
                    label: datasetOptions.label,
                    backgroundColor: '#f6264c'
                }
            ]
        };

        if(sort) {
            dataset.sort(function(x, y) {
                return x[datasetOptions.y.fieldName] - y[datasetOptions.y.fieldName]
            })
        }

        dataset.forEach((item) => {
            if(item[datasetOptions.y.fieldName] === null) {
                return
            }
            if(item.state !== props.state.state && props.state.state !== 'All') {
                return
            }
            if(item.settlementType !== props.state.settlementType && props.state.settlementType !== 'All') {
                return
            }
            yList.push(item[datasetOptions.y.fieldName])
            xList.push(item[datasetOptions.x.fieldName])
        })

        barData['labels'] = xList
        barData.datasets[0]['data'] = yList

        return barData
    }
    
    return (
        <div className="census-item-section">
            <Overview 
                introImg={BasicInfraIntroImage}
                data={[
                    {
                        label: 'Avg HHs w/ Drinking Water within Primises',
                        value: 78.66,
                        imgSrc: TapwaterIcon,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'Avg HHs w/ Latrine Facility within Primises',
                        value: 84.3,
                        imgSrc: LatrineIcon,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'Avg HHs w/ Electricity as Main Source of Lighting',
                        value: 92.6,
                        imgSrc: ElectricityIcon,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    }
                ]}
                title="Basic Infrastructure"
                description={[
                    "This basic infrastructure data refers to the information for all the urban settlements in India expressed statistically including household infrastructure amenities, extent of slums, and basic infrastructure index."
                ]}
            />

            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <h4>Basic Infrastructure Parameters</h4>
                    <p>The charts show the value as the percentage of households for various basic infrastructure parameters listed below:</p>
                    <ul>
                        <li>Tap Water From Treated Source Within Premise</li>
                        <li>Drinking water source within premises</li>
                        <li>Electricity as main source of lighting</li>
                        <li>Latrine facility</li>
                        <li>Latrine facility with flush within premises</li>
                        <li>Bathroom within premises</li>
                        <li>Wastewater-outlet connected to closed drainage</li>
                        <li>Gas as source of fuel</li>
                        <li>Availing banking services</li>
                    </ul>
                </div>
                <div className="col-md-8 viz-box">
                    {props.renderer.controls({
                        paramMap: paramMap,
                        paramState: parameter,
                        onParamChange: setParameter
                    })}
                    {props.renderer.bar(
                        prepareBarData(
                            BasicInfraData, 
                            {
                                label: parameter,
                                x: {
                                    fieldName: 'UA_city'
                                },
                                y: {
                                    fieldName: paramMap[parameter]
                                }
                            },
                            true
                        ), 
                        '', 
                        parameter, 
                        false
                    )}
                </div>
            </div>

            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <h4>Slum Population</h4>
                    <p>With 44.14% of its population living in slums, Greater Visakhapatnam tops the chart of cities with slum population. On the other hand, with lowest percentage of the measure, Thiruvananthapuram had just a minute fraction (0.71%) of its population living in slums.</p>
                </div>
                <div className="col-md-8 viz-box">
                    {props.renderer.controls()}
                    {props.renderer.bar(
                        prepareBarData(
                            SlumPopData,
                            {
                                label: 'Percentage of Slum Population',
                                x: {
                                    fieldName: 'UA_city'
                                },
                                y: {
                                    fieldName: 'slumPopulation_per'
                                }
                            },
                            true
                        ), 
                        '', 
                        'Percentage of Slum Population', 
                        false
                    )}
                </div>
            </div>

            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <h4>Basic Infrastructure Index</h4>
                    <p>Among the cities having highest values of Basic Infrastructure Index are class IV, V, and V towns like the Industrial Notified Area of Reliance Complex, and Census Towns Behlana and Ordnance Factory Itarsi.</p>
                    <p>On the other hand, cities like Ambala, Baharampur, and Barabanki had the lowest value of the index as -2.801.</p>
                </div>
                <div className="col-md-8 viz-box">
                    {props.renderer.controls()}
                    {props.renderer.bar(
                        prepareBarData(
                            IndexData,
                            {
                                label: 'Basic Infrastructure Index',
                                x: {
                                    fieldName: 'UA_city'
                                },
                                y: {
                                    fieldName: 'basicInfrastructureIndex'
                                }
                            },
                            true
                        ), 
                        '', 
                        'Basic Infrastructure Index', 
                        false
                    )}
                </div>
            </div>


            
        </div>
    )

}

export default BasicInfra;