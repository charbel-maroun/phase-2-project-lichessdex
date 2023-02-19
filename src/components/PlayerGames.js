// React-bootstrap components imports
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap'

// React-router-dom
import { Link } from 'react-router-dom'



const PlayerGames = ({ gamesID, playerName }) => {

// Use the player's game ids to render iframes for 4 newest games.
    const iframePlayerGames = gamesID.map((game) => {
        return (
            <div key={game.id} style={{ display: 'flex' }} className="justify-content-center">
            <Card key={game.id} style={{ width: '605px', margin: '4rem', paddingTop: "4px" }}>
                <iframe key={game.id} title='chessGame' src={`https://lichess.org/embed/game/${game.id}?theme=auto&bg=auto`} width="600" height="397" ></iframe>
                <Card.Body>
                    <Button  as={Link} to={`/savegameform/${game.id}`} variant='outline-dark'>Save Game</Button>
                </Card.Body>
            </Card>
            </div>

        )
    })

    return (
        <Col>
            <h1 id='player-games-title'>{playerName}'s Games</h1>
            {iframePlayerGames}
        </Col>
    )

}

export default PlayerGames;
