import React, {useEffect} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import DeleteButton from './DeleteButton';

const LatestTrip = (props) => {
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
                                <Link to={'/travel/latest'} class="nav-link active" aria-current="page" >Most Recent Trip</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={'/travel/resources'} class="nav-link">Travel Resources</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <h1>My Most Recent Trip</h1>
            <div className='tripBox'>
                <div className='columnOne'>
                    <h2>{tripList[0].location}</h2>
                    <h4>Rating: {tripList[0].rating}/5</h4>
                </div>
                <div className='columnTwo'>
                    <h5>{new Date(tripList[0].startDate).toLocaleDateString('en-us', {year: 'numeric', month: 'short', day: 'numeric'})} - {new Date(tripList[0].endDate).toLocaleDateString('en-us', {year: 'numeric', month: 'short', day: 'numeric'})}</h5>
                    <p>{tripList[0].description}</p>
                </div>
                {/* <td>{trip.photos}</td>  */}
                <div className='columnThree'>
                    <Link to={`/travel/${tripList[0]._id}`} style={editStyle} >View</Link>
                    <Link to={`/travel/edit/${tripList[0]._id}`} style={editStyle} >Edit</Link>
                    <DeleteButton style={buttonStyle} location={tripList[0].location} tripID={tripList[0]._id} successCallback={()=> removeFromDom(tripList[0]._id)}/>
                    
                </div>
            </div>
            <div>
                <h3>Travel Essentials:</h3>
                <p>Travel Backpack</p>
                <p>Passport</p>
                <p>Headphones</p>
            </div>
        </div>
    )
}
export default LatestTrip;