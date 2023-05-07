import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

export default function Header() {
  let navigate = useNavigate();
  let handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Nav>
            <Navbar.Brand href="#home">URL SHORTENER</Navbar.Brand>
          </Nav>
          <Nav>
            <Nav.Link href="/" onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
