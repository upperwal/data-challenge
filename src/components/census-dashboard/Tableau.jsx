import React, {useRef, useEffect} from 'react';
import tableau from 'tableau-api';

function Tableau(props) {

    const vizRef = useRef()

    useEffect(() => {
        initViz()
    })

    function initViz() {
        const vizUrl = 'https://public.tableau.com/views/CensusCityProfile-3/CityStory?:language=en-GB&publish=yes&:display_count=n&:origin=viz_share_link';
        let viz = new window.tableau.Viz(vizRef.current, vizUrl)
    }
    
    return (
        <div ref={vizRef} width="100%">

        </div>
    )

}

export default Tableau;