import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";
import { Button } from '@mui/material'

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
                console.log(res.data)
                console.log("THIS IS res.data._id: ", res.data._id)
                setTripList([...tripList, res.data])
                setTripID(res.data._id)
                navigate("/")
                // navigate("/trips/" + res.data._id)
                })
            .catch((err)=> {
            console.log("this is the err:", err);
            // // console.log("this is the err.message:", err.message);
            // console.log("this is the err.response:", err.response);
            // const errorResponse = err.response.data; // Get the errors from err.response.data
            //         const errorArr = []; // Define a temp error array to push the messages in
            //         for (const key of Object.keys(errorResponse)) {
            //             errorArr.push(errorResponse[key].message)
            //         }
            // setErrors(errorArr); //or errorResponse ??
            // // navigate("/")
            })
        
            
    };

    return(
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={`/`}>Dashboard</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Trip</li>
                        {/* <li className="breadcrumb-item"><Link to={`/chores/find`}>Search</Link></li> */}
                    </ol>
                </nav>
                <div className="headerBox">
                    <h3 className='title'>Add a New Trip</h3>
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
                            {/* {errors.message ? <p>{errors.message}</p> : null} */}
                        </div>
                        <br></br>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Description: </label>
                            <input type="text" className="form-control" name="description" value={description} onChange={ (e) => setDescription(e.target.value)}/>
                            {/* {errors.message ? <p>{errors.message}</p> : null} */}
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Start Date: </label>
                            <input type="date"   className="form-control" name="startDate" value={startDate} onChange={ (e) => setStartDate(e.target.value)}/>
                            {/* {errors.message ? <p>{errors.message}</p> : null} */}
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">End Date: </label>
                            <input type="date"   className="form-control" name="endDate" value={endDate} onChange={ (e) => setEndDate(e.target.value)}/>
                            {/* {errors.message ? <p>{errors.message}</p> : null} */}
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Rating: </label>
                            <input type="number"   className="form-control" name="rating" value={rating} onChange={ (e) => setRating(e.target.value)}/>
                            {/* {errors.message ? <p>{errors.message}</p> : null} */}
                        </div>
                        {/* <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">Photos: </label>
                            <input type="file"   className="form-control" name="photos" value={photos} onChange={ (e) => setPhotos(e.target.value)}/>
                            {/* {errors.message ? <p>{errors.message}</p> : null} */}
                        {/* </div> */} 
                        <br></br>
                            <Link to={`/`} style={editStyle}>Cancel</Link>
                            <Button input type="submit"  style={buttonStyle}>Add</Button>
                    </form>
                </div>
            </div>
    )
};

export default AddTripForm;