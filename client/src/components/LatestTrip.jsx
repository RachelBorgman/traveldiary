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
                                <Link to={'/travel'} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/travel/create'} className="nav-link">Add A Trip</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/travel/latest'} className="nav-link active" aria-current="page" >Most Recent Trip</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/travel/resources'} className="nav-link">Travel Resources</Link>
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
        </div>
    )
}
export default LatestTrip;