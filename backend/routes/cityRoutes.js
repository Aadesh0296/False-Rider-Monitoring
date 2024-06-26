// backend/routes/cityRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const citySchema = new mongoose.Schema(
  {
    City: String,
    Lat: Number,
    Long: Number,
    country: String,
    iso2: String,
    State: String,
  },
  { collection: "cities_dataset" }
);

const City = mongoose.model("City", citySchema);

// Fetch all unique states
router.get("/states", async (req, res) => {
  try {
    const states = await City.distinct("State");
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to fetch cities based on state name from request body
router.post("/state/cities", async (req, res) => {
  // console.log('Received form-data:', req.body); // Log the entire req.body object
  const state = req.body.state;
  // console.log('Received state:', state); // Add this line for debugging
  try {
    const cities = await City.find({ State: state }).select("City");
    //   console.log('Cities found:', cities); // Add this line for debugging
    const cityNames = cities.map((city) => city.City);
    res.json(cityNames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/city_details", async (req, res) => {
    const { state, city} = req.body;
    try {
        const cityData = await City.findOne({ State: state, City: city});
        if(!cityData) {
            return res.status(404).json({message:"City not found!!!"});
        }
        const { Lat, Long } = cityData;
        res.json({ Lat, Long });
    } catch (error) {
        
    }
})

module.exports = router;
