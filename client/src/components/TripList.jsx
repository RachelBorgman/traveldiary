import React, {useEffect} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import DeleteButton from './DeleteButton';
import { Button } from '@mui/material'
import StarRating from './StarRating';

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
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">My Travel Diary</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={'/travel'} className="nav-link active" aria-current="page" >Home</Link>
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
                                                <h4>Rating: <StarRating rating={trip.rating} /> </h4>
                                            </div>
                                            <div className='columnTwo'>
                                                <h5>{new Date(trip.startDate).toLocaleDateString('en-us', {year: 'numeric', month: 'short', day: 'numeric'})} - {new Date(trip.endDate).toLocaleDateString('en-us', {year: 'numeric', month: 'short', day: 'numeric'})}</h5>
                                                <p>Highlights: {trip.description}</p>
                                            </div>
                                            <div>{trip.photos}</div> 
                                            <div className="stockPhoto"></div>
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