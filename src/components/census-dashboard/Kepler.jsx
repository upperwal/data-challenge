import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import './Kepler.scss';

function Kepler(props) {

    return(
        <section 
            width={props.width}
            height={props.height}
            className="Kepler"
        >  
            <div className="button-overlay">
                <a href={props.src.split('?')[0]} target="_blank">GIS PLAYGROUND</a>
            </div>
            <iframe 
                src={props.src} 
                frameBorder="0" 
                width={props.width}
                height={props.height}
            ></iframe> 
        </section>
    )
}

export default Kepler;
