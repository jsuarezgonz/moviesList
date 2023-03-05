import { useState, useEffect } from "react";
import { getMovies, rateMovie, searchMovie } from "../common/api-utils";
import { Movie, MoviesResponse } from "../common/types";
import { useMoviesContext } from "../context/moviesProvider";

export const updateLocalStorage = (list: Movie[]) => {
  window.localStorage.setItem("myList", JSON.stringify(list));
};
const useMovies = () => {
  const [listOfMovies, setListOfMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const [errorMessage, setErrorMessage] = useState("");
  const { dispatch } = useMoviesContext();

  useEffect(() => {
    const fetchMovies = async () => {
      let moviesResponse: MoviesResponse;
      try {
        moviesResponse = await getMovies();
        setIsLoading(false);
        setListOfMovies(moviesResponse.results);
      } catch (err) {
        setIsLoading(false);
        setErrorMessage(
          "Se ha producido un error en la obtención de las películas"
        );
      }
    };
    fetchMovies();
  }, []);

  const findMovie = async (title: string): Promise<void> => {
    try {
      const moviesResponse = await searchMovie(title);
      setListOfMovies(moviesResponse.results);
    } catch (err) {
      setErrorMessage("Se ha producido un error buscando la película");
    }
  };

  const changeRating = async (
    value: number | null,
    movie: Movie | undefined
  ): Promise<void> => {
    await rateMovie(movie?.id, value);
    if (movie) movie.my_vote = value;

    dispatch({
      type: "ADD_MOVIE",
      value: movie,
    });
  };

  const selectingMovie = (movie: Movie): void => {
    setSelectedMovie(movie);
  };

  const getSelectedMovie = (): Movie | undefined => {
    return selectedMovie;
  };

  return {
    isLoading,
    listOfMovies,
    findMovie,
    errorMessage,
    selectedMovie,
    selectingMovie,
    changeRating,
    getSelectedMovie,
  };
};

export default useMovies;
