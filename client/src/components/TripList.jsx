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
                // tripsSorted = tripsSorted.sort((a,b) => a.location.localeCompare(b.location))
                tripsSorted = tripsSorted.sort((a,b) => {
                    return new Date(a.startDate).getTime() - 
                        new Date(b.startDate).getTime()
                }).reverse();
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
                    <li className="breadcrumb-item"><Link to={`/travel/create`}>Add A Trip</Link></li>
                    {/* <li className="breadcrumb-item"><Link to={`/trips/find`}>Search</Link></li> */}
                </ol>
            </nav>
            <div className="headerBox">
            <h2 className='dashTitle'> MY TRAVEL DIARY</h2>
            <br></br>
                <Link to={`/travel/create`}><Button style={buttonStyle}>Add a New Trip</Button></Link>
                <Link to={`/travel/latest`}><Button style={buttonStyle}>Most Recent Trip</Button></Link>
                <br></br>
                    <div className="trips">
                        <div className='tripBoxAll'>
                            {
                                tripList && tripList.map((trip)=>{
                                return(
                                    <div key={trip._id}>
                                        <div className='tripBox'>
                                            <div className='columnOne'>
                                                <h2>{trip.location}</h2>
                                                <h4>Rating: {trip.rating}/5</h4>
                                            </div>
                                            <div className='columnTwo'>
                                                <h5>{new Date(trip.startDate).toLocaleDateString('en-us', {year: 'numeric', month: 'short', day: 'numeric'})} - {new Date(trip.endDate).toLocaleDateString('en-us', {year: 'numeric', month: 'short', day: 'numeric'})}</h5>
                                                <p>Highlights: {trip.description}</p>
                                            </div>
                                            {/* <td>{trip.photos}</td>  */}
                                            <div className='columnThree'>
                                                <Link to={`/travel/${trip._id}`} style={editStyle} >View</Link>
                                                <Link to={`/travel/edit/${trip._id}`} style={editStyle} >Edit</Link>
                                                <DeleteButton style={buttonStyle} location={trip.location} tripID={trip._id} successCallback={()=> removeFromDom(trip._id)}/>
                                                
                                            </div>
                                        </div>
                                    </div>
                                )})
                            }
                        </div>
                    </div>
            </div>
        </div>
    )
}
export default TripListAll;