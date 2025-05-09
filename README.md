
# 📽️ Movie Explorer – Discover Your Favorite Films

A movie browsing web application built using **React** that allows users to search, explore trending movies, view movie details, and manage favorites — all powered by the **TMDb API**.

---

## 🚀 Live Demo

🌐 [Live App Link (Netlify)](https://gobikatheesh-movie-explorer.netlify.app/)

---


## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Katheesh1224/movie-explorer.git
cd movie-explorer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a file named `.env` in the root folder with the following content:

```env
REACT_APP_TMDB_API_KEY=5e0291f4b2242dec71de488dfcb26219
```

Get your API key from [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

### 4. Start Development Server

```bash
npm start
```

---

## 🔧 Technologies Used

- ⚛️ React (with Context API for state management)
- 🔗 Axios (for API calls)
- 🎨 Material-UI (MUI for styling)
- 📦 Netlify (for deployment)
- 🗄️ Local Storage (for favorites and persistence)

---

## 🔍 Features Implemented

### ✅ Core Features

- [x] **User Login UI** (dummy/static UI)
- [x] **Search Bar** to find movies by name
- [x] **Movie Grid** with posters, titles, ratings, and release year
- [x] **Detailed Movie Page** (overview, genre, cast, trailer)
- [x] **Trending Movies** fetched from TMDb
- [x] **Light/Dark Mode Toggle**
- [x] **Load More Button** for paginated browsing
- [x] **Favorites List** (saved locally in browser)
- [x] **Genre / Year / Rating Filters**

### 🎁 Bonus Features

- [x] YouTube trailer embedded (via TMDb video API)
- [x] footer with TMDb credits
- [x] Fully mobile responsive

---

## 📡 API Usage

- `GET /search/movie` – for movie search
- `GET /trending/movie/day` – for trending movies
- `GET /movie/{movie_id}` – for detailed view
- `GET /genre/movie/list` – for genre filters
- `GET /movie/{movie_id}/videos` – for trailers
- `GET /movie/{movie_id}/credits` – for cast

All API requests are made using Axios, with the `5e0291f4b2242dec71de488dfcb26219` passed as a parameter.

---

## 💾 State & Storage

- **React Context API** manages global movie state
- **Local Storage**:
  - Last searched term
  - Favorite movies list

---

## 🧪 Testing & Deployment

- Tested on Chrome, Firefox, and mobile view
- Deployed using **[Netlify](https://netlify.com)**

---

## 📮 Feedback & Contribution

Feel free to open issues or submit merge requests via Github.

---

## 🛡️ Disclaimer

This project uses the TMDb API but is **not endorsed or certified by TMDb**.
