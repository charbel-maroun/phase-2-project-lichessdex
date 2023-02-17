import logo from './logo.svg';
import './App.css';

//React boostrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// React hooks imports
import { useState } from 'react';

// React - Router

import { Switch, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";




//Components imports
import TopBar from './components/TopBar';
import LiveChessTv from './components/LiveChessTv';
import TopFiveList from './components/TopFiveList';
import PlayerGames from './components/PlayerGames';
import TournamentData from './components/TournamentData';
import ChessTv from './components/ChessTv';
import PlayerProfile from './components/PlayerProfile';
import SavedGames from './components/SavedGames';
import TournamentChessBoard from './components/TournementChessBoard';
import SavePlayerGameForm from './components/SavePlayerGameForm';


const App = () => {
  const [playerData, setPlayerData] = useState({});
  const [gamesID, setGamesID] = useState([])
  const [boadcastRoundId, setBroadcastRoundId] = useState();
  const [broadcastRoundName, setBroadcastRoundName] = useState("");
  const [liveChessType, setLiveChessType] = useState("")

  const handleSelectedName = (userName) => {
    fetch(`https://lichess.org/api/user/${userName}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPlayerData(data);
      })
  }

  const handleShowPlayerGames = (playerName) => {

    // Data is in nd-json so need to convert to text, split intp array, exclude empty lines, then return needed data.

    let jsonData = [];
    fetch(`https://lichess.org/api/games/user/${playerName}?max=4`, {
      method: 'GET',
      headers: {
        'Accept': 'application/x-ndjson'
      },
    })
      .then(resp => {
        resp.text()
          .then(ndjson => {
            ndjson = ndjson.split("\n");
            ndjson.forEach(el => {
              if (el.length !== 0) {
                jsonData.push(JSON.parse(el));
              }
            });
            setGamesID(jsonData)
          });


      });

  }

  // Retrieve selected round name and ID from TournamentCard
  const handleSelectRound = (broadcastRoundID, broadcastRoundName) => {
    setBroadcastRoundId(broadcastRoundID)
    setBroadcastRoundName(broadcastRoundName)

  }

  const handleLiveChessType = (type) => {
    setLiveChessType(type)
  }

  return (
    <>
      <TopBar
        handleSelectedName={handleSelectedName}
        handleLiveChessType={handleLiveChessType}
      />
      <Container fluid>
        <Row>
          <Col xs={10} style={{ display: 'flex' }} className="justify-content-center">
            <LiveChessTv />

            <PlayerGames gamesID={gamesID} />

            <TournamentData handleSelectRound={handleSelectRound} />

            <ChessTv liveChessType={liveChessType} />

            <PlayerProfile playerData={playerData} handleShowPlayerGames={handleShowPlayerGames} />

            <SavedGames />

            <TournamentChessBoard broadcastRoundId={boadcastRoundId} broadcastRoundName={broadcastRoundName} />

            <SavePlayerGameForm />
          </Col>
          <Col xs={2}>
            <TopFiveList handleShowPlayerGames={handleShowPlayerGames} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
