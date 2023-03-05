import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Stack,
  Tooltip,
} from "@mui/material";
import MovieCardPropsType from "./types";
import format from "date-fns/format";

const MovieCard = ({ movie, onClick }: MovieCardPropsType): JSX.Element => {
  return (
    <>
      <Card sx={{ backgroundColor: "#1d97be" }}>
        <CardActionArea
          onClick={() => {
            onClick(movie);
          }}
        >
          <CardMedia
            component="img"
            alt={movie.title}
            sx={{ minHeight: 520.5 }}
            image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          />
        </CardActionArea>
        <CardContent>
          <Tooltip title={movie.title} placement="top">
            <Typography variant="h5" gutterBottom noWrap>
              {movie.title}
            </Typography>
          </Tooltip>
          <Stack direction="row" spacing={2}>
            <Typography
              sx={{ fontWeight: 600 }}
              variant="subtitle1"
              gutterBottom
            >
              Fecha de estreno:
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {format(new Date(movie.release_date), "dd/MM/yyyy")}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
export default MovieCard;
