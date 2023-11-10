import React from 'react';
import { Link } from "react-router-dom";

const Resources = (props) => {
    return(
        <div className='resourcesBG'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">My Travel Diary</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={'/travel'} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/travel/create'} className="nav-link">Add A Trip</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/travel/resources'} className="nav-link active" aria-current="page" >Travel Resources</Link>
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