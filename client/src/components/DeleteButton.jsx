import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const DeleteButton = (props) => {
    const { tripLocation, tripID, successCallback } = props;
    // console.log("this is the tripLocation: ", tripLocation)
    function showAlert(tripLocation){
        alert(`Are you sure you want to delete ${tripLocation}`)
    }
    const navigate = useNavigate();
    const deleteTrip = e => {
        showAlert(tripLocation)
        //add in option to cancel?
        // if (confirm('Are you sure you want to delete this thing into the database?')) {
            // Delete it!
        //     console.log('Thing was deleted from the database.');
        //   } else {
            // Do nothing!
        //     console.log('Thing was not deleted from the database.');
        //   }
        axios.delete('http://localhost:8000/api/trips/' + tripID)
            .then(res=>{
                successCallback();
                navigate("/dashboard");
            })
    }
    return (
        <button onClick={deleteTrip}>
            Delete
        </button>
    )
}
export default DeleteButton;