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
        <div className='tripListBG'>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">My Travel Diary</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to={'/travel'} class="nav-link active" aria-current="page" >Home</Link>
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
            <div className="headerBox">
            <h2 className='dashTitle'> MY TRAVEL DIARY</h2>
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