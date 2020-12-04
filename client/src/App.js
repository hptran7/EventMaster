import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Events from './components/Events'



function App() {

  const [events, setEvent] = useState([])

  useEffect(() =>{
    fetchEvents()
  },[])

  const fetchEvents = async () =>{
    let resultEvent = await axios.get("http://localhost:8080/")
    setEvent(resultEvent.data)
  }

  const eventItem = events.map((event)=>{
    return(
    <li key={event.id}>{event.name}</li>

    )
  })
  
  return (
    <div>
      <h1>Main Page</h1>
        
        <Events eventList = {events} onDelete={fetchEvents}></Events>

    </div>
  );
}

export default App;
