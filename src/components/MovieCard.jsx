import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Grid item xs={6} sm={4} md={3} onClick={handleClick} style={{ cursor: "pointer" }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h6">{movie.title}</Typography>
          <Typography variant="body2">{movie.release_date?.split("-")[0]}</Typography>
          <Typography variant="body2">⭐ {movie.vote_average}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MovieCard;
