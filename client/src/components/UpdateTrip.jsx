import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";
import DeleteButton from './DeleteButton';
import { Button } from '@mui/material'

const UpdateTrip = (props) => {
    const {removeFromDom, editStyle, buttonStyle} = props;
    const { id } = useParams();
    const [tripL, setTripL] = useState("");
    const [tripD, setTripD] = useState("");
    const [tripSD, setTripSD] = useState("")
    const [tripED, setTripED] = useState("")
    const [tripRating, setTripRating] = useState("")
    // const [tripPhotos, setTripPhotos] = useState("")
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    const [tripNA, setTripNA] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/travel/' + id)
            .then(res => {
                console.log("this is the get response:", res.data)
                setTripL(res.data.location)
                setTripD(res.data.description)
                setTripSD(res.data.startDate)
                setTripED(res.data.endDate)
                setTripRating(res.data.rating)
                // setTripPhotos(res.data.oneSingleTravel.photos)
                setLoaded(true);
            })
            .catch((err) => {
                console.log("this is err.response", err.response);
                setTripNA(`Trip not available with that ID`);
            });
    }, []);

    const updateTrip = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/travel/${id}`, {location: tripL, description: tripD, startDate: tripSD, endDate: tripED, rating: tripRating}) 
            .then(res => {
                console.log("this is the put response:", res);
                navigate("/travel")
            })
            .catch((err) => {
                console.log(err)
                console.log("this is the err.response.data:", err.response.data);
                // const errorResponse = err.response.data.err.errors;
                    // const errorArr = [];
                    //     for (const key of Object.keys(errorResponse)) {
                    //     errorArr.push(errorResponse[key].message)
                    // }
                setErrors(err.response.data);
            })
    }


    return (
        <div className='updateBG'>
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
            <h3>Editing: </h3>
            <h2>{tripL}</h2>
            {
            loaded && (
                <>
                    <form className='formBox' onSubmit={updateTrip}>
                        {tripNA ? 
                            <>
                            <h3>{tripNA}</h3>
                            <Link to="/travels/create">Add Trip</Link>
                            </>
                        : null }
                        <div style={{color:"red"}}>
                        {
                        Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key].message}</p>
                            ))
                        }
                    </div>
                        <div>
                            <label  className="col-sm-2 col-form-label" htmlFor='location'>Location: </label>
                            <input type="text"   className="form-control" name="location" value={tripL} onChange={ (e) => setTripL(e.target.value)}/>
                        </div>
                        <br></br>
                        <div>
                            <label  className="col-sm-2 col-form-label" htmlFor='description'>Description: </label>
                            <input type="text"   className="form-control" name="description" value={tripD} onChange={ (e) => setTripD(e.target.value)}/>
                        </div>
                        <br></br>
                        <div>
                            <label  className="col-sm-2 col-form-label" htmlFor='startDate'>Start Date: </label>
                            <input type="text"   className="form-control" name="startDate" value={new Date(tripSD).toLocaleDateString('en-us', {year: 'numeric', month: 'short', day: 'numeric'})} onChange={ (e) => setTripSD(e.target.value)}/>
                        </div>
                        <br></br>
                        <div>
                            <label  className="col-sm-2 col-form-label" htmlFor='endDate'>End Date: </label>
                            <input type="text"   className="form-control" name="endDate" value={new Date(tripED).toLocaleDateString('en-us', {year: 'numeric', month: 'short', day: 'numeric'})} onChange={ (e) => setTripED(e.target.value)}/>
                        </div>
                        <br></br>
                        <div>
                            <label  className="col-sm-2 col-form-label" htmlFor='rating'>Rating: </label>
                            <input type="text"   className="form-control" name="rating" value={tripRating} onChange={ (e) => setTripRating(e.target.value)}/>
                        </div>
                        {/* <div>
                            <label  className="col-sm-2 col-form-label" htmlFor='photos'>Photos: </label>
                            <input type="text"   className="form-control" name="photos" value={tripPhotos} onChange={ (e) => setTripPhotos(e.target.value)}/>
                        </div> */}
                        <Link to='/travel' style={editStyle} >Cancel</Link>
                        <Button style={buttonStyle} input type="submit" value="Submit">Update</Button>
                        <DeleteButton location={tripL} tripID={id} successCallback={()=> removeFromDom(id)}/>
                    </form>
                </>
            )}
            <div>Image by <a href="https://www.freepik.com/free-photo/traveler-hiking-mountains-while-having-his-essentials-backpack_18895767.htm#query=travel&position=29&from_view=search&track=sph">Freepik</a></div>
        </div>
    )
}
export default UpdateTrip;