import React from 'react';
import { Link } from "react-router-dom";

const Resources = (props) => {
    return(
        <div className='resourcesBG'>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
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
                                <Link to={'/travel/resources'} class="nav-link active" aria-current="page" >Travel Resources</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <h1 className='resourceTitle'>Travel Resources</h1>
            <div className='resource card'>
                <h3>Travel Gear</h3>
                <a href='https://www.nytimes.com/wirecutter/reviews/travel-guide/'>NY Times</a>
            </div>
            <div className='resource card'>
                <h3>Where to Go, When</h3>
                <a href='https://www.wendyperrin.com/when-to-go-where/'>WendyPerrin</a>
            </div>
            <div className='resource card'>
                <h3>Rate Trip Online</h3>
                <a href='https://www.tripadvisor.com/'>TripAdvisor</a>
            </div>
            <div className='resource card'>
                <h3>Book Your Next Trip</h3>
                <a href='https://www.travelocity.com/'>Travelocity</a>
            </div>
            <div className='creditBottom'>
                <div><a href="https://www.freepik.com/free-photo/transport-fly-clouds-jet-flying_1103165.htm#page=2&query=travel&position=4&from_view=search&track=sph">Image by jannoon028</a> on Freepik</div>
            </div>
        </div>
    );
}

export default Resources