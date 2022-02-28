import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import './Kepler.scss';

function Kepler(props) {

    const [gisInteractivity, setGisInteractivity] = useState('none')

    return(
        <section 
            width={props.width}
            height={props.height}
            className="Kepler"
        >  
            <div className="button-overlay">
                <a href={props.src.split('?')[0]} target="_blank">GIS PLAYGROUND</a>
            </div>
            <div
                onClick={() => setGisInteractivity('auto')}
            >
                <iframe 
                    src={props.src} 
                    frameBorder="0" 
                    width={props.width}
                    height={props.height}
                    style={{
                        pointerEvents: gisInteractivity
                    }}
                ></iframe> 
            </div>
        </section>
    )
}

export default Kepler;
