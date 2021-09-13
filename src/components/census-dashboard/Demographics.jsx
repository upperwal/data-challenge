import React from 'react';
import {Scatter} from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

import Overview from './Overview';

import SexRatioLiteracyPerData from './sex_ratio_literacy_percentage.json';
import IndexData from './index.json';

import DemographicsIntroImage from './img/demographics_intro.svg';
import LiteracyRateIcon from './img/icons/demo_literacy.svg';
import PopGrowthIcon from './img/icons/demo_popGrowth.svg';
import SexRatioIcon from './img/icons/demo_sexRatio.svg';

function Demographics(props) {

    let literacyAndSexRatioStats = {
        sexRatioMean: 0,
        literacyRateMean: 0
    }

    function prepareScatterSexRatioLiteracyData() {
        let res= []
        let cityList = []
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
            if(item.state !== props.state.state && props.state.state !== 'All') {
                return
            }
            if(item.settlementType !== props.state.settlementType && props.state.settlementType !== 'All') {
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
    
    return (
        <div className="census-item-section">
            {/* <h3>Now we will explore Urban India on various themes</h3> */}
            <Overview 
                introImg={DemographicsIntroImage}
                data={[
                    {
                        label: 'Effective Literacy Rate',
                        value: 73,
                        imgSrc: LiteracyRateIcon,
                        unitLabel: 'Percent'
                    },
                    {
                        label: 'Population Growth rate',
                        value: 17.7,
                        imgSrc: PopGrowthIcon,
                        fixTo: 1,
                        unitLabel: 'Percent'
                    },
                    {
                        label: 'National Sex Ratio',
                        value: 943,
                        imgSrc: SexRatioIcon,
                        unitLabel: 'Per 1k males'
                    }
                ]}
                title="Demographics"
                description={[
                    "Demographic analysis is the study of a population based on factors such as age, race, and sex. This Demographic data refers to people related  information for all the cities in India expressed statistically including population growth, literacy rates, sex ratio and other social indices."
                ]}
            />
            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <h4>Sex Ratio vs Literacy Rate Percentage</h4>
                    <p>The overall literacy rate was highest in metropolitan cities (87.1%) followed by non-metropolitan Class I cities (83.7%) and all towns (80.9%) as compared to 84.1% in urban India in 2011. The same pattern holds true for sex ratio as well.</p>
                    <p>The gender gap in towns of India was quite high at 12.3 per cent in 2011; much larger than the gender gap of urban India. The gender gap in non-metropolitan Class I cities of India was almost the same as in urban India (9.7%), while it was lowest in metropolitan India (7.6%).</p>
                </div>
                <div className="col-md-8 viz-box">
                    {props.renderer.controls()} 
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

            <div className="row item-sub-section">
                <div className="col-md-4 insights-box">
                    <h4>Social Index</h4>
                    <p>To arrive at social index values, the parameters used are:</p>
                    <ul>
                        <li>Sex ratio</li>
                        <li>Child (0-6 years) sex ratio</li>
                        <li>Effective male literacy rate</li>
                        <li>Effective female literacy rate</li>
                        <li>Effective overall literacy rate</li>
                    </ul>
                    <p>In case of metropolitan cities Kannur was the best and Agra the worst city.</p>
                    <p>For the non-metropolitan class I cities Aizawl was the best and Sambhal was the worst city.</p>
                    <p>Among the towns, GSFC (Motikhavdi Sikka) (INA), Gujarat came out as the best town and Kumarpur (CT), Jharkhand was the worst.</p>
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
                                    fieldName: 'socialIndex'
                                }
                            },
                            true
                        ),
                        '',
                        'Social Index',
                        false
                    )}
                </div>
            </div>
            
        </div>
    )

}

export default Demographics;