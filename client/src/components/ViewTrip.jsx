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
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">View Trip</li>
                    <li className="breadcrumb-item"><Link to={`/`}>Dashboard</Link></li>
                    <li className="breadcrumb-item"><Link to={`/travel/create`}>Add A New Trip</Link></li>
                    {/* <li className="breadcrumb-item"><Link to={`/trips/find`}>Search</Link></li> */}
                </ol>
            </nav>
            <div className='viewBox'>
                <h2>{oneSingleTravel.location}</h2>
                <div className='viewLabel'>
                    <h3>Trip Location:</h3>
                    <p>{oneSingleTravel.location}</p>
                </div>
                <h2>{oneSingleTravel.description}</h2>
                <div className='viewLabel'>
                    <h3>Trip Description:</h3>
                    <p>{oneSingleTravel.description}</p>
                </div>
                <h2>{oneSingleTravel.startDate}</h2>
                <div className='viewLabel'>
                    <h3>Trip Start Date:</h3>
                    <p>{oneSingleTravel.startDate}</p>
                </div>
                <h2>{oneSingleTravel.endDate}</h2>
                <div className='viewLabel'>
                    <h3>Trip End Date:</h3>
                    <p>{oneSingleTravel.endDate}</p>
                </div>
                <h2>{oneSingleTravel.rating}</h2>
                <div className='viewLabel'>
                    <h3>Trip Rating:</h3>
                    <p>{oneSingleTravel.rating}</p>
                </div>
                {/* <h2>{oneSingleTravel.photos}</h2> */}
                {/* <div className='viewLabel'>
                    <h3>Trip Photos:</h3>
                    <p>{oneSingleTravel.photos}</p>
                </div> */}
                <Link to={`/travel/edit/${oneSingleTravel._id}`}><Button style={buttonStyle}>Edit Trip Details</Button></Link>
            </div>
        </div>
    );
}
export default ViewTrip;