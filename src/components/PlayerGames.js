// React-bootstrap components imports
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row } from 'react-bootstrap'

// React-router-dom
import { Link } from 'react-router-dom'



const PlayerGames = ({ gamesID }) => {

// Use the player's game ids to render iframes for 4 newest games.
    const iframePlayerGames = gamesID.map((game) => {
        return (
            <Card key={game.id} style={{ width: '625px', margin: '4rem', paddingTop: "4px" }}>
                <iframe key={game.id} title='chessGame' src={`https://lichess.org/embed/game/${game.id}?theme=auto&bg=auto`} width="600" height="397" ></iframe>
                <Card.Body>
                    <Button  as={Link} to={`/savegameform/${game.id}`} variant="primary">Save Game</Button>
                </Card.Body>
            </Card>

        )
    })

    return (
        <Row>
            {iframePlayerGames}
        </Row>
    )

}

export default PlayerGames;
