import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Container,
  CircularProgress,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import MovieCard from "./MovieCard";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const MovieGrid = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  // Fetch genres on load
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
        );
        setGenres(res.data.genres);
      } catch (err) {
        console.error("Failed to fetch genres", err);
      }
    };
    fetchGenres();
  }, []);

  // Fetch movies on filters/search change
  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [searchQuery, selectedGenre, selectedYear, selectedRating]);

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery, selectedGenre, selectedYear, selectedRating]);

  const fetchMovies = async () => {
    setLoading(true);
    setError("");

    try {
      const useSearch =
        searchQuery && !selectedGenre && !selectedYear && !selectedRating;

      const endpoint = useSearch
        ? "https://api.themoviedb.org/3/search/movie"
        : "https://api.themoviedb.org/3/discover/movie";

      const params = {
        api_key: API_KEY,
        page,
        query: useSearch ? searchQuery : undefined,
        with_genres: selectedGenre || undefined,
        primary_release_year: selectedYear || undefined,
        "vote_average.gte": selectedRating || undefined,
      };

      const res = await axios.get(endpoint, { params });
      const data = res.data;

      setMovies((prev) => [...prev, ...data.results]);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom align="center">
        Movies
      </Typography>

      {/* Filters */}
      <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap" mb={3}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            label="Genre"
          >
            <MenuItem value="">All</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Year"
          >
            <MenuItem value="">All</MenuItem>
            {Array.from({ length: 30 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Rating</InputLabel>
          <Select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            label="Rating"
          >
            <MenuItem value="">All</MenuItem>
            {[...Array(10)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {i + 1}+
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      {loading && page === 1 ? (
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
      ) : (
        <>
          <Grid container spacing={2}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>

          {loading && (
            <CircularProgress sx={{ display: "block", mx: "auto", mt: 3 }} />
          )}

          {page < totalPages && !loading && (
            <Box textAlign="center" mt={3}>
              <Button variant="contained" onClick={handleLoadMore}>
                Load More
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default MovieGrid;
