import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 6,
        py: 5,
        px: 2,
        backgroundColor: "#1c1c1c",
        color: "#fff",
        textAlign: "center",
        // position: "sticky",
        // bottom: 0,
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Movie Explorer. All rights reserved.
      </Typography>
      <Typography variant="body2" mt={1}>
        Data provided by{" "}
        <Link
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="always"
        >
          TMDb
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
