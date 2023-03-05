/* eslint-disable no-restricted-globals */
import { render, fireEvent, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";
const MovieMock = {
  poster_path:
    "https://image.tmdb.org/t/p/original/wigZBAmNrIhxp2FNGOROUAeHvdh.jpg",
  adult: false,
  overview:
    "From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences.",
  release_date: "2016-08-03",
  genre_ids: [14, 28, 80],
  id: 297761,
  original_title: "Suicide Squad",
  original_language: "en",
  title: "Suicide Squad",
  backdrop_path: "/ndlQ2Cuc3cjTL7lTynw6I4boP4S.jpg",
  popularity: 48.261451,
  vote_count: 1466,
  video: false,
  vote_average: 5.91,
};
describe("MovieCard tests", () => {
  test("Renders correctly", () => {
    const handleCardClicked = jest.fn();
    render(<MovieCard movie={MovieMock} onClick={handleCardClicked} />);
    expect(screen.getByText("Suicide Squad")).toBeTruthy();
  });
  test("Renders correctly and calls correct function on click with correct parameters", () => {
    const handleCardClicked = jest.fn();
    render(<MovieCard movie={MovieMock} onClick={handleCardClicked} />);
    fireEvent.click(screen.getByRole("img"));
    expect(handleCardClicked).toHaveBeenCalled();
    expect(handleCardClicked).toHaveBeenCalledWith(MovieMock);
  });
});
