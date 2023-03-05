import { Movie } from "../../common/types";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  movie: Movie | undefined;
  changeRating: (value: number | null, movie: Movie | undefined) => void;
};

export default Props;
