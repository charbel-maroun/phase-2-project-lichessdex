import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

// React components import
import SearchPlayer from './SearchPlayer';


const TopBar = ({handleSelectedName, handleLiveChessType }) => {

       
    return (
        <Navbar bg="light" expand="sm" className="mb-3">
            <Container fluid>
                <Navbar.Brand>LiChessDex</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                            Offcanvas
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>

                        <Nav className="flex-grow-1 pe-3">
                        <SearchPlayer handleSelectedName={handleSelectedName} />
                            <Nav.Link>Home</Nav.Link>
                            <Nav.Link>Tournaments</Nav.Link>
                            <Nav.Link>Saved Games</Nav.Link>
                            <NavDropdown
                                title="LiChess TV"
                                id={`offcanvasNavbarDropdown-expand-lg`}
                            >
                                <NavDropdown.Item onClick={e => handleLiveChessType(e.target.textContent)}>Classical</NavDropdown.Item>
                                
                                <NavDropdown.Item onClick={e => handleLiveChessType(e.target.textContent)}>
                                    Blitz
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={e => handleLiveChessType(e.target.textContent)}>
                                    Chess960
                                </NavDropdown.Item>
                            
                            </NavDropdown>
                        </Nav>

                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default TopBar;