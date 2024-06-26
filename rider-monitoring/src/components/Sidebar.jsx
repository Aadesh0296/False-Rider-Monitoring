import React from "react";
import { map, headQ, bell, setting } from "../assets";
import "../styles/Sidebar.css"; // Assuming your CSS file is named Sidebar.css

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <img src={map} alt="Map" />
        </li>
        <li>
          <img src={headQ} alt="Headquarters" />
        </li>
        <li>
          <img src={bell} alt="Bell" />
        </li>
        <li>
          <img src={setting} alt="Settings" />
        </li>
      </ul>
    </div>
  );
}
