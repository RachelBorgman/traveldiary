import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function Main() {

    const [tripList, setTripList] = useState([]);
    const [errors, setErrors] = useState({})

    const linkStyle = {
        margin: "1rem",
        fontSize: '1.5em',
        textDecoration: 'underline',
        color: 'teal',
    };

    const editStyle = {
        margin:'1rem',
        color: 'teal'
    };

    const buttonStyle = {
        backgroundColor: 'teal',
        color: 'white',
        margin: '10px'
    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/trips') //assuming this is the route
            .then(res => {
                setTripList(res.data)
            })
            .catch((err)=>console.log(err))
        }, [])

    const removeFromDom = tripID => {
        axios.delete("http://localhost:8000/api/trips/" + tripID) //assuming this is the route
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            const newTripList = tripList.filter((trip) => trip._id !== tripID)
            setTripList(newTripList);
        })
        .catch((err)=>console.log(err))
    }

    return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route element={<TripList buttonStyle={buttonStyle} tripList={tripList} editStyle={editStyle} setTripList={setTripList}  removeFromDom={removeFromDom}/>} path="/" default />
                <Route element={<AddTripForm   buttonStyle={buttonStyle} initialTripLocation="" initialTripDescription=""  initialTripStartDate=""  initialTripEndDate="" initialTripRating="" initialTripPhotos="" linkStyle={linkStyle} editStyle={editStyle} tripList={tripList} setTripList={setTripList} setErrors={setErrors} errors={errors}/>} path="/trips/add" />
                <Route element={<ViewTrip buttonStyle={buttonStyle}/>} path="/trips/:id" />
                <Route element={<UpdateTrip   buttonStyle={buttonStyle} tripList={tripList} linkStyle={linkStyle} editStyle={editStyle} setTripList={setTripList}  removeFromDom={removeFromDom}  initialTripLocation="" initialTripDescription=""  initialTripStartDate=""  initialTripEndDate="" initialTripRating="" initialTripPhotos="" />} path="/trips/edit/:id" />
            </Routes>
        </BrowserRouter>
    </div>
    )
}

export default Main;