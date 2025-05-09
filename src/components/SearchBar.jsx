import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const SearchBar = ({ setSearchTerm }) => {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setSearchTerm(input);
    }
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", gap: 2 }}>
      <TextField
        label="Search Movies"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button type="submit" variant="contained">Search</Button>
    </Box>
  );
};

export default SearchBar;
