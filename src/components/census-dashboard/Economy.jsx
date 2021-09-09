import React, {useState} from 'react';

import Overview from './Overview';

import WithInternetData from './with_internet.json';
import IndexData from './index.json';

import PopImage from './img/population.svg'
import EconomyIntroImage from './img/economy_intro.svg';

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
                        label: 'Households owning a TV (Metros)',
                        value: 83.6,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'Households owning a transistors (Metros)',
                        value: 32.6,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'Households owning a computer (Metros)',
                        value: 24.1,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'Households owning a mobile phone (Metros)',
                        value: 64.3,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'Households owning a landline phone (Metros)',
                        value: 7.0,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'Households owning a bicycle (Metros)',
                        value: 43.2,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'Households owning a two-wheelers (Metros)',
                        value: 44.0,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    },
                    {
                        label: 'Households owning a four-wheelers (Metros)',
                        value: 14.0,
                        imgSrc: PopImage,
                        fixTo: 1,
                        unitLabel: 'Percentage'
                    }
                ]}
                title="Economy"
                description={[
                    "This economic data refers to socioeconomic information for all the urban settlements in India expressed statistically including asset holding, poverty and unemployment change, asset holding index (AHI) and economic permanence index (EPI)."
                ]}
            />
            <div className="row">
                <div className="col-md-4 insights-box">
                    <h4>Asset Holdings</h4>
                    <p>The charts show the value as the percentage of households for various asset holdings parameters listed below</p>
                    <ul>
                        <li>Radio/transistor</li>
                        <li>Television</li>
                        <li>Computer without internet</li>
                        <li>Computer with internet</li>
                        <li>Landline</li>
                        <li>Mobile</li>
                        <li>Mobile and Landline</li>
                        <li>Bicycle</li>
                        <li>Motorcycle/Scooter/Moped</li>
                        <li>Car/Jeep</li>
                    </ul>
                </div>
                <div className="col-md-8">
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

            <div className="row">
                <div className="col-md-4 insights-box">
                    <h4>Economic Performance Index (EPI)</h4>
                    <p>To arrive at EPI, principal component analysis (PCA) was constructed with the following parameters:</p>
                    <ul>
                        <li>per-capita gross domestic product of metropolitan and non-metropolitan Class I districts</li>
                        <li>percentage of usually employed persons engaged in quality, i.e. regular salaried jobs</li>
                        <li>percentage of people above poverty line</li>
                    </ul>
                    <p>An analysis of economic indicators reveals that among the metropolitan cities, Faridabad tops the list, while Allahabad ranks the lowest. The corresponding cities in non-metropolitan India were Udhagamandalam and Barabanki respectively.</p>
                </div>
                <div className="col-md-8">
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

            <div className="row">
                <div className="col-md-4 insights-box">
                    <h4>Asset Holding Index (AHI)</h4>
                    <p>To arrive at the asset holdings index, the parameters used were: percentage of households with</p>
                    <ul>
                        <li>radio</li>
                        <li>television</li>
                        <li>computer/laptop</li>
                        <li>mobile phones</li>
                        <li>bicycles</li>
                        <li>two-wheelers</li>
                        <li>four-wheelers</li>
                    </ul>
                    <p>In case of metropolitan cities, Thrissur comes out as the best metro, and Dhanbad as the worst.</p>
                </div>
                <div className="col-md-8">
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