import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Login(){
    const [user,setUser]=useState({})

    const handelOnChange =(e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }
    const handleLogin = ()=>{
        perFormLoginRequest()
    }

    const perFormLoginRequest = async ()=>{

    }
    return(
        <>
        <div>Login Page</div>
        <input type ="text" name="username" placeholder="username" onChange={handelOnChange}></input>
        <input type ="text" name="password" placeholder="password" onChange={handelOnChange}></input>
        <button onClick={handleLogin}>Login</button>
        </>
    )
}

export default Login