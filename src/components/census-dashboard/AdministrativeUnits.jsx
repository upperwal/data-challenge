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

import PopImage from './img/population.svg'
import AreaImage from './img/area.svg'
import DistanceImage from './img/distance.svg'

function Population(props) {
    
    return (
        <div className="census-item-section">
            <h3>Let's begin by looking at the governance structure of India</h3>
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
                    "India follows a hierarchical governance structure where states / UTs are divided into districts followed by sub-districts, towns and villages.",
                    "These units of governance are termed as Administrative Units (AU) in the census.",
                    "Here we cover number of AUs listed in Census 2011. There is an increase of 47 districts, 461 sub-districts, 2772 towns and 2342 villages since Census 2001."
                ]}
            />
            <div className="row gis-container">
                <div className="col-md-4">
                    <h4>Distribution of Administrative Units in India in Census 2011</h4>
                    <p>The map here represents the distribution of types of AUs across all states and UTs.</p>
                    <p>Distribution of AUs in the states is not uniform across the country. For example the share of metropolitan towns (MT) is huge whereas in case of Bihar most of the AUs are class 4 cities.</p>
                </div>
                <div className="col-md-8">
                    <Kepler src="http://iuo.dataspace.mobi:3001/census/towns?readOnly=true" width="100%" height="900px" />
                </div>
            </div>
        </div>
    )

}

export default Population;