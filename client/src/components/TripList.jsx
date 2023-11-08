import React, {useEffect} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import DeleteButton from './DeleteButton';
import { Button } from '@mui/material'

const TripListAll = (props) => {
    const {setTripList, TripList, removeFromDom, editStyle, buttonStyle} = props;
    
    useEffect(()=>{
        axios.get("http://localhost:8000/api/trips")
            .then((res)=>{
                console.log("THIS IS RES.DATA", res.data);
                let tripsSorted = res.data;
                tripsSorted = tripsSorted.sort((a,b) => a.tripLocation.localeCompare(b.tripLocation))
                console.log("this is tripsSorted:", tripsSorted)
                setTripList(tripsSorted);
                })
        .catch((err)=>{
            console.log(err.res);
        })
    }, [])

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                    <li className="breadcrumb-item"><Link to={`/trips/add`}>Add Trip</Link></li>
                    {/* <li className="breadcrumb-item"><Link to={`/trips/find`}>Search</Link></li> */}
                </ol>
            </nav>
            <div className="headerBox">
            <h2 className='dashTitle'> TRIPS</h2>
            <br></br>
                <Link to={`/trips/add`}><Button style={buttonStyle}>Add a New Trip</Button></Link>
                {/* <Link to={`/trips/find`}><Button style={buttonStyle}>Search Trips</Button></Link> */}
                <br></br>
                    <div className="table">
                        <table className='table table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th scope='col'>Trip Location</th>
                                    <th scope='col'>Trip Description</th>
                                    <th scope='col'>Location</th>
                                    <th scope='col'>Posted By:</th>
                                    <th scope='col'>Who is Responsible?</th>
                                    <th scope='col'>Actions Available</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                tripList && tripList.map((trip)=>{
                                return(
                                    <tr key={trip._id}>
                                        <td>{trip.tripLocation}</td>
                                        <td>{trip.tripDescription}</td>
                                        <td>{trip.tripStartDate}</td>
                                        <td className='responsibility'>{chore.chorePostedBy}</td> 
                                        <td className='responsibility'><Link to={`/chores/${chore.choreResponsibility}`} style={editStyle} >{chore.choreResponsibility}</Link> </td> 
                                        <td>
                                            <Link to={`/chores/${chore._id}`} style={editStyle} >View</Link>
                                            <Link to={`/chores/edit/${chore._id}`} style={editStyle} >Edit</Link>
                                            <DeleteButton style={buttonStyle} tripLocation={trip.tripLocation} tripID={trip._id} successCallback={()=> removeFromDom(trip._id)}/>
                                        </td>
                                    </tr>
                                )})
                            }
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
    )
}
export default TripListAll;