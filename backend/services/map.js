const axios = require('axios');

// Get coordinates for a given address
module.exports.getAddressCoordinate = async (address) => {
    if (!address) throw new Error("Address is required");

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {


        const response = await axios.get(url);
        console.log("Google Geocode API response:", response.data); // <-- DEBUG LOG

        if (response.data.status === 'OK' && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return {
                
                lat: location.lat,
                 lng: location.lng
            };
        } else if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('No results found for the given address');
        } else {
            throw new Error(`Google API Error: ${response.data.status} - ${response.data.error_message || ''}`);
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        throw error;
    }
};

// Get distance and time between origin and destination
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) throw new Error('Origin and destination are required');

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        console.log("Google Distance Matrix API response:", response.data); // <-- DEBUG LOG

        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'ZERO_RESULTS') throw new Error('No routes found');
            return element; // distance & duration
        } else {
            throw new Error(`Google API Error: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Error fetching distance/time:", error.message);
        throw error;
    }
};

// Get autocomplete suggestions for input
module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) throw new Error('Input is required');

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        console.log("Google Places Autocomplete API response:", response.data); // <-- DEBUG LOG

        if (response.data.status === 'OK') {
            return response.data.predictions
                .map(prediction => prediction.description)
                .filter(Boolean);
        } else {
            throw new Error(`Google API Error: ${response.data.status} - ${response.data.error_message || ''}`);
        }
    } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error.message);
        throw error;
    }
};
