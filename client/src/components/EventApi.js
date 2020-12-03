import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import "../css/eventapi.css"






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


    const eventItem = events.map((event,index)=>{
      return <div className="card" key={index}>
          <div className="projectImageWrapper">
        <img className="screenshot" src={event.images[2].url}/>
      </div>
      <div className="cardBody">
        <p>{event.name}</p>
        <button className="btn">Detail</button>
 

      </div>
    </div>
  
    })

    return(
        <div>
            <h1>Event Api</h1>
            <div className="grid-api">
                {eventItem}
            </div>
        </div>
    )
}

export default EventApi