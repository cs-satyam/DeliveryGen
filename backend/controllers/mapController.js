const mapService = require("../services/map"); // your file

// Get coordinates for an address
exports.getAddressCoordinate = async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) return res.status(400).json({ error: "Address is required" });
  
    const location = await mapService.getAddressCoordinate(address);
    res.json({ location });
  } catch (err) {
    res.status(500 ).json({ error: err.message });
  }
};

// Get distance and time between origin and destination
exports.getDistanceTime = async (req, res) => {
  try {
    const { origin, destination } = req.body;
    if (!origin || !destination) return res.status(400).json({ error: "Origin and destination are required" });

    const result = await mapService.getDistanceTime(origin, destination);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get autocomplete suggestions for input
exports.getAutoCompleteSuggestions = async (req, res) => {
  try {
    const { input } = req.body;
    if (!input) return res.status(400).json({ error: "Input is required" });

    const suggestions = await mapService.getAutoCompleteSuggestions(input);
    res.json({ suggestions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
