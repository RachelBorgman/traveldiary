import React from 'react'
import { Link } from "react-router-dom";
import { Button } from '@mui/material'

const Welcome = (props) => {
    const {buttonStyle, tripList} = props;

    // const latestTripLocation = tripList[tripList.length-1].location
    // console.log(latestTripLocation)
    // console.log("this is the latestTrip.location", latestTripLocation)

    return(
        <div className='welcome'>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid welcomeNav">
                    <a class="navbar-brand" href="/">My Travel Diary</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to={'/travel'} class="nav-link">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={'/travel/create'} class="nav-link">Add A Trip</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={'/travel/resources'} class="nav-link">Travel Resources</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <br></br>
            <div>
                <h1 className='welcomeTitle'>My Travel Diary</h1>
                <div>
                    {/* <h2>Latest Trip:{latestTripLocation}</h2> */}
                </div>
                <Link to={`/travel`}><Button style={buttonStyle}>My Trips</Button></Link>
            </div>
            <br></br>
            <div className='picCredit'><a href="https://www.freepik.com/free-vector/watercolor-adventure-background_25708733.htm#page=2&query=travel%20background&position=23&from_view=keyword&track=ais">Image by pikisuperstar</a> on Freepik</div>
        </div>
    );
}

export default Welcome