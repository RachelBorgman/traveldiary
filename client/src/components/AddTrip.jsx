import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";
import { Button } from '@mui/material'
import StarRating from './StarRating'

const AddTripForm = (props) => {
    const {setTripList, tripList, initialLocation, initialDescription, initialStartDate, initialEndDate, initialRating, initialPhotos, buttonStyle, editStyle} = props;
    const [location, setLocation] = useState(initialLocation);
    const [description, setDescription] = useState(initialDescription);
    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);
    const [rating, setRating] = useState(initialRating);
    const [photos, setPhotos] = useState(initialPhotos);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams(); 
    const [tripID, setTripID] = useState("")

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/travel/create', ({location, description, startDate, endDate, rating, photos}))
            .then(res => {
                console.log("THIS IS RES:", res);
                // console.log(res.data)
                console.log("THIS IS res.data._id: ", res.data._id)
                res.data._id = 'undefined' ? console.log('********INVALID TRIP**********')
                :
                setTripList([...tripList, res.data])
                setTripID(res.data._id)
                navigate("/travel")
                // navigate("/trips/" + res.data._id)
                })
            .catch((err)=> {
            console.log("this is the err:", err);
            //console.log("this is the err.message:", err.message);
            console.log("this is the err.response:", err.response);
            const errorResponse = err.response.data; // Get the errors from err.response.data
                    const errorArr = []; // Define a temp error array to push the messages in
                    for (const key of Object.keys(errorResponse)) {
                        errorArr.push(errorResponse[key].message)
                    }
            setErrors(errorArr); //or errorResponse ??
            // navigate("/")
            })
        
            
    };

    return(
            <div className='addNew'>
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
                                    <Link to={'/travel/create'} className="nav-link active" aria-current="page" >Add A Trip</Link>
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
                    <h3 className='titleAddNew'>Add a New Trip</h3>
                </div>
                <div>
                    <form className='formBox' onSubmit={onSubmitHandler}>
                        <div style={{color:"red"}}>
                            {
                            errors.map((err, index) => (
                                <p key={index}>{err}</p>
                                ))
                            }
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Location: </label>
                            <input type="text"  className="form-control" name="location"  value={location} onChange={ (e) => setLocation(e.target.value)}/>
                            <div className='form-text'>Your location must be at least 3 characters</div>
                            {errors.message ? <p>{errors.message}</p> : null}
                        </div>
                        <br></br>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Description: </label>
                            <input type="text" className="form-control" name="description" value={description} onChange={ (e) => setDescription(e.target.value)}/>
                            <div className='form-text'>Your description must be at least 3 characters</div>
                            {errors.message ? <p>{errors.message}</p> : null}
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Start Date: </label>
                            <input type="date"   className="form-control" name="startDate" value={startDate} onChange={ (e) => setStartDate(e.target.value)}/>
                            {errors.message ? <p>{errors.message}</p> : null}
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">End Date: </label>
                            <input type="date"   className="form-control" name="endDate" value={endDate} onChange={ (e) => setEndDate(e.target.value)}/>
                            {errors.message ? <p>{errors.message}</p> : null}
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Rating: </label>
                            <StarRating rating={rating} onChange={(value) => setRating(value)} />
                            {errors.message ? <p>{errors.message}</p> : null}
                        </div>
                        {/* <div className="row mb-3"> */}
                            {/* <label for="formFile" className="col-sm-2 col-form-label">Photos: </label> */}
                            {/* <input type="file"   className="form-control" name="photos"  id="formFile" value={photos} onChange={ (e) => setPhotos(e.target.value)}/> */}
                            {/* {errors.message ? <p>{errors.message}</p> : null} */}
                        {/* </div>  */}
                        <br></br>
                            <Link to={`/travel`} style={editStyle}>Cancel</Link>
                            <Button input type="submit"  style={buttonStyle}>Add</Button>
                    </form>
                </div>
                <div className='picCredit'>Image by <a href="https://www.freepik.com/free-photo/view-world-travel-map-hand-writing-notebook_28478790.htm#query=travel%20diary&position=26&from_view=keyword&track=ais">Freepik</a></div>
            </div>
    )
};

export default AddTripForm;