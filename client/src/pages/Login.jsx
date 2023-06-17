import axios from "axios";
import React from "react";
import { useState } from "react"
import ServerUrl from "../tools/serverUrl";

const LoadUserSettings = (data) => {
    Object.keys(data).forEach(key=>{
        if (!data[key]) data[key]='';
        localStorage.setItem(key, data[key])
    })
    window.location.href = "/"
}


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginWarning, setLoginWarning] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(ServerUrl+"/login", {
            email: email,
            password: password
        })
        .then(res=>{
            if (res.data==="invalid"){
                setLoginWarning("Invalid password or email")
            }
            else{
                LoadUserSettings(res.data)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }


    return (<>
        <form className="login" onSubmit={(e)=>{handleSubmit(e)}}>
            <h1>Log In</h1>

            <label>Email</label>
            <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
            <label>Password</label>
            <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>

            <button type="submit">Log In</button>
            <label className="warning login">{loginWarning}</label>
        </form>
    </>)
}

export default Login;