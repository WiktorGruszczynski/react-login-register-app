import React from "react";

const BurgerMenu = ({className, callback}) => {
    return (
        <div className={className} onClick={callback}>
            <div className="top"></div>
            <div className="mid"></div>
            <div className="bot"></div>
        </div>
    )
}

export default BurgerMenu;