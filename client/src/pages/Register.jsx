import axios from "axios";
import React, { useState } from "react";
import serverUrl from "../tools/serverUrl";


const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailWarning, setEmailWarning] = useState('');
    const [usernameWarning, setUsernameWarning] = useState('');
    const [passwordWarning, setPasswordWarning] = useState('');
    const [registerWarning, setRegisterWarning] = useState('');

    const checkPassword = (password) => {
        if (password.length<8){
            setPasswordWarning("Password must be at least 8 characters long")
            return false
        }
        if (!/[A-Z]/.test(password)){
            setPasswordWarning("Password must contain at least one upper case letter")
            return false
        }
        if (!/[a-z]/.test(password)){
            setPasswordWarning("Password must contain at least one lower case letter")
            return false
        }
        if (!/[0-9]/.test(password)){
            setPasswordWarning("Password must contain at least one digit")
            return false
        }
        return true
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {setEmailWarning('Invalid email') } else setEmailWarning('');
        if (!username) {setUsernameWarning('Invalid username')} else setUsernameWarning('');
        if (!password) {setPasswordWarning('Invalid Password')} else setPasswordWarning('');
        if (!checkPassword(password)) return;

        axios.post(serverUrl+"/register", {
            email: email,
            username: username,
            password: password
        })
        .then(res=>{
            if (res.data==="succes"){
                window.location.href = "/login"
            }
            if (res.data==="already registered"){
                setRegisterWarning("This email is already registered!")
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (<>
        <form className='register' onSubmit={(e) => {handleSubmit(e)}}>
            <h1>Sign Up</h1>

            <label>Email</label>
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
            <label className="warning email">{emailWarning}</label>

            <label>Username</label>
            <input type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
            <label className="warning username">{usernameWarning}</label>

            <label>Password</label>
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <label className="warning password">{passwordWarning}</label>

            <button type="submit">Sign Up</button>
            <label className="warning register">{registerWarning}</label>
        </form>
    </>)
}

export default Register;