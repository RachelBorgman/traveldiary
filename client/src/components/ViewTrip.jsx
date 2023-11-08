import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams, useNavigate, Link} from "react-router-dom";
import { Button } from '@mui/material'

const ViewTrip = (props) => {

    const {id} = useParams(); 
    const {buttonStyle} = props;
    const navigate = useNavigate();
    const [oneTrip, setOneTrip] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/trips/${id}`)
            .then( res => {
                console.log(res.data);
                setOneTrip(res.data);
                navigate(`/trips/${id}`)
            })
            .catch( err => console.log(err) );
    }, []);

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">View Trip</li>
                    <li className="breadcrumb-item"><Link to={`/dashboard`}>Dashboard</Link></li>
                    <li className="breadcrumb-item"><Link to={`/trips/add`}>Add A New Trip</Link></li>
                    {/* <li className="breadcrumb-item"><Link to={`/trips/find`}>Search</Link></li> */}
                </ol>
            </nav>
            <div className='formBox'>
                <h2 className='tripTitle'>{oneTrip.tripLocation}</h2>
                <div className='viewLabel'>
                    <h3 className='viewTitle'>Trip Location:</h3>
                    <p className='choreInfo'>{oneTrip.choreName}</p>
                </div>
                <div className='viewLabel'>
                    <h3 className='viewTitle'>Chore Description:</h3>
                    <p className='choreInfo'>{oneTrip.choreDescription}</p>
                </div>
                <div className='viewLabel'>
                    <h3 className='viewTitle'>Chore Location: </h3>
                    <p className='choreInfo'>{oneTrip.choreLocation}</p>
                </div>
                <div className='viewLabel'>
                    <h3 className='viewTitle'>Posted By: </h3>
                    <p className='choreInfo'>{oneTrip.chorePostedBy}</p>
                </div>
                <div className='viewLabel'>
                    <h3 className='viewTitle'>Chore Responsibility: </h3>
                    <p className='choreInfo'>{oneTrip.choreResponsibility}</p>
                </div>
                <Link to={`/trips/edit/${oneTrip._id}`}><Button style={buttonStyle}>Edit Trip Details</Button></Link>
            </div>
        </div>
    );
}
export default ViewTrip;