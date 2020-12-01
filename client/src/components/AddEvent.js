import React, {useState, useEffect} from 'react'
import axios from 'axios'

function AddEvent(){


    const [event,setEvent] = useState({})
    const handleChange=(e)=>{
        setEvent({
            ...event,
            [e.target.name]:e.target.value
        })
    }
    const handleOnClick= async()=>{
        await axios.post("http://localhost:8080/add-event",event)
    }
     


    return(
        <div>
            <h1>Add Event</h1>
            <input type="text" placeholder="Event name" name="name" onChange={handleChange}></input>
            <input type="text" placeholder="Image" name="image" onChange={handleChange}></input>
            <input type="text" placeholder="Date...YYYY/MM/DD" name="date" onChange={handleChange}></input>
            <input type="text" placeholder="Time" name="time" onChange={handleChange}></input>
            <input type="text" placeholder="Location" name="location" onChange={handleChange}></input>
            <input type="text" placeholder="address" name ="address" onChange={handleChange}></input>
            <input type="text" placeholder="City" name="city" onChange={handleChange}></input>
            <input type="text" placeholder="State" name="state" onChange={handleChange}></input>
            <input type="text" placeholder="Postcode" name="postcode" onChange={handleChange}></input>
            <button onClick={handleOnClick}>Submit</button>
        </div>
    )
}

export default AddEvent