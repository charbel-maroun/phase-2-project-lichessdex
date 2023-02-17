import logo from './logo.svg';
import './App.css';

// React hooks import
import { useState } from 'react';

//React boostrap css
import 'bootstrap/dist/css/bootstrap.min.css';

//components import
import TopBar from './components/TopBar';

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
    </>
  );
}

export default App;
