import React from "react";
import { MOVIE } from "../type";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Chip,
} from "@mui/material";

interface MyListProps {
  myList: MOVIE[];
}



const MyList: React.FC<MyListProps> = ({ myList }) => {

  return (
    <Grid container spacing={2}>
      {myList.length > 0 ? (
        myList.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardActionArea>
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
        ))
      ) : (
        <Typography variant="h6">No Information</Typography>
      )}
    </Grid>
  );
};

export default MyList;
