import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { MovieContext } from "../context/MovieContext";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const { addFavorite, favorites } = useContext(MovieContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,credits`
        );
        setMovie(res.data);
        setCast(res.data.credits.cast.slice(0, 6));
      } catch (err) {
        alert("Error loading movie details.");
      }
    };
    fetchDetails();
  }, [id]);

  if (!movie) {
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  }

  const isFav = favorites.some((m) => m.id === movie.id);

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </Card>
          <Button
            variant={isFav ? "outlined" : "contained"}
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => addFavorite(movie)}
          >
            {isFav ? "Saved" : "Add to Favorites"}
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {movie.title} ({movie.release_date.split("-")[0]})
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            ⭐ {movie.vote_average} | {movie.runtime} min
          </Typography>
          <Box sx={{ my: 2 }}>
            {movie.genres.map((g) => (
              <Button key={g.id} size="small" sx={{ mr: 1, mb: 1 }}>
                {g.name}
              </Button>
            ))}
          </Box>
          <Typography variant="body1" paragraph>
            {movie.overview}
          </Typography>
          {movie.videos.results.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Trailer</Typography>
              <Box
                component="iframe"
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                title="YouTube trailer"
                allowFullScreen
                sx={{ border: 0, mt: 2 }}
              />
            </Box>
          )}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Cast
            </Typography>
            <Grid container spacing={2}>
              {cast.map((actor) => (
                <Grid item key={actor.cast_id} xs={4} sm={3} md={2}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="180"
                      image={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                          : "/no-image.png"
                      }
                      alt={actor.name}
                    />
                    <CardContent>
                      <Typography variant="subtitle2">
                        {actor.name}
                      </Typography>
                      <Typography variant="caption">{actor.character}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MoviePage;
