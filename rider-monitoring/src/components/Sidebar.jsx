import React, { useState } from "react";
import { map, headQ, bell, setting } from "../assets";
import "../styles/Sidebar.css"; // Assuming your CSS file is named Sidebar.css

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    if (activeItem === item) {
      setActiveItem(null); // Close popup if already open
    } else {
      setActiveItem(item); // Open popup for the clicked item
    }
  };

  const handleResetClick = () => {
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="sidebar">
      <ul>
        <li onClick={handleResetClick}>
          <img src={map} alt="Map" />
        </li>
        <li onClick={() => handleItemClick("headQ")}>
          <img src={headQ} alt="Headquarters" />
        </li>
        <li onClick={() => handleItemClick("bell")}>
          <img src={bell} alt="Bell" />
        </li>
        <li onClick={() => handleItemClick("setting")}>
          <img src={setting} alt="Settings" />
        </li>
      </ul>

      {activeItem && (
        <div className="popup">
          <ul>
            {/* {activeItem === "map" && (
              <>
                <li>Option 1</li>
                <li>Option 2</li>
                <li>Option 3</li>
              </>
            )} */}
            {activeItem === "headQ" && (
              <>
                <li>Mumbai HQ</li>
                <li>Pune HQ</li>
                <li>Delhi HQ</li>
                <li>Indore HQ</li>
                <li>Bangalore HQ</li>
              </>
            )}
            {activeItem === "bell" && (
              <>
                <li>No Notification</li>
              </>
            )}
            {activeItem === "setting" && (
              <>
                <li onClick={handleResetClick}>Reset</li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
