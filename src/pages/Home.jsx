import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("Avengers");

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ my: 3 }}>
        Movie Explorer
      </Typography>

      <SearchBar setSearchTerm={setSearchTerm} />

      <MovieGrid searchQuery={searchTerm} />
    </Container>
  );
};

export default Home;
