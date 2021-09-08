import React, {useState, useEffect} from 'react';
import {Scatter, Bar} from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Kepler from './Kepler';

import Overview from './Overview';

import WithInternetData from './with_internet.json';
import SexRatioLiteracyPerData from './sex_ratio_literacy_percentage.json';

import AreaImage from './img/area.svg'
import UrbanSettlementIntroImage from './img/housing_intro.svg';


function UrbanSettlements(props) {
    
    return (
        <div className="census-item-section">
            {/* <h3>Let's begin by looking at the governance structure of India</h3> */}
            <Overview 
                introImg={UrbanSettlementIntroImage}
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
                title="Urban Settlements"
                description={[
                    "Urban settlements in India consist of Statutory towns, Census towns, Cities, Metropolitan cities, Urban agglomerations and Outgrowth.",
                ]}
            />
            <div className="row gis-container">
                <div className="col-md-4">
                    <h4>Types of urban settlements in India</h4>
                    <p>The maps here represent the distribution of different types of urban settlements across states and union territories (UT), on the basis of</p>
                    <ul>
                        <li>Size class classification</li>
                        <li>Type of governing body</li>
                    </ul>
                    <p>Distribution of urban settlement sizes in states is not uniform across the country. For example the share of class I settlements was largest in Kerala (28%) whereas in West Bengal 52% of the settlements were class V towns.</p>
                    <p>In case of urban governance structure, 88% of the settlements in West Bengal were governed as Census Towns. On the other hand, Sikkim had the highest number of settlements governed as Municipal Corporations.</p>
                </div>
                <div className="col-md-8">
                    <Kepler src="http://iuo.dataspace.mobi:3001/census/towns?readOnly=true" width="100%" height="900px" />
                </div>
            </div>
        </div>
    )

}

export default UrbanSettlements;