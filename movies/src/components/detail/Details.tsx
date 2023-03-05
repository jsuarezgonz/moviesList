import React, { useState } from "react";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import ExplicitIcon from "@mui/icons-material/Explicit";
import {
  Alert,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Rating,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DetailsPropsType from "./types";
import format from "date-fns/format";
import { Movie } from "../../common/types";

const GetColorForChip = (average: number | undefined) => {
  return average
    ? average < 5
      ? "error"
      : average >= 5 && average <= 7.5
      ? "warning"
      : "success"
    : "error";
};

const Details = ({
  isOpen,
  handleClose,
  movie,
  changeRating,
}: DetailsPropsType): JSX.Element => {
  const [open, setOpen] = useState(false);

  const rating = (value: number | null, movie: Movie | undefined) => {
    try {
      changeRating(value, movie);
      setOpen(true);
      handleClose();
    } catch (error) {
      console.log("error evaluando");
    }
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setOpen(false)}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          Se ha guardado tu puntuación!
        </Alert>
      </Snackbar>
      <Dialog maxWidth="md" open={isOpen} onClose={handleClose}>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">{movie?.title}</Typography>
            <>
              <Tooltip title="Nota media" placement="bottom">
                <Chip
                  label={movie?.vote_average ?? "--"}
                  color={
                    (movie && GetColorForChip(movie.vote_average)) ?? "error"
                  }
                />
              </Tooltip>
            </>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack direction="row" spacing={2}>
            <Paper>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                alt={movie?.poster_path}
                width="210"
              />
            </Paper>
            <Paper>
              <Stack spacing={4} alignItems="center" justifyContent="center">
                <Stack
                  spacing={2}
                  p={2}
                  textAlign="justify"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="h5">Overview</Typography>
                  <Typography variant="body1" color="text.secondary">
                    {movie?.overview}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={4} alignItems="center">
                  {movie && (
                    <Typography variant="body2">
                      {`Fecha de estreno:${format(
                        new Date(movie.release_date),
                        "dd/MM/yyyy"
                      )}`}
                    </Typography>
                  )}
                  {movie && movie.adult ? (
                    <Tooltip title="Adults" placement="bottom">
                      <ExplicitIcon fontSize="large" />
                    </Tooltip>
                  ) : (
                    <Tooltip title="All audiences" placement="bottom">
                      <FamilyRestroomIcon fontSize="large" />
                    </Tooltip>
                  )}
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Typography variant="body2">Valoración</Typography>
                <Rating
                  name="half-rating"
                  defaultValue={2.5}
                  precision={0.5}
                  onChange={(event, value) => rating(value, movie)}
                />
              </Stack>
            </Paper>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Details;
