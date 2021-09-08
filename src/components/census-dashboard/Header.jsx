import React from 'react'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import MoHUALogo from './img/mohua.svg';

import './Header.scss';

function Header(props) {
    function populateCities() {
        let res = []
        props.cityList.forEach((v, idx) => {
            res.push(
                <option key={idx} value={v}>{v}</option>
            )
        })
        return res
    }
    return(
        <>
        <header className="header-nav">
            
            <h2>Urban Data <span className="text-red">Storyboard</span></h2>
            <img src={MoHUALogo} alt="" />
        </header>
        <header className="Header">
            
            <div className="container">
                {/* <ul className="nav">
                    <li><a href="">HOME</a></li>
                    <li><a href="">GIS PLAYGROUND</a></li>
                </ul> */}
                <div className="row">
                    <div className="col-md-4 right-aligned">
                        <h1><span className="mark">SENSING THE PULSE OF URBAN INDIA</span></h1>
                        {/* <p className="learn-more">To learn more, select your city from the dropdown</p>
                        <FormControl variant="outlined" className="header-box" margin='dense'>
                            <InputLabel htmlFor="outlined-age-native-simple">City</InputLabel>
                            <Select
                                native
                                onChange={(e) => props.callback(e)}
                                label="City"
                                inputProps={{
                                    name: 'city',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                            {populateCities()}
                            </Select>
                        </FormControl> */}
                    </div>
                    <div className="col-md-8 left-aligned">
                        <h4><span className="mark-light">Sensing the Pulse of Urban India is a story of opportunities.</span></h4>
                        <h4><span className="mark-light">First, the opportunities of inclusive and sustainable growth that lie within Indian cities &amp; towns. Second, the new opportunities of understanding &amp; visualising these cities &amp; towns that get unlocked once the census data get geospatial dimension.</span></h4>
                        <h4><span className="mark-light">The storyboard utilises data from the 15th Indian Census conducted in 2011 to highlight the differences and similarities in demographics, economy, housing, and basic infrastructure existing among urban settlements.</span></h4>
                        <h4><span className="mark-light">Let's begin by looking at what is 'urban' in India</span></h4>
                    </div>
                </div>
            </div>
            
            
        </header>
        </>
    )
}

export default Header;
