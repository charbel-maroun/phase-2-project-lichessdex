import logo from './logo.svg';
import './App.css';

//React boostrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// React hooks imports
import { useState } from 'react';


//Components imports
import TopBar from './components/TopBar';
import LiveChessTv from './components/LiveChessTv';

const App = () => {
  const [playerData, setPlayerData] = useState({});

  const handleSelectedName = (userName) => {
    // setSelectedName(userName)

    fetch(`https://lichess.org/api/user/${userName}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPlayerData(data);
      })
  }
  return (
    <>
    <TopBar handleSelectedName={handleSelectedName}/>
    <Container fluid>
      <Row>
        <Col>
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default App;
