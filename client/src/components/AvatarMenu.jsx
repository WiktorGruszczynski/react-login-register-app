import React, { useState } from "react";
import Chevron from "../assets/Chevron";
import Avatar from "./Avatar";
import axios from "axios";
import serverUrl from "../tools/serverUrl";

const LogOut = () => {
    localStorage.clear()
}

const handleAvatarClick = () => {
    var fileInput = document.getElementById('file-drop');
    fileInput.click();
}

const editUserProfilePicture = (file) =>{
    axios.post(serverUrl+"/upload", {
        image: file,
        id:  localStorage.getItem("id"),
        old_thumbnail: localStorage.getItem("avatar")
    }, 
    {headers: {
        "Content-Type": "multipart/form-data"
    }})
    .then(res=>{
        const new_filename = res.data;
        localStorage.setItem("avatar", new_filename);
    })
    .catch(err=>{console.log(err)})
}


const AvatarMenu = ({className}) => {
    const [settings, setSettings] = useState(false);
    const [options, setOptions] = useState({id: localStorage.getItem("id")});
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [removePassword, setRemovePassword] = useState("");

    const editOptionsValue = (key, value) => {
        setOptions(prevOptions => ({
            ...prevOptions,
            [key.toLowerCase()]: value
        }))
    }

    const deleteAccount = () => {
        axios.post(serverUrl+"/delete", {
            id: localStorage.getItem("id"),
            password: removePassword
        })
        .then(res=>{
            if (res.data==="account deleted"){
                window.location.reload()
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const saveOptions = () => {
        setSelectedIndex(-1);
        if (!options) return;

        axios.post(serverUrl+"/edit", options)
        .then(res=>{
            if (res.data==="succes"){
                Object.keys(options).forEach(key => {
                    if (key==='username'){
                        setUsername(options.username)
                    }
                })
            }

        })
        .catch(err=>{
            console.log(err)
        })
    }

    const optionsList = ["Username", "Password"];
    const lastIndex = 2;

    return (<>
    <ul className={className}>
        <a href="/"><li className="gray-button bold">Profile</li></a>
        <li className="gray-button bold" onClick={()=>{setSettings(true)}}>Settings</li>
        <a href="/"><li className="white-button bold" onClick={LogOut}>Log Out</li></a>
    </ul>

    <div className ={`settings ${settings? "active": ""}`}>
        <div className="avatar-section">
            <Avatar callback={handleAvatarClick}/>
            <h1>{username}</h1>
            <input type="file" accept="image/*" id="file-drop" style={{display: "none"}} onChange={(e)=>{editUserProfilePicture(e.target.files[0])}}/>
        </div>

        <ul className="options-section">
            {optionsList.map((item, index) => (<>
            <li key={index} id={item} className={`accent-button bold ${selectedIndex===index? "hidden": ""}`} onClick={()=>{setSelectedIndex(index)}}>Change {item}</li>
            
            <input key={`${index}input`} type={item==="Password"? "password": "text"} className={selectedIndex===index? "": "hidden"}  placeholder={item.toLowerCase()} onChange={(e)=>editOptionsValue(item, e.target.value)}/>
            {item==="Password" && (<input key={`${index}password`} type="password" className={selectedIndex===index? "": "hidden"} placeholder="new password" onChange={(e)=>editOptionsValue("new_password", e.target.value)}/>)}
            </>
            ))}
            <li className={`warning-button bold ${selectedIndex===lastIndex ? "hidden": ""}`} onClick={()=>{setSelectedIndex(lastIndex)}}>Delete Account</li>
            <input type="password" className={selectedIndex===lastIndex? "": "hidden"} placeholder="password" onChange={(e)=>{setRemovePassword(e.target.value)}}></input>
            <li className={`warning-button bold ${selectedIndex!==lastIndex ? "hidden": ""}`} onClick={deleteAccount}>Delete</li>
        </ul>

        <div className="save-section">
            <div className="white-button bold" onClick={saveOptions}>Save</div>
        </div>

        <Chevron className="settings-chevron" callback={()=>{
            setSettings(false);
            setSelectedIndex(-1);
            document.querySelector(".avatar").click()
        }}/>
    </div>

    
    </>)
}

export default AvatarMenu;