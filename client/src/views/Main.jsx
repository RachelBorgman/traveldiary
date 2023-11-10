import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TripList from '../components/TripList';
import AddTripForm from '../components/AddTrip';
import ViewTrip from '../components/ViewTrip';
import UpdateTrip from '../components/UpdateTrip';
import LatestTrip from '../components/LatestTrip';
import Welcome from '../components/Welcome';
import Test from '../components/Test';


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
        color: 'blue'
    };

    const buttonStyle = {
        backgroundColor: 'teal',
        color: 'white',
        margin: '10px'
    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/travel/all')
            .then(res => {
                setTripList(res.data)
            })
            .catch((err)=>console.log(err))
        }, [])

    const removeFromDom = tripID => {
        axios.delete("http://localhost:8000/api/travel/" + tripID)
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
                <Route element={<Welcome buttonStyle={buttonStyle} tripList={tripList}/>}  path="/" default/>
                <Route element={<TripList buttonStyle={buttonStyle} tripList={tripList} editStyle={editStyle} setTripList={setTripList}  removeFromDom={removeFromDom}/>} path="/travel"/>
                <Route element={<AddTripForm   buttonStyle={buttonStyle} initialLocation="" initialDescription=""  initialStartDate=""  initialEndDate="" initialRating="" linkStyle={linkStyle} editStyle={editStyle} tripList={tripList} setTripList={setTripList} setErrors={setErrors} errors={errors}/>} path="/travel/create" />
                <Route element={<ViewTrip buttonStyle={buttonStyle}/>} path="/travel/:id" />
                <Route element={<UpdateTrip   buttonStyle={buttonStyle} tripList={tripList} linkStyle={linkStyle} editStyle={editStyle} setTripList={setTripList}  removeFromDom={removeFromDom}   initialLocation="" initialDescription=""  initialStartDate=""  initialEndDate="" initialRating=""  />} path="/travel/edit/:id" />
                <Route element={<LatestTrip buttonStyle={buttonStyle} tripList={tripList} editStyle={editStyle} removeFromDom={removeFromDom}/>} path="/travel/latest" />
            </Routes>
        </BrowserRouter>
    </div>
    )
}

export default Main;