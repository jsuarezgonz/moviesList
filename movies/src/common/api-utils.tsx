import axios from "axios";
import {
  API_KEY,
  GUESTSESSIONURL,
  MOVIESURL,
  RATEMOVIEURL,
  SEARCHMOVIESURL,
} from "./config";
import { MoviesResponse } from "./types";

export const getMovies = async (): Promise<MoviesResponse> => {
  try {
    const { data } = await axios.get(`${MOVIESURL}?api_key=${API_KEY}`, {});
    return data;
  } catch (error) {
    throw new Error("error");
  }
};

export const searchMovie = async (title: string): Promise<MoviesResponse> => {
  if (title === "") return getMovies();

  try {
    const { data } = await axios.get(
      `${SEARCHMOVIESURL}?api_key=${API_KEY}&query=${title}`,
      {}
    );
    return data;
  } catch (error) {
    throw new Error("error");
  }
};

const getGuestSessionId = async (): Promise<string> => {
  try {
    const { data } = await axios.get(
      `${GUESTSESSIONURL}?api_key=${API_KEY}`,
      {}
    );
    return data.guest_session_id;
  } catch (error) {
    throw new Error("error");
  }
};

export const rateMovie = async (
  movieId: number | undefined,
  rate: number | null
) => {
  try {
    const guestSessionId = await getGuestSessionId();

    const payload = {
      value: rate,
    };
    return await axios.post(
      `${RATEMOVIEURL}${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`,
      payload
    );
  } catch (error) {
    throw new Error("error");
  }
};
