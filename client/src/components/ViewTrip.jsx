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
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">My Travel Diary</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to={'/travel'} className="nav-link" >Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/travel/create'} className="nav-link">Add A Trip</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/travel/latest'} className="nav-link">Most Recent Trip</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/travel/resources'} className="nav-link">Travel Resources</Link>
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