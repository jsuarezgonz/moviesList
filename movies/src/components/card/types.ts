import { Movie } from "../../common/types";
type Props = {
  movie: Movie;

  onClick: (movie: Movie) => void;
};

export default Props;
