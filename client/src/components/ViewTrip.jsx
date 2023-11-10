import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, useNavigate, Link} from "react-router-dom";
import { Button } from '@mui/material'

const ViewTrip = (props) => {

    const {id} = useParams(); 
    const {buttonStyle} = props;
    const navigate = useNavigate();
    const [oneSingleTravel, setOneSingleTravel] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/travel/${id}`)
            .then( res => {
                console.log("here is res.data:", res.data);
                setOneSingleTravel(res.data);
                navigate(`/travel/${id}`)
            })
            .catch( err => console.log(err) );
    }, []);

    return (
        <div className='viewOne'>
            <div className='viewOneBG'>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">My Travel Diary</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link to={'/travel'} class="nav-link" >Home</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to={'/travel/create'} class="nav-link">Add A Trip</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to={'/travel/latest'} class="nav-link">Most Recent Trip</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to={'/travel/resources'} class="nav-link">Travel Resources</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='card viewBox'>
                    <h1 className='viewOneTitle'>{oneSingleTravel.location}</h1>
                    {/* <img src="..." class="card-img-top" alt="..."></img> */}
                    <div>
                    <h3>{new Date(oneSingleTravel.startDate).toLocaleDateString('en-us', {year: 'numeric', month: 'short', day: 'numeric'})} - {new Date(oneSingleTravel.endDate).toLocaleDateString('en-us', {year: 'numeric', month: 'short', day: 'numeric'})}</h3>
                        <div className='card-body viewLabel'>
                            <h3>Trip Description:</h3>
                            <p>{oneSingleTravel.description}</p>
                        </div>
                        <h2>{oneSingleTravel.rating}</h2>
                        <div className='viewLabel'>
                            <h3>Trip Rating</h3>
                            {/* <p>{oneSingleTravel.rating}</p> */}
                        </div>
                    </div>
                    {/* <h2>{oneSingleTravel.photos}</h2> */}
                    {/* <div className='viewLabel'>
                        <h3>Trip Photos:</h3>
                        <p>{oneSingleTravel.photos}</p>
                    </div> */}
                    <Link to={`/travel/edit/${oneSingleTravel._id}`}><Button style={buttonStyle}>Edit Trip Details</Button></Link>
                </div>
            </div>
        </div>
    );
}
export default ViewTrip;