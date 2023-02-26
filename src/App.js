// import logo from './logo.svg';
import './App.css';

//React boostrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// React hooks imports
import { useState, useEffect } from 'react';

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
import SavePlayerGameForm from './components/SavePlayerGamesForm';


const App = () => {
  const [playerData, setPlayerData] = useState({});
  const [gamesID, setGamesID] = useState([])
  const [boadcastRoundId, setBroadcastRoundId] = useState();
  const [broadcastRoundName, setBroadcastRoundName] = useState("");
  const [liveChessType, setLiveChessType] = useState("")
  const [playerName, setPlayerName] = useState("")




  // useHistory 
  const history = useHistory();



  // pass back player data from post
  const [savedGamesData, setSavedGamesData] = useState([]);

  // Fetch intitial saved games data

  useEffect(() => {
    fetch('http://localhost:3004/post')

        .then(res => res.json())
        .then(data => {
            setSavedGamesData(data);
        })

}, [])

  const handlePostData = (newPost) => {
    setSavedGamesData([...savedGamesData, newPost]);
  }
// 




  // handle delete game
  const handleDeleteGame = (id) =>{
    const updatedSavedGames = savedGamesData.filter(
      (game) => game.id !== id)
      setSavedGamesData(updatedSavedGames);
  }

  const handleLiveChessType = (type) => {
    setLiveChessType(type)
  }

  const handleSelectedName = (userName) => {
    fetch(`https://lichess.org/api/user/${userName}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPlayerData(data);
        history.push(`/user/${userName}`)
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
            setPlayerName(playerName)
          });


      });

  }

  // Retrieve selected round name and ID from TournamentCard
  const handleSelectRound = (broadcastRoundID, broadcastRoundName) => {
    setBroadcastRoundId(broadcastRoundID)
    setBroadcastRoundName(broadcastRoundName)

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

            <Switch>
              <Route exact path='/'>
                <LiveChessTv />
              </Route>

              <Route path="/tournaments/:name/:round">
                <TournamentChessBoard broadcastRoundId={boadcastRoundId} broadcastRoundName={broadcastRoundName} />
              </Route>


              <Route path='/tournaments'>
                <TournamentData handleSelectRound={handleSelectRound} />
              </Route>

              <Route path={`/playergames/:playername`}>
                <PlayerGames gamesID={gamesID} playerName={playerName} />
              </Route>

              <Route path='/user/:name'>
                <PlayerProfile playerData={playerData} handleShowPlayerGames={handleShowPlayerGames} />
              </Route>

              <Route exact path={`/chesstv`}>
                <ChessTv liveChessType={liveChessType} />
              </Route>

              <Route path="/savegameform/:id">
                <SavePlayerGameForm handlePostData={handlePostData}/>
              </Route>

              <Route exact path="/savedgames">
                <SavedGames savedGamesData={savedGamesData} handleDeleteGame={handleDeleteGame}/>
              </Route>

            </Switch>

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
