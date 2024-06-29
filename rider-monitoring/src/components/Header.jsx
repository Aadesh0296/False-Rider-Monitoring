import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userImg, GuardianRide } from "../assets";

const Header = ({ handleLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <header className="App-header">
      <div className="header-left">
        <Link to="/" className="link">
          Dashboard
        </Link>
        <Link to="/about" className="link">
          About
        </Link>
        <Link to="/hq" className="link">
          Headquarters
        </Link>
      </div>
      <img
        src={GuardianRide}
        alt=""
        style={{ width: "140px", padding: "22px" }}
      />
      <div className="header-left">
        <input type="text" placeholder="search by city" />
        <div className="user-profile" onClick={toggleDropdown}>
          <img src={userImg} alt="" />
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={() => alert("Account clicked")}>Account</button>
              <button onClick={() => alert("Change Password clicked")}>
                Change Password
              </button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
