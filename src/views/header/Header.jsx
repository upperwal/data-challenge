import React from 'react'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import './Header.scss'

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
        <header className="container Header">
            <div className="row">
                <div className="col-md-5 right-aligned">
                    <h1>Pravega - The Sectoral Dashboard for Urban Mobility in India</h1>
                    <p className="learn-more">To learn more, select your city from the dropdown</p>
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
                    </FormControl>
                </div>
                <div className="col-md-7 left-aligned">
                    <h4>The Urban Mobility sectoral dashboard covers over 25 different indicators from across 10 sectors to present a holistic picture of mobility in 117 cities across India. Apart from providing an overview of the key mobility indicators, the dashboard also brings together cross-sectoral insights linking mobility to public health, equity, safety and overall quality of life in your city. Further, based on these insights, the dashboard suggests certain essential policy recommendations from the Government of India.</h4>
                    
                </div>
            </div>
            
        </header>
    )
}

export default Header;
