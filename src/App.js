import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import Favorites from "./components/Favorites";

function App() {
  const savedMode = localStorage.getItem("themeMode") || "light";
  const [mode, setMode] = useState(savedMode);

  const theme = createTheme({ palette: { mode } });

  const toggleMode = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem("themeMode", next);
  };

  const PrivateRoute = ({ children }) =>
    localStorage.getItem("user") ? children : <Navigate to="/" />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MovieProvider>
        <Router>
          <Header mode={mode} toggleMode={toggleMode} />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <PrivateRoute>
                  <MoviePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;
