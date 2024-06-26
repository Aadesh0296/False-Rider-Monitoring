import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import PhotoGrid from "../components/PhotoGrid";
import DataTable from "../components/DataTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Dashboard.css";
import { r1, r2, r3, r4 } from "../assets/rider";

const Dashboard = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityCoordinates, setCityCoordinates] = useState({
    lat: 20.5937,
    lng: 78.9629,
  }); // Default coordinates for India
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date

  const [photos] = useState([
    { url: r1 },
    { url: r2 },
    { url: r3 },
    { url: r4 },
  ]);

  const [tableData] = useState([
    { label: "Last Detected Speed", value: "100 km/h" },
    { label: "Last Detected Location", value: "City Center" },
    { label: "Latest Detected Co-ordinates", value: "40.7128° N, 74.0060° W" },
    { label: "Vehicle Registration Number", value: "ABC1234" },
    { label: "Vehicle Owner Name", value: "John Doe" },
    { label: "Vehicle Insurance Status", value: "Active" },
    { label: "Vehicle PUC Status", value: "Valid" },
    { label: "Nearby Police Station", value: "Central Station" },
  ]);

  useEffect(() => {
    // Fetch all states from backend
    axios
      .get("http://localhost:5000/states") // Adjust URL as per your backend setup
      .then((response) => {
        const options = response.data.map((state) => ({
          value: state,
          label: state,
        }));
        setStates(options);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  }, []);

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setSelectedCity(null); // Clear selected city
    // Fetch cities for selected state
    axios
      .post("http://localhost:5000/state/cities", {
        state: selectedOption.value,
      }) // Adjust URL as per your backend setup
      .then((response) => {
        const options = response.data.map((city) => ({
          value: city,
          label: city,
        }));
        setCities(options);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  };

  const handleCityChange = (selectedOption) => {
    setCityCoordinates(null); // Clear city coordinates
    setSelectedCity(selectedOption);
    // Fetch latitude and longitude for selected city
    axios
      .post("http://localhost:5000/city_details", {
        state: selectedState.value,
        city: selectedOption.value,
      }) // Adjust URL as per your backend setup
      .then((response) => {
        setCityCoordinates({ lat: response.data.Lat, lng: response.data.Long });
      })
      .catch((error) => {
        console.error("Error fetching lat-long:", error);
      });
  };

  const handleDownloadReport = () => {
    console.log("Selected Date:", selectedDate);
    // You can add logic to handle report download here
  };

  // Styles for customizing react-select options
  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: "#000", // Option text color
    }),
  };

  return (
    <div className="dashboard">
      <Sidebar />
      {cityCoordinates && (
        <div className="map-container">
          <Map cityCoordinates={cityCoordinates} />
        </div>
      )}
      <div className="select-section">
        <div className="select-flex">
          <div className="select-container">
            <label>Select State:</label>
            <Select
              value={selectedState}
              onChange={handleStateChange}
              options={states}
              styles={customStyles} // Apply custom styles to options
            />
          </div>
          <div className="select-container">
            <label>Select City:</label>
            <Select
              value={selectedCity}
              onChange={handleCityChange}
              options={cities}
              styles={customStyles} // Apply custom styles to options
              isDisabled={!selectedState} // Disable until state is selected
            />
          </div>
        </div>
        <div className="select-flex">
          <div className="select-container">
            <label>Date based report</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy/MM/dd"
              className="date-picker custom-datepicker"
            />
          </div>
          <div className="select-container">
            <label>Download Report</label>
            <button onClick={handleDownloadReport} className="download-btn-datewise">Download Report</button>
          </div>
        </div>
        <PhotoGrid photos={photos} />
        <DataTable data={tableData} />
        <button>Report details to nearby police {`>>`}</button>
      </div>
    </div>
  );
};

export default Dashboard;
