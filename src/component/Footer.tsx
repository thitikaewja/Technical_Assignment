import { Box, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        bgcolor: "black",
        p: 2,
        boxShadow: 1,
        textAlign: "center",
        color: "white",
      }}
    >
      <Typography variant="body1">
        Contact - Email:{" "}
        <Link href="mailto:thitikawja9@gmail.com" underline="hover" color="inherit">
          thitikawja9@gmail.com
        </Link>{" "}
        - Tel:{" "}
        <Link href="tel:+66979927517" color="inherit">
          097-9927517
        </Link>{" "}
        - LinkedIn:{" "}
        <Link
          href="https://www.linkedin.com/in/thiti-gaewja-64597a198/"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          underline="hover"
        >
          Thiti Gaewja
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
