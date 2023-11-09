import React, {useEffect} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import DeleteButton from './DeleteButton';
import { Button } from '@mui/material'

const TripListAll = (props) => {
    const {setTripList, tripList, removeFromDom, editStyle, buttonStyle} = props;
    
    useEffect(()=>{
        axios.get("http://localhost:8000/api/travel/all")
            .then((res)=>{
                console.log("THIS IS RES.DATA", res.data);
                let tripsSorted = res.data;
                tripsSorted = tripsSorted.sort((a,b) => a.location.localeCompare(b.location))
                console.log("this is tripsSorted:", tripsSorted)
                setTripList(tripsSorted);
                })
        .catch((err)=>{
            console.log(err.res);
        })
    }, [])

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                    <li className="breadcrumb-item"><Link to={`/travel/create`}>Add Trip</Link></li>
                    {/* <li className="breadcrumb-item"><Link to={`/trips/find`}>Search</Link></li> */}
                </ol>
            </nav>
            <div className="headerBox">
            <h2 className='dashTitle'> TRIPS</h2>
            <br></br>
                <Link to={`/travel/create`}><Button style={buttonStyle}>Add a New Trip</Button></Link>
                {/* <Link to={`/trips/find`}><Button style={buttonStyle}>Search Trips</Button></Link> */}
                <br></br>
                    <div className="table">
                        <table className='table table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th scope='col'>Trip Location</th>
                                    <th scope='col'>Trip Description</th>
                                    <th scope='col'>Start Date:</th>
                                    <th scope='col'>End Date:</th>
                                    <th scope='col'>Rating</th>
                                    {/* <th scope='col'>Photos</th> */}
                                    <th scope='col'>Actions Available</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                tripList && tripList.map((trip)=>{
                                return(
                                    <tr key={trip._id}>
                                        <td>{trip.location}</td>
                                        <td>{trip.description}</td>
                                        <td>{trip.startDate}</td>
                                        <td>{trip.endDate}</td>
                                        <td>{trip.rating}</td> 
                                        {/* <td>{trip.photos}</td>  */}
                                        <td>
                                            <Link to={`/travel/${trip._id}`} style={editStyle} >View</Link>
                                            <Link to={`/travel/edit/${trip._id}`} style={editStyle} >Edit</Link>
                                            <DeleteButton style={buttonStyle} location={trip.location} tripID={trip._id} successCallback={()=> removeFromDom(trip._id)}/>
                                        </td>
                                    </tr>
                                )})
                            }
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
    )
}
export default TripListAll;