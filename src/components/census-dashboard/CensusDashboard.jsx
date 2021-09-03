import React, {useState} from 'react';

import Header from './Header';
import Economy from './Economy';
import Housing from './Housing';
import Tableau from './Tableau';

import './CensusDashboard.scss';
import Demographics from './Demographics';
import Indices from './Indices';
import Population from './Population';
import AdministrativeUnits from './AdministrativeUnits';
import BasicInfra from './BasicInfra';

function CensusDashboard() {
    
    const stateList = [
        "All",
        "Andaman and Nicobar Islands",
        "Andhra Pradesh",
        "Assam",
        "Bihar",
        "Chandigarh",
        "Chhattisgarh",
        "Delhi",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Puducherry",
        "Punjab",
        "Rajasthan",
        "Tamil Nadu",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal"
    ]
    const settlementTypeList = [
        "All",
        "CMC",
        "CT",
        "KatniMCorp.",
        "M",
        "MC",
        "M Cl",
        "MCl",
        "M Corp.",
        "MCorp.",
        "Nagar Parishad",
        "NagarParishad",
        "NPP",
        "NT",
        "PetUA"
    ]

    // useEffect(() => {
    //     fetch('http://13.235.244.95:3000/public/question/0ea4b419-8808-4ab0-b0c0-37cfba7aa634.json')
    //         .then(res => res.json())
    //         .then(console.log)
    // })

    function cityChangeEvent(e) {
        // setCityNameState(e.target.value)
        // setCityState({})
    }
    
    return (
        <>
            <Header cityList={["Gurgaon", "Delhi"]} callback={cityChangeEvent}/>
            <section className="CensusDashboard">

                <AdministrativeUnits stateList={stateList} settlementTypeList={settlementTypeList}/>
                <Population stateList={stateList} settlementTypeList={settlementTypeList}/>
                <Demographics stateList={stateList} settlementTypeList={settlementTypeList}/>
                <Economy stateList={stateList} settlementTypeList={settlementTypeList}/>
                <Housing stateList={stateList} settlementTypeList={settlementTypeList}/>
                <BasicInfra stateList={stateList} settlementTypeList={settlementTypeList}/>
                <Indices stateList={stateList} settlementTypeList={settlementTypeList}/>

                <Tableau/>

                {/* <iframe src="https://public.tableau.com/app/profile/naman1592/viz/CensusCityProfile-3/CityStory?publish=yes" frameBorder="0" width="100%" height="1900px"></iframe> */}
                

                {/* <h2>Population Density Map</h2>    */}
                {/* <iframe src="http://localhost:3001/census/nightlight?readOnly=true" frameborder="0" width="100%" height="900px"></iframe>  */}
                
            </section>
        </>
    )

}

export default CensusDashboard;