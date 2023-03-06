import React, { useState } from "react";
import { Alert, Box, Container, Grid, TextField } from "@mui/material";
import styled from "styled-components";
import MovieCard from "../card/MovieCard";
import Details from "../detail/Details";
import { Search } from "@mui/icons-material";
import { Movie } from "../../common/types";
import useMovies from "../../hook/useMovies";
import { Link } from "react-router-dom";

const MoviesGrid = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const { isLoading, listOfMovies, findMovie, errorMessage, changeRating } =
    useMovies();

  const handleCardClicked = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleInputOnBlur = async (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    findMovie(event.target.value);
  };

  return (
    <>
      {(isLoading && <LoadingBackground />) || (
        <Box p={5}>
          <Link to="/mylist">Mi lista de peliculas</Link>
          <Container maxWidth="lg">
            <SearchContainer>
              <Box
                sx={{
                  display: "flex",
                  p: 6,
                  width: 1 / 2,
                  alignItems: "center",
                }}
              >
                <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth
                  onBlur={handleInputOnBlur}
                  id="input-with-sx"
                  helperText="Introduce un título"
                  label="Buscar"
                  variant="standard"
                />
              </Box>
            </SearchContainer>
            {(errorMessage !== "" && (
              <Container maxWidth="md">
                <Alert severity="error">{errorMessage}</Alert>
              </Container>
            )) || (
              <Grid container spacing={3}>
                {listOfMovies?.map((movie) => {
                  return (
                    <Grid item xs={4} key={movie.id}>
                      <MovieCard movie={movie} onClick={handleCardClicked} />
                    </Grid>
                  );
                }) || (
                  <Container maxWidth="md">
                    <Alert severity="info">No se encontraron resultados.</Alert>
                  </Container>
                )}
              </Grid>
            )}
          </Container>
        </Box>
      )}
      {isOpen && (
        <Details
          isOpen={isOpen}
          handleClose={handleClose}
          movie={selectedMovie}
          changeRating={changeRating}
        />
      )}
    </>
  );
};
const LoadingBackground = styled.div`
  background-color: #000000cc;
  width: 100%;
  height: 100%;
  position: fixed;
`;
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export default MoviesGrid;
