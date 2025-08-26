# DeliveryGen

DeliveryGen is a Node.js backend providing user authentication and map features (geocoding, distance calculation, autocomplete).

## Features
- User registration, login, logout (JWT in httpOnly cookie)
- Address → coordinates (geocoding)
- Distance & duration between coordinates
- Autocomplete address suggestions
- MongoDB for persistence

## Project structure
backend/
- controllers/      # route handlers (authController, mapController)
- middleware/       # auth middleware
- models/            # Mongoose models (User)
- routes/            # route definitions (auth, map)
- services/          # map / geocoding logic
- db/                # DB connection
- app.js             # express app
- server.js          # server bootstrap
.env                 # env variables

## Prerequisites
- Node.js v16+
- MongoDB (local or cloud)

## Setup
1. From project root:
   cd backend
   npm install

2. Create `backend/.env`:


## Run
- Development (with nodemon): npm run dev
- Production: npm start
Default server URL: http://localhost:9000

## API (base: /api)
Auth
- POST /api/auth/register — register user
- POST /api/auth/login — login (sets cookie)
- POST /api/auth/logout — clear cookie

Map (protected by auth middleware)
- POST /api/map/coordinates — body: { "address": "..." }
- POST /api/map/distance — body: { "origin": {lat,lon}, "destination": {lat,lon} }
- POST /api/map/autocomplete — body: { "input": "..." }

## Example requests

Coordinates
```json
POST /api/map/coordinates
{
  "address": "Lal Kila, Delhi, India"
}
Response:
{
  "location": { "lat": 28.6562, "lon": 77.2410 }
}

## Distance

POST /api/map/distance
{
  "origin": {"lat":28.6129332,"lon":77.2294928},
  "destination": {"lat":28.5276529,"lon":77.1813592}
}
Response:
{
  "result": { "distance": "11.9 km", "duration": "14 mins" }
}

## Autocomplete

POST /api/map/autocomplete
{
  "input": "Lal Kila"
}
Response:
{
  "suggestions": [
    "Lal Kila, Delhi, India",
    "Lal Kila Road, Delhi, India"
  ]
}


