import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

function Login(props){
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

    const onLoginSuccess = ()=>{

    }

    const perFormLoginRequest = async ()=>{
            await axios.post('http://localhost:8080/login',user)
            .then((result)=> {
                if(result.data.success){
                    props.onLogin()
                } else{
                    console.log("good faild")
                }
            })
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

const mapDispathToProps= (dispatch)=>{
    return{
        onLogin: ()=> dispatch({type:"ON_LOGIN"})
    }
}
export default connect(null,mapDispathToProps)(Login)