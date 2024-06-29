import React from "react";

const About = () => {
  return (
    <div style={{ padding: "20px 175px", textAlign: "center" }}>
      <h1>| GuardianRide |</h1>
      <p>
        <span style={{fontWeight:"bold"}}>GuardianRide</span> is a Camera/Sensors and AI/ML algorithm based product
        designed to enhance road safety by continuously monitoring bike riders'
        positions and behaviors. A camera mounted on the dash panel captures
        footage of riders, which is then processed and transmitted to the KTM
        server for real-time analysis using SIM based IoT Communication Module.
        An AI/ML algorithm embedded on an onboard electronic chip analyzes the
        footage to detect abnormal postures, and any abnormalities are promptly
        reported to the KTM server along with relevant analytics such as rider
        registration number, coordinates, highway, and lane number. The KTM
        server, connected to an in-house software, provides detailed city-wise
        analytics and displays the live location of faulty drivers on a city
        map. Additionally, the system allows access to registered bike details
        and facilitates sharing of information with the local traffic police
        control room, as per the permissions set by KTM authorities.
      </p>
    </div>
  );
};

export default About;
