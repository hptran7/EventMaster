import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import axios from 'axios'

function EventApi(){

    useEffect(() =>{
        fetchAPIEvent()
      },[])
    const [events,setEvents]= useState([])
    const fetchAPIEvent = async() =>{
        const events = await axios.get("https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=300&apikey=HJiw8glKSajGdYC33wEs8KFwVZAIiivY&size=12")
        console.log(events.data._embedded.events)
        setEvents(events.data._embedded.events)
    }

    const eventItem = events.map((event)=>{
        return <li>
            <img src={event.images[6].url}/>
            <div>{event.name}</div>
            <button>Detail</button>
            </li>
    })

    return(
        <div>
            <h1>Event Api</h1>
            <ul>
                {eventItem}
            </ul>
        </div>
    )
}

export default EventApi