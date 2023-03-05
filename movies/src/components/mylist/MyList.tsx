import {
  Box,
  Container,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useMoviesContext } from "../../context/moviesProvider";
import { Movie } from "../../common/types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const MyList = (): JSX.Element => {
  const { myList } = useMoviesContext();
  return (
    <Box sx={{ backgroundColor: "#1d97be", height: "100vh" }} p={5}>
      <Link to="/">Home</Link>
      <Container sx={{ mt: 14 }}>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Título</StyledTableCell>
                <StyledTableCell align="center">Tu puntuación</StyledTableCell>
                <StyledTableCell align="center">
                  Puntuacion media
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myList.map((movie: Movie) => (
                <TableRow
                  key={movie.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell align="center">
                    {movie.title}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {movie.my_vote}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {movie.vote_average}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};
export default MyList;
