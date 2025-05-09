import React, { useContext } from "react";
import { Grid, Typography, Container } from "@mui/material";
import MovieCard from "./MovieCard";
import { MovieContext } from "../context/MovieContext";

const Favorites = () => {
  const { favorites } = useContext(MovieContext);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorites
      </Typography>
      {favorites.length === 0 ? (
        <Typography>No favorites yet—add some!</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;
