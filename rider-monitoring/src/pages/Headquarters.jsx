import React from "react";

const Headquarters = () => {
  const headQ = [
    "Delhi",
    "Mumbai",
    "Pune",
    "Bangalore",
    "Hyderabad",
    "Nagpur",
    "Chennai",
    "Lucknow",
  ];
  return (
    <div className="headQ">
      <h1>Headquarters</h1>
      <ul>
        {headQ.map((hq, index) => (
          <li>{hq}</li>
        ))}
      </ul>
    </div>
  );
};

export default Headquarters;
