import React, { useState } from "react";
import GamesWrapper from "../components/GamesWrapper";


const Profile = () => {
  const sidebarItems = ["Games", "Favourite"];
  const mobileMaxWidth = 990;
  const [selectedIndex, setSelectedIndex] = useState(window.innerWidth > mobileMaxWidth ? 0 : -1);

  const handleChevron = () => {
    setSelectedIndex(-1);
  };

  return (
    <div className="profile-main">
      <ul className="sidebar">
        {sidebarItems.map((item, index) => (
          <li
            key={`sidebar_${index}`}
            className={`dark bold ${selectedIndex === index ? "active" : ""}`}
            onClick={() => {
            setSelectedIndex(index);
            }}>{item} </li>
        ))}
      </ul>
      <GamesWrapper selectedIndex={selectedIndex} callback={handleChevron}/>
    </div>
  );
};

export default Profile;
