import React, { useState } from "react";
import isLogged from "../tools/isLogged"
import BurgerMenu from "./BurgerMenu";
import Avatar from "./Avatar"
import AvatarMenu from "./AvatarMenu";

const Navigation = () => {
    const [isBurgerClicked, setBurgerClicked] = useState(false);
    const [isAvatarClicked, setAvatarClicked] = useState(false);

    const showMobileMenu = () => {
        setBurgerClicked(!isBurgerClicked)
    }



    return (<nav>
        <div className="header">
            <a href="/"><div className="logo">LOGO</div></a>
            {!isLogged && (<><ul className={`nav-menu ${isLogged ? "hidden": ""}`}>
                <a href="/login"><li className='gray-button bold'>Log In</li></a>
                <a href="/register"> <li className='white-button bold'>Sign Up</li></a>
            </ul>
            <BurgerMenu className={`burger-menu ${isBurgerClicked? "active":""}`} callback={showMobileMenu} />
            </>)}
            {isLogged && (<>
                <Avatar callback={()=>{setAvatarClicked(!isAvatarClicked)}}/>
                <AvatarMenu className={`avatar-menu ${isAvatarClicked? "active": ""}`}/>
            </>)}
        </div>

        {!isLogged && (<ul className={`mobile-menu ${isBurgerClicked? "active": ""}`}>
            <a href="/login"><li className='gray-button bold'>Log In</li></a>
            <a href="/register"> <li className='white-button bold'>Sign Up</li></a>
        </ul>)}
    </nav>)
}

export default Navigation;