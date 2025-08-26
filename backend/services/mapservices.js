// const axios = require('axios');

// // Get coordinates for a given address
// module.exports.getAddressCoordinate = async (address) => {
//     if (!address) throw new Error("Address is required");

//     const apiKey = process.env.GOOGLE_MAPS_API;
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);
//         console.log("Google Geocode API response:", response.data); // <-- DEBUG LOG

//         if (response.data.status === 'OK' && response.data.results.length > 0) {
//             const location = response.data.results[0].geometry.location;
//             return {
//                 lat: location.lat,
//                  lng: location.lng
//             };
//         } else if (response.data.status === 'ZERO_RESULTS') {
//             throw new Error('No results found for the given address');
//         } else {
//             throw new Error(`Google API Error: ${response.data.status} - ${response.data.error_message || ''}`);
//         }
//     } catch (error) {
//         console.error("Error fetching coordinates:", error.message);
//         throw error;
//     }
// };

// // Get distance and time between origin and destination
// module.exports.getDistanceTime = async (origin, destination) => {
//     if (!origin || !destination) throw new Error('Origin and destination are required');

//     const apiKey = process.env.GOOGLE_MAPS_API;
//     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);
//         console.log("Google Distance Matrix API response:", response.data); // <-- DEBUG LOG

//         if (response.data.status === 'OK') {
//             const element = response.data.rows[0].elements[0];
//             if (element.status === 'ZERO_RESULTS') throw new Error('No routes found');
//             return element; // distance & duration
//         } else {
//             throw new Error(`Google API Error: ${response.data.status}`);
//         }
//     } catch (error) {
//         console.error("Error fetching distance/time:", error.message);
//         throw error;
//     }
// };

// // Get autocomplete suggestions for input
// module.exports.getAutoCompleteSuggestions = async (input) => {
//     if (!input) throw new Error('Input is required');

//     const apiKey = process.env.GOOGLE_MAPS_API;
//     const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);
//         console.log("Google Places Autocomplete API response:", response.data); // <-- DEBUG LOG

//         if (response.data.status === 'OK') {
//             return response.data.predictions
//                 .map(prediction => prediction.description)
//                 .filter(Boolean);
//         } else {
//             throw new Error(`Google API Error: ${response.data.status} - ${response.data.error_message || ''}`);
//         }
//     } catch (error) {
//         console.error("Error fetching autocomplete suggestions:", error.message);
//         throw error;
//     }
// };
const axios = require("axios");
const OSRM_BASE = "https://router.project-osrm.org";

// async function getDistanceTimeGoogle(origin, destination, apiKey) {
//   const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lon}&destination=${destination.lat},${destination.lon}&key=${apiKey}`;
//   const res = await axios.get(url);
//   const route = res.data.routes[0].legs[0];
  
//   return {
//     distance: `${(route.distance.value / 1000).toFixed(2)} km`,
//     duration: `${Math.floor(route.duration.value / 3600)} h ${Math.floor((route.duration.value % 3600)/60)} min`
//   };
// }

// Get distance and duration between two coordinates
async function getDistanceTime(origin, destination) {
  const url = `${OSRM_BASE}/route/v1/driving/${origin.lon},${origin.lat};${destination.lon},${destination.lat}?overview=false`;
  const res = await axios.get(url);
  if (res.data.code !== "Ok") throw new Error(res.data.message);

  const route = res.data.routes[0];

  // Distance in km and meters
  const km = Math.floor(route.distance / 1000);       // whole km
  const meters = Math.round(route.distance % 1000);  // remaining meters

  // Duration in hours and minutes
  const totalMinutes = route.duration / 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);

  return {
    distance: `${km} km ${meters} m`,
    duration: `${hours} h ${minutes} min`
  };
}

// Get coordinates from an address using Nominatim
async function getAddressCoordinate(address) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

  const res = await axios.get(url, { headers: { "User-Agent": "DeliveryGen-App" } });
  if (!res.data.length) throw new Error("Address not found");

  return {
    lat: parseFloat(res.data[0].lat),
    lon: parseFloat(res.data[0].lon)
  };
}



// Get autocomplete suggestions from Nominatim
async function getAutoCompleteSuggestions(input) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&limit=5`;

  const res = await axios.get(url, { headers: { "User-Agent": "DeliveryGen-App" } });
  return res.data.map(place => ({
    display_name: place.display_name,
    lat: parseFloat(place.lat),
    lon: parseFloat(place.lon)
  }));
}

module.exports = {
  getDistanceTime,
  getAddressCoordinate,
  getAutoCompleteSuggestions
};
