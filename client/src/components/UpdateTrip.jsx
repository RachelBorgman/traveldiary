import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";
import DeleteButton from './DeleteButton';
import DoneButton from './DoneButton';
import { Button } from '@mui/material'

const UpdateTrip = (props) => {
    const {removeFromDom, editStyle, buttonStyle} = props;
    const { id } = useParams();
    const [choreN, setChoreN] = useState("");
    const [choreD, setChoreD] = useState("");
    const [choreL, setChoreL] = useState("")
    const [choreR, setChoreR] = useState("")
    const [chorePB, setChorePB] = useState("")
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    const [choreNA, setChoreNA] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/chores/' + id)
            .then(res => {
                console.log("this is the get response:", res)
                setChoreN(res.data.choreName)
                setChoreD(res.data.choreDescription)
                setChoreL(res.data.choreLocation)
                setChoreR(res.data.choreResponsibility)
                setChorePB(res.data.chorePostedBy)
                setLoaded(true);
            })
            .catch((err) => {
                console.log(err.response);
                setChoreNA(`Chore not available with that ID`);
            });
    }, []);

    const updateChore = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/chores/${id}`, {ChoreName: choreN, choreDescription: choreD, choreLocation: choreL, choreResponsibility: choreR, chorePostedBy: chorePB}) 
            .then(res => {
                console.log("this is the put response:", res);
                navigate("/dashboard")
            })
            .catch((err) => {
                console.log(err)
                console.log("this is the err.response.data:", err.response.data.err.errors);
                // const errorResponse = err.response.data.err.errors;
                    // const errorArr = [];
                    //     for (const key of Object.keys(errorResponse)) {
                    //     errorArr.push(errorResponse[key].message)
                    // }
                setErrors(err.response.data.err.errors);
            })
    }


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Edit Chore</li>
                    <li className="breadcrumb-item"><Link to={`/dashboard`}>Dashboard</Link></li>
                    <li className="breadcrumb-item"><Link to={`/chores/add`}>Add Chore</Link></li>
                    <li className="breadcrumb-item"><Link to={`/chores/find`}>Search</Link></li>
                </ol>
            </nav>
            <h3 style={{color:'tomato'}}>Edit Chore: {choreN}</h3>
            {
            loaded && (
                <>
                    <form className='formBox' onSubmit={updateChore}>
                        {choreNA ? 
                            <>
                            <h3>{choreNA}</h3>
                            <Link to="/chores/add">Add Chore</Link>
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
                            <label  className="col-sm-2 col-form-label" htmlFor='choreName'>Chore Name: </label>
                            <input type="text"   className="form-control" name="choreName" value={choreN} onChange={ (e) => setChoreN(e.target.value)}/>
                        </div>
                        <br></br>
                        <div>
                            <label className="col-form-label"  htmlFor='choreDescription'>Chore Description: </label>
                            <input type="text"  className="form-control"  name="choreDescription"  value={choreD} onChange={ (e) => setChoreD(e.target.value)}/>
                        </div>
                        <br></br>
                        <div>
                            <label className="col-form-label"  htmlFor='choreLocation'>Chore Location: </label>
                            <input type="text"  className="form-control"  name="choreLocation" value={choreL} onChange={ (e) => setChoreL(e.target.value)}/>
                        </div>
                        <br></br>
                        <div>
                            <label className="col-form-label"  htmlFor='choreResponsibility'>Chore Responsibility: </label>
                            <select name="choreResponsibility"   className="form-control" value={choreR} onChange={ (e) => setChoreR(e.target.value)}>
                                <option value="rachel">Rachel</option>
                                <option value="court">Court</option>
                                <option value="etta">Etta</option>
                                <option value="dylan">Dylan</option>
                                <option value="alice">Alice</option>
                            </select>
                        </div>
                        <br></br>
                        <Link to='/dashboard' style={editStyle} >Cancel</Link>
                        <Button style={buttonStyle} input type="submit" value="Submit">Update</Button>
                        <DoneButton choreName={choreN} choreID={id} successCallback={()=> removeFromDom(id)}/>
                        <DeleteButton choreName={choreN} choreID={id} successCallback={()=> removeFromDom(id)}/>
                    </form>
                </>
            )}
        </div>
    )
}
export default UpdateTrip;