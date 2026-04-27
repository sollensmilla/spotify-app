# Spotify Analytics App

A full-stack Spotify-inspired analytics application for exploring and visualizing music data.

This project is built as a **monorepo** containing:

- `frontend` – React + Vite client
- `auth-server` – Express-based authentication server (OAuth + JWT)

## Features
- OAuth login (GitHub & Google)
- Interactive data visualizations (Chart.js)
- Advanced filtering (tempo, energy, popularity, etc.)
- Search by track name and genre
- Pagination for large datasets
- Client-side clustering (K-Means) for track “vibes”
- Analytics view with drill-down functionality
- Top tracks & artists

## Teach Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Chart.js (react-chartjs-2)
- Axios
- React Router

### Backend (Auth Server)
- Node.js
- Express
- JSON Web Tokens (JWT)
- OAuth 2.0 (GitHub, Google)
- Cookie-based auth

### Other
- Monorepo setup with concurrently
- ESLint for linting

## Project Structure
```
spotify-app/
│
├── frontend/        # React client
├── auth-server/     # Express auth server
├── package.json     # Root scripts (monorepo)
```

## Getting Started

1. Clone the repo
```
git clone https://github.com/sollensmilla/spotify-app.git
cd spotify-app
```
2. Install dependencies
Install for all parts:
```
npm install
cd frontend && npm install
cd ../auth-server && npm install
```

3. 
Create a .env file in auth-server/:
```
GITHUB_CLIENT_ID=your_id
GITHUB_CLIENT_SECRET=your_secret

GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret

API_URL=https://spotify-api-production-82d8.up.railway.app/graphql

JWT_SECRET=your_secret

OAUTH_PASSWORD=choose_passwrod

FRONTEND_URL=frontend_url
BACKEND_URL=backend_url
NODE_ENV=development?production
```

4. Run the app
From root:
```
npm run dev
```
This starts both:
- frontend (Vite)
- auth-server (Express)

5. Linting
From the root:
```
npm run lint
```
or:
```
npm run lint:fix
```

## Deployment
The app is deployed on Railway:
👉 [https://spotify-app-production-6203.up.railway.app/login](https://spotify-app-production-6203.up.railway.app/login)


## Authentication Flow
1. User logs in via OAuth (GitHub or Google)
2. Auth server handles the OAuth callback and retrieves user email
3. Auth server calls the backend API (`loginOrRegister`)
4. Backend API:
   - logs in or creates the user
   - generates a JWT
5. JWT is returned to the auth server
6. Auth server stores the JWT in a secure HTTP-only cookie
7. Frontend accesses protected routes using the cookie

## Data & Analytics
The application works with a large dataset of music tracks retrieved from a GraphQL API. Each track contains both metadata and audio features, enabling advanced filtering, aggregation, and analysis.

### Track Features
- **Energy** – intensity and activity level of the track
- **Danceability** – how suitable a track is for dancing
- **Tempo** – speed in beats per minute (BPM)
- **Acousticness** – likelihood of being acoustic
- **Instrumentalness** – likelihood of containing no vocals
- **Popularity** – overall popularity score

In addition, tracks include:
- **Genre**
- **Explicit flag**
- **Musical key**
- **Artist and album relationships**
- **Cover image**

### Filtering & Querying (GraphQL)

Tracks are fetched using flexible GraphQL queries with a dynamic filter object `(TrackFilterInput)`.

The frontend constructs filter criteria based on user input, including:
- Numeric ranges (min/max values)
- Categorical filters (explicit, key)
- Text search (genre, track name)
Example:
```
filter: {
  minEnergy,
  maxEnergy,
  genre,
  name,
  explicit
}
```
This allows:
- Efficient querying directly in the API
- Reduced overfetching (only required fields are requested)
- Dynamic and composable filtering

### Pagination & Performance
To handle large datasets efficiently:
- he Dashboard fetches a **limited subset (25 tracks)** for fast interaction
- The Analytics view uses **pagination** (`limit` + `offset`)
The API returns:
   - `items` (current page)
   - `total` (total number of results)

This enables scalable browsing of thousands of tracks without performance issues.

### Aggregated Analytics
The application provides precomputed analytics via a dedicated GraphQL query:

**Includes:**
- **Genre distribution**
   - Count of tracks per genre
- **Top tracks**
   - Based on popularity
- **Top artists**
   - Frequency + average popularity
- **Popularity buckets**
   - Tracks grouped into ranges (e.g. 0–20, 20–40, etc.)

## Data Aggregation Logic
Instead of rendering raw data only, the application uses aggregated metrics:

- Average values per bucket:
   - danceability
   - energy
   - tempo
   - acousticness
   - instrumentalness
This allows users to:
- Identify trends (e.g. “high popularity → higher energy”)
- Compare groups instead of individual tracks
- Explore patterns at scale

### Clustering
Tracks are grouped using **K-Means clustering** (`k = 3`) based on audio features.

Clusters are interpreted into user-friendly “vibes”, e.g.:
- Dancefloor ready
- Acoustic chill
- Festival banger

## Future Improvements
- Refresh tokens for auth
- Better error handling
- /me as a Graphql endpoint instead to avoid duplicate auth logic that could be handled all in the api
- User-specific saved filters

## Author
Smilla Sollén sollensmilla@gmail.com
