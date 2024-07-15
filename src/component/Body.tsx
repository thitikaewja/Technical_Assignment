import { MOVIE } from "../type";
import { useState, useMemo } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Chip,
  Modal,
  Box,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  movies: MOVIE[];
  searchValue: string;
  setMyList: React.Dispatch<React.SetStateAction<MOVIE[]>>;
}

const Body: React.FC<Props> = ({ movies, searchValue, setMyList }) => {
  const [open, setOpen] = useState(false);
  const [movieId, setMovieId] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleOpen = (id: number) => {
    setOpen(true);
    setMovieId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRatingClick = (
    event: React.MouseEvent<HTMLElement>,
    movie: MOVIE
  ) => {
    event.stopPropagation();

    setMyList((prevList) => {
      return [...prevList, movie];
    });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const filteredMovies = useMemo(() => {
    if (!searchValue || searchValue === "Categories" || searchValue === "All") {
      return movies;
    }

    const filtered = movies.filter((movie) => {
      if (movie.category.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      if (movie.name.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      if (movie.year.includes(searchValue)) {
        return true;
      }
      return false;
    });

    return filtered;
  }, [movies, searchValue]);

  return (
    <>
      {showAlert && (
        <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 10000 }}>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Here is a gentle confirmation that your action was successful.
          </Alert>
        </Box>
      )}
      <Grid container spacing={2}>
        {filteredMovies && filteredMovies.length > 0 ? (
          <>
            {filteredMovies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardActionArea
                    onClick={() => handleOpen(movie.id)}
                    sx={{ position: "relative" }}
                  >
                    <CardMedia
                      component="img"
                      height="300"
                      image={movie.pic}
                      alt={movie.name}
                      sx={{
                        height: "100%",
                        maxHeight: "300px",
                        objectFit: "cover",
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, height: "60px" }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {movie.name}
                      </Typography>
                      <Rating
                        name="customized-10"
                        defaultValue={0}
                        max={1}
                        onClick={(event) => handleRatingClick(event, movie)}
                        sx={{
                          position: "absolute",
                          top: "66%",
                          right: 5,
                          zIndex: 999,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Year: {movie.year}
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {movie.category.split(",").map((category, index) => (
                          <span key={index}>
                            <Chip
                              label={category.trim()}
                              color="primary"
                              style={{ margin: "2px", fontSize: "10px" }}
                            />
                          </span>
                        ))}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </>
        ) : (
          <>
            <Box sx={{ p: 2 }}>
              <Grid container justifyContent="center">
                <Typography variant="h6">No Information</Typography>
              </Grid>
            </Box>
          </>
        )}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            color: "black",
            width: { md: "60vh" },
            // maxWidth: "90vw",
            height: "70vh",
            maxHeight: "70vh",
          }}
        >
          {movieId !== null && (
            <>
              <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom:" 10px"}}>
                <CloseIcon
                  onClick={handleClose}
                  sx={{ cursor: "pointer", width: 30, height: 30 }}
                />
              </Box>
              {movieId !== null &&
              movies.find((movie) => movie.id === movieId) ? (
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ width: " 200px", height: "auto" }}>
                      <img
                        src={movies.find((movie) => movie.id === movieId)?.pic}
                        alt={movies.find((movie) => movie.id === movieId)?.name}
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginBottom: "0px",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                          mr: 1, // Add margin between name and year
                          color: "#b26500",
                          fontWeight: 800,
                          fontSize: { xs: 16, md: 20 },
                        }}
                      >
                        {movies.find((movie) => movie.id === movieId)?.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#b2a300",
                          fontWeight: 800,
                          fontSize: { xs: 16, md: 20 },
                        }}
                      >
                        - {" "}
                        {movies
                          .find((movie) => movie.id === movieId)
                          ?.year.toUpperCase()}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: { xs: 2, md: 2 },
                        color: "#b26500",
                        fontWeight: 800,
                        fontSize: 15,
                      }}
                    >
                      Synopsis
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: 15,
                        maxHeight: "150px",
                        overflowY: "auto", // Enable vertical scroll if content exceeds maxHeight
                      }}
                    >
                      {
                        movies.find((movie) => movie.id === movieId)
                          ?.description
                      }
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Typography variant="body1">No Information</Typography>
              )}
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Body;
