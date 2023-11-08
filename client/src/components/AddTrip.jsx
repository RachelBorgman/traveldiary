import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";
import { Button } from '@mui/material'

const AddTripForm = (props) => {
    const {setTripList, tripList, initialTripLocation, initialTripDescription, initialChoreLocation, initialChorePostedBy, initialChoreResponsibility, buttonStyle, editStyle} = props;
    const [tripLocation, setTripLocation] = useState(initialTripLocation);
    const [tripDescription, setTripDescription] = useState(initialTripDescription);
    const [choreLocation, setChoreLocation] = useState(initialChoreLocation);
    const [chorePostedBy, setChorePostedBy] = useState(initialChorePostedBy);
    const [choreResponsibility, setChoreResponsibility] = useState(initialChoreResponsibility);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams(); 
    const [tripID, setTripID] = useState("")

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/trips', ({tripLocation, tripDescription, choreLocation, chorePostedBy, choreResponsibility}))
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
            // console.log("this is the err.message:", err.message);
            console.log("this is the err.response.data:", err.response.data); // error.response.data
            const errorResponse = err.response.data.err.errors; // Get the errors from err.response.data
                    const errorArr = []; // Define a temp error array to push the messages in
                    for (const key of Object.keys(errorResponse)) {
                        errorArr.push(errorResponse[key].message)
                    }
            setErrors(errorArr); //or errorResponse ??
            // navigate("/")
            })
        
            
    };

    return(
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={`/dashboard`}>Dashboard</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Chore</li>
                    <li className="breadcrumb-item"><Link to={`/chores/find`}>Search</Link></li>
                </ol>
            </nav>
            <div className="headerBox">
                <h3 className='title'>Add a New Chore</h3>
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
                        <label className="col-sm-2 col-form-label">Name: </label>
                        <input type="text"  className="form-control" name="choreName"  value={choreName} onChange={ (e) => setChoreName(e.target.value)}/>
                        {errors.message ? <p>{errors.message}</p> : null}
                    </div>
                    <br></br>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Description: </label>
                        <input type="text" className="form-control" name="choreDescription" value={choreDescription} onChange={ (e) => setChoreDescription(e.target.value)}/>
                        {errors.message ? <p>{errors.message}</p> : null}
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Location: </label>
                        <input type="text"   className="form-control" name="choreLocation" value={choreLocation} onChange={ (e) => setChoreLocation(e.target.value)}/>
                        {errors.message ? <p>{errors.message}</p> : null}
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Posted By: </label>
                        <select name="chorePostedBy"   className="form-control" value={chorePostedBy} onChange={ (e) => setChorePostedBy(e.target.value)}>
                            <option></option>
                            <option value="rachel">Rachel</option>
                            <option value="court">Court</option>
                        </select>
                        {errors.message ? <p>{errors.message}</p> : null}
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Who is Responsible? </label>
                        <select name="choreResponsibility"   className="form-control" value={choreResponsibility} onChange={ (e) => setChoreResponsibility(e.target.value)}>
                            <option></option>
                            <option value="rachel">Rachel</option>
                            <option value="court">Court</option>
                            <option value="etta">Etta</option>
                            <option value="dylan">Dylan</option>
                            <option value="alice">Alice</option>
                        </select>
                        {errors.message ? <p>{errors.message}</p> : null}
                    </div>
                    <br></br>
                        <Link to={`/dashboard`} style={editStyle}>Cancel</Link>
                        <Button input type="submit"  style={buttonStyle}>Add</Button>
                </form>
            </div>
        </div>
    )
};

export default AddTripForm;