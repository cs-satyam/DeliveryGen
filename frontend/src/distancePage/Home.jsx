import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Small arrow icon
const makeArrowIcon = (headingDeg = 0) =>
  L.divIcon({
    className: "user-arrow-icon",
    html: `
      <div style="
        width: 0;height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 14px solid #0d6efd;
        transform: rotate(${headingDeg}deg);
        filter: drop-shadow(0 0 2px rgba(0,0,0,0.4));
      "></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

// Move map to location
const MoveToLocation = ({ location, zoom = 14 }) => {
  const map = useMap();
  useEffect(() => {
    if (location) map.setView([location.lat, location.lng], zoom, { animate: true });
  }, [location, zoom, map]);
  return null;
};

// Fit bounds to route
const FitBounds = ({ positions }) => {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [positions, map]);
  return null;
};

const Home = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [startOption, setStartOption] = useState(null);
  const [startInput, setStartInput] = useState("");
  const [startCoords, setStartCoords] = useState(null);

  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const [isNavigating, setIsNavigating] = useState(false);
  const [userPos, setUserPos] = useState(null);
  const [userHeading, setUserHeading] = useState(0);

  const watchIdRef = useRef(null);
  const lastRouteUpdateRef = useRef(0);
  const lastUserPosRef = useRef(null);

  // Helpers
  const toRouteLatLngs = (geojsonCoords) => geojsonCoords.map(([lng, lat]) => ({ lat, lng }));
  const distanceMeters = (a, b) => {
    const R = 6371000;
    const toRad = (x) => (x * Math.PI) / 180;
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  };
  const computeHeading = (from, to) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const toDeg = (x) => (x * 180) / Math.PI;
    const φ1 = toRad(from.lat);
    const φ2 = toRad(to.lat);
    const λ1 = toRad(from.lng);
    const λ2 = toRad(to.lng);
    const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
    const x =
      Math.cos(φ1) * Math.sin(φ2) -
      Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
    return (toDeg(Math.atan2(y, x)) + 360) % 360;
  };

  // Search
  const handleSearch = async () => {
    if (!search.trim()) return;
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
    );
    setSearchResults(res.data);
  };

  const handleSelectPlace = (place) => {
    const p = { lat: parseFloat(place.lat), lng: parseFloat(place.lon), display_name: place.display_name };
    setSelectedPlace(p);
    setSearchResults([]);
    setStartOption(null);
    setStartCoords(null);
    setRoute([]);
    setDistance("");
    setDuration("");
    setIsNavigating(false);
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  // Build route via OSRM
  const buildRoute = async (from, to) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;
    const res = await axios.get(url);
    if (!res.data.routes || res.data.routes.length === 0) throw new Error("No route found");
    const routeData = res.data.routes[0];
    setRoute(toRouteLatLngs(routeData.geometry.coordinates));
    setDistance((routeData.distance / 1000).toFixed(2) + " km");
    setDuration((routeData.duration / 60).toFixed(0) + " mins");
  };

  // Current location
  const handleUseCurrentLocation = () => {
    if (!selectedPlace) return alert("Select a destination first!");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const from = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setStartCoords(from);
        await buildRoute(from, selectedPlace);
      },
      (err) => {
        console.error(err);
        alert("Unable to fetch your location!");
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );
  };

  // Custom location
  const handleUseCustomLocation = async () => {
    if (!startInput.trim()) return alert("Please enter a starting location!");
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(startInput)}`
    );
    if (res.data.length > 0) {
      const from = { lat: parseFloat(res.data[0].lat), lng: parseFloat(res.data[0].lon) };
      setStartCoords(from);
      await buildRoute(from, selectedPlace);
    } else alert("Could not find location!");
  };

  // Start navigation
  const startNavigation = async () => {
    if (!selectedPlace) return alert("Select a destination first!");
    setIsNavigating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const cur = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserPos(cur);
        if (!startCoords) setStartCoords(cur);
        try { await buildRoute(cur, selectedPlace); } catch (e) { console.error(e); }
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 15000 }
    );

    if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        const cur = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserPos(cur);

        const deviceHeading = pos.coords.heading;
        if (deviceHeading !== null && !Number.isNaN(deviceHeading)) setUserHeading(deviceHeading);
        else if (lastUserPosRef.current) setUserHeading(computeHeading(lastUserPosRef.current, cur));

        lastUserPosRef.current = cur;

        const now = Date.now();
        const movedEnough =
          !route.length ||
          distanceMeters(cur, route[Math.min(1, route.length - 1)]) > 80;

        if (now - lastRouteUpdateRef.current > 8000 || movedEnough) {
          lastRouteUpdateRef.current = now;
          try { await buildRoute(cur, selectedPlace); } catch (e) { console.warn(e.message); }
        }
      },
      (err) => { console.error(err); alert("Location tracking failed."); stopNavigation(); },
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 20000 }
    );
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  useEffect(() => () => { if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current); }, []);

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-light bg-light shadow-sm mb-3 px-3">
        <h3 className="text-primary m-0">Quantum Map</h3>
        <div className="d-flex gap-2" style={{ width: "50%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </nav>

      <div className="row">
        <div className="col-md-4">
          {searchResults.length > 0 && (
            <ul className="list-group">
              {searchResults.map((p) => (
                <li
                  key={p.place_id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSelectPlace(p)}
                >
                  {p.display_name}
                </li>
              ))}
            </ul>
          )}
          {selectedPlace && (
            <div className="my-3 p-3 border rounded bg-light">
              <h5>Destination: {selectedPlace.display_name}</h5>
              <button className="btn btn-success me-2" onClick={handleUseCurrentLocation}>
                Use My Location
              </button>
              <input
                type="text"
                placeholder="Custom start location"
                className="form-control mb-2"
                value={startInput}
                onChange={(e) => setStartInput(e.target.value)}
              />
              <button className="btn btn-secondary mb-2" onClick={handleUseCustomLocation}>
                Use Custom Location
              </button>
              {!isNavigating && startCoords && (
                <button className="btn btn-primary me-2" onClick={startNavigation}>Start Navigation</button>
              )}
              {isNavigating && <button className="btn btn-danger" onClick={stopNavigation}>Stop Navigation</button>}
              <p className="mt-2">Distance: {distance}</p>
              <p>Duration: {duration}</p>
            </div>
          )}
        </div>
        <div className="col-md-8">
          <MapContainer center={[20, 77]} zoom={5} style={{ height: "80vh", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {selectedPlace && <Marker position={selectedPlace} />}
            {startCoords && !isNavigating && <Marker position={startCoords} />}
            {route.length > 0 && <Polyline positions={route} color="blue" />}
            {userPos && isNavigating && <Marker position={userPos} icon={makeArrowIcon(userHeading)} />}
            {userPos && <MoveToLocation location={userPos} />}
            {route.length > 0 && <FitBounds positions={route} />}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
