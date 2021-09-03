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
                        <h4><span className="mark-light">This storyboard focuses on the data collected during the 15th Indian Census conducted in 2011 across various key performance indicators such as demographics, housing, and economy and gives them a visual representation across geospatial and non-geospatial dimensions.</span></h4>
                        <h4><span className="mark-light">This story not only changes the perception of how we analyse trends and patterns for future development of our cities, it also enables us to translate this data to the citizens in a more perceivable manner for better participatory decision making.</span></h4>
                    </div>
                </div>
            </div>
            
            
        </header>
        </>
    )
}

export default Header;
