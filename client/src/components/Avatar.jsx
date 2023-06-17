import React from "react";
import avatar_image from '../assets/avatar.png';
import serverUrl from "../tools/serverUrl";
import EditPencil from "../assets/EditPencil";


const Avatar = ({callback}) => {
    const AvatarThumbnail = localStorage.getItem("avatar")
    const avatar = AvatarThumbnail ? serverUrl + "/attachments/" + AvatarThumbnail : avatar_image;
    
    return (
        <div className="avatar" style={{backgroundImage: `url(${avatar})`}} onClick={callback}>
            <EditPencil/>
        </div>
    )
}

export default Avatar;