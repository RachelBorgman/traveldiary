import React from 'react'
import { Link } from "react-router-dom";
import { Button } from '@mui/material'

const Welcome = (props) => {
    const {buttonStyle, tripList} = props;

    // const latestTripLocation = tripList[tripList.length-1].location
    // console.log(latestTripLocation)
    // console.log("this is the latestTrip.location", latestTripLocation)

    return(
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Home</li>
                    <li className="breadcrumb-item"><Link to={`/travel`}>My Trips</Link></li>
                    <li className="breadcrumb-item"><Link to={`/travel/create`}>Add A Trip</Link></li>
                    {/* <li className="breadcrumb-item"><Link to={`/travel/find`}>Search</Link></li> */}
                </ol>
            </nav>
            <br></br>
            <div>
                <h1>My Travel Diary</h1>
                <div>
                    {/* <h2>Latest Trip:{latestTripLocation}</h2> */}
                </div>
                <Link to={`/travel`}><Button style={buttonStyle}>My Trips</Button></Link>
            </div>
            <br></br>
        </div>
    );
}

export default Welcome