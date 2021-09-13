import React, {useState} from 'react';

import Overview from './Overview';

import WithInternetData from './with_internet.json';
import IndexData from './index.json';

import EconomyIntroImage from './img/economy_intro.svg';
import TVIcon from './img/icons/asset_tv.svg';
import ComputerInternetIcon from './img/icons/asset_compInternet.svg';
import TwoWheelerIcon from './img/icons/asset_2wheeler.svg';


function Economy(props) {

    const paramMap = {
        'Percent households having car': 'asset_car_jeep_van_per',
        'Percent households having mobile only': 'asset_mobileOnly_per',
        'Percent households having landline only': 'asset_landlineOnly_per',
        'Percent households having scooter': 'asset_scooter_motorcycle_moped_per',
        'Percent households having bicycle': 'asset_bicycle_per',
        'Percent households having computer with internet': 'asset_computerWithInternet_per'
    }
    const [parameter, setParameter] = useState("Percent households having car")
    
    return (
        <div className="census-item-section">
            <Overview 
                introImg={EconomyIntroImage}
                data={[
                    {
                        label: 'HHs owning a TV (Metros)',
                        value: 83.6,
                        imgSrc: TVIcon,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'HHs owning a computer w/ internet (Metros)',
                        value: 11.6,
                        imgSrc: ComputerInternetIcon,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'HHs owning a two-wheelers (Metros)',
                        value: 44.0,
                        imgSrc: TwoWheelerIcon,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'HHs owning a TV (Non-Metros)',
                        value: 72.9,
                        imgSrc: TVIcon,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'HHs owning a computer w/ internet (Non-Metros)',
                        value: 5.1,
                        imgSrc: ComputerInternetIcon,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'HHs owning a two-wheelers (Non-Metros)',
                        value: 34.1,
                        imgSrc: TwoWheelerIcon,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    }
                ]}
                title="Economy"
                description={[
                    "This economic data refers to socioeconomic information for all the urban settlements in India expressed statistically including asset holding, poverty and unemployment change, asset holding index (AHI) and economic permanence index (EPI)."
                ]}
            />
            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <h4>Asset Holdings</h4>
                    <p>The charts show the value as the percentage of households for various asset holdings parameters listed below</p>
                    <ul>
                        <li>Car/Jeep</li>
                        <li>Mobile</li>
                        <li>Landline</li>
                        <li>Motorcycle/Scooter/Moped</li>
                        <li>Bicycle</li>
                        <li>Computer with internet</li>
                    </ul>
                </div>
                <div className="col-md-8 viz-box">
                    {props.renderer.controls({
                        paramMap: paramMap,
                        paramState: parameter,
                        onParamChange: setParameter
                    })}
                    {props.renderer.bar(
                        props.utils.prepareBarData(
                            WithInternetData,
                            {
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
                    <h4>Economic Performance Index (EPI)</h4>
                    <p>To arrive at EPI, principal component analysis (PCA) was constructed using per-capita gross domestic product of metropolitan and non-metropolitan Class I districts, percentage of usually employed persons engaged in quality, i.e. regular salaried jobs and percentage of people above the poverty line.</p>
                    <p>An analysis of economic indicators reveals that among the metropolitan cities, Faridabad tops the list, while Allahabad ranks the lowest. The corresponding cities in non-metropolitan India were Udhagamandalam and Barabanki respectively.</p>
                </div>
                <div className="col-md-8 viz-box">
                    {props.renderer.controls()}
                    {props.renderer.bar(
                        props.utils.prepareBarData(
                            IndexData,
                            {
                                x: {
                                    fieldName: 'UA_city'
                                },
                                y: {
                                    fieldName: 'ecomonicPerformanceIndex'
                                }
                            },
                            true
                        ),
                        '',
                        'Economic Performance Index',
                        false
                    )}
                </div>
            </div>

            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <h4>Asset Holding Index (AHI)</h4>
                    <p>To arrive at the asset holdings index, the parameters used include percentage of households with radio, television, computer/laptop, mobile phones, bicycles, two-wheelers and four-wheelers.</p>
                    <p>In case of metropolitan cities, Thrissur comes out as the best metro, and Dhanbad as the worst.</p>
                </div>
                <div className="col-md-8 viz-box">
                    {props.renderer.controls()} 
                    {props.renderer.bar(
                        props.utils.prepareBarData(
                            IndexData,
                            {
                                x: {
                                    fieldName: 'UA_city'
                                },
                                y: {
                                    fieldName: 'assetHoldingsIndex'
                                }
                            },
                            true
                        ),
                        '',
                        'Asset Holding Index',
                        false
                    )}
                </div>
            </div>
            
        </div>
    )

}

export default Economy;