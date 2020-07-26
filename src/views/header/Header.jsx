import React from 'react'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import './Header.scss'

function Header(props) {
    return(
        <header className="container Header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                
                    {/* <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <div className="dropdown">
                                <div className="dropdown-button">
                                    <Link to="#">Learn</Link>
                                </div>
                                <div className="dropdown-content">
                                    <Link to="/sd">What is Social Distancing?</Link>
                                    <Link to="/sq">How one should practice Self Quarantine</Link>
                                    <a href="https://www.mohfw.gov.in/pdf/Mask-Eng.pdf" target="_blank" rel="noopener noreferrer">When to wear a mask?</a>
                                    <a href="https://www.mohfw.gov.in/pdf/FINAL_14_03_2020_ENg.pdf" target="_blank" rel="noopener noreferrer">When to get tested for covid-19?</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="dropdown">
                                <div className="dropdown-button">
                                    <Link to="#">Get Help</Link>
                                </div>
                                <div className="dropdown-content">
                                    <Link to="">WHO</Link>
                                    <Link to="">Ministry of Health</Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="dropdown">
                                <div className="dropdown-button">
                                    <Link to="/us">Contribute</Link>
                                </div>
                                <div className="dropdown-content">
                                    <Link to="/us">Get involved with us</Link>
                                    <Link to="/funds">Active Funds</Link>
                                    <Link to="/volunteer">Volunteer</Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to="/stories">Citizen Stories</Link>
                        </li>
                        <li>
                            <Link to="/simulation">Simulation</Link>
                        </li>
                        
                        
                        
                        
                    </ul> */}
                        {/* Language:
                        <select onChange={(e) => this.changeLanguage(e, this.props.i18n)} defaultValue={this.props.i18n.language}>
                            <option value="en">English</option>
                            <option value="in_urd">اردو</option>
                            <option value="in_hi">हिंदी</option>
                            <option value="in_knn">ಕೆನಡಾ</option>
                            <option value="in_tam">தமிழ்</option>
                            <option value="in_od">ଓଡ଼ିଆ</option>
                            <option value="in_punjabi">ਪੰਜਾਬੀ</option>
                        </select> */}
                        <FormControl variant="outlined" className="header-box" margin='dense'>
                            <InputLabel htmlFor="outlined-age-native-simple">City</InputLabel>
                            <Select
                                native
                                /* onChange={(e) => this.changeLanguage(e, this.props.i18n)} */
                                label="City"
                                inputProps={{
                                    name: 'city',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                            <option value="en">Delhi</option>
                            </Select>
                        </FormControl>

                    {/* <div>
                        <TextField
                            label="District"
                            id="outlined-size-small"
                            defaultValue=""
                            variant="outlined"
                            size="small"
                            className="header-text header-box"
                        />
                    </div> */}


                </div>
            </nav>
            
        </header>
    )
}

export default Header;
