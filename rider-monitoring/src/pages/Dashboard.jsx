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
import { NoImage } from "../assets";

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

  const [photos, setPhotos] = useState([
    { url: r1 },
    { url: r2 },
    { url: r3 },
    { url: r4 },
  ]);

  const [nophotos] = useState([
    { url: NoImage },
    { url: NoImage },
    { url: NoImage },
    { url: NoImage },
  ]);

  const [tableData, setTableData] = useState([
    { label: "Last Detected Speed", value: "--N/A--" },
    { label: "Last Detected Location", value: "--N/A--" },
    { label: "Latest Detected Co-ordinates", value: "--N/A--" },
    { label: "Vehicle Registration Number", value: "--N/A--" },
    { label: "Vehicle Owner Name", value: "--N/A--" },
    { label: "Vehicle Insurance Status", value: "--N/A--" },
    { label: "Vehicle PUC Status", value: "--N/A--" },
    { label: "Nearby Police Station", value: "--N/A--" },
  ]);

  const [showPhotos, setShowPhotos] = useState(false); // State to control showing photos

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
    resetState();
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
    resetState();
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

  // Function to shuffle an array
  const shuffleArray = (array) => {
    let shuffledArray = array.slice(); // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleMarkerClick = (lat, lng) => {
    console.log(`Marker clicked at: ${lat}, ${lng}`);
    // Generate random data for the clicked coordinates
    const randomSpeed = Math.floor(Math.random() * 100) + 1; // Example: Random speed
    const randomRegistration = "ABCD1234"; // Example: Random registration number
    const randomOwner = "John Doe"; // Example: Random owner name
    const randomInsuranceStatus = Math.random() < 0.5 ? "Active" : "Expired"; // Randomly choose between Active and Expired
    const randomPUCStatus = Math.random() < 0.5 ? "Active" : "Expired"; // Randomly choose between Active and Expired

    // Update tableData with new values based on clicked coordinates
    const updatedTableData = tableData.map((item) => {
      switch (item.label) {
        case "Last Detected Speed":
          return { ...item, value: `${randomSpeed} km/h` };
        case "Last Detected Location":
          return { ...item, value: `City Center` }; // Example: Static location for demonstration
        case "Latest Detected Co-ordinates":
          return {
            ...item,
            value: `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° W`,
          };
        case "Vehicle Registration Number":
          return { ...item, value: randomRegistration };
        case "Vehicle Owner Name":
          return { ...item, value: randomOwner };
        case "Vehicle Insurance Status":
          return { ...item, value: randomInsuranceStatus };
        case "Vehicle PUC Status":
          return { ...item, value: randomPUCStatus };
        default:
          return item;
      }
    });
    setTableData(updatedTableData);

    // Shuffle photos and set showPhotos to true
    const shuffledPhotos = shuffleArray(photos);
    setPhotos(shuffledPhotos);
    setShowPhotos(true);
  };

  const resetState = () => {
    setTableData([
      { label: "Last Detected Speed", value: "--N/A--" },
      { label: "Last Detected Location", value: "--N/A--" },
      { label: "Latest Detected Co-ordinates", value: "--N/A--" },
      { label: "Vehicle Registration Number", value: "--N/A--" },
      { label: "Vehicle Owner Name", value: "--N/A--" },
      { label: "Vehicle Insurance Status", value: "--N/A--" },
      { label: "Vehicle PUC Status", value: "--N/A--" },
      { label: "Nearby Police Station", value: "--N/A--" },
    ]);
    setShowPhotos(false);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      {cityCoordinates && (
        <div className="map-container">
          <Map
            cityCoordinates={cityCoordinates}
            onMarkerClick={handleMarkerClick}
          />
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
            <button
              onClick={handleDownloadReport}
              className="download-btn-datewise"
            >
              Download Report
            </button>
          </div>
        </div>
        {<PhotoGrid photos={showPhotos ? photos : nophotos} />}
        <DataTable data={tableData} />
        <button>Report details to nearby police {`>>`}</button>
      </div>
    </div>
  );
};

export default Dashboard;
