import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = (): JSX.Element => {
  return (
    <Container>
      <h1>404 - Not Found!</h1>
      <Link to="/">Go Home</Link>
    </Container>
  );
};

export default NotFound;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
