import { Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap'

const SavedGames = () => {
    const [savedGames, setSavedGames] = useState([])

    useEffect(() => {
        fetch('http://localhost:3004/post')

            .then(res => res.json())
            .then(data => {
                setSavedGames(data);
            })

    }, [])

    const games = savedGames.map((game) => {

        // Each card had inputed data and an iframe embed to play through chess game.
        return (
            <div style={{ display: 'flex' }} className="justify-content-center">
                <Card key={game.gameID} style={{ width: '605px', margin: '4rem', paddingTop: "4px" }}>
                    <iframe title='chessGame' src={`https://lichess.org/embed/game/${game.gameID}?theme=auto&bg=auto`} width="600" height="397"></iframe>

                    <Card.Body>
                        <Card.Title>{game.studiedPosition}</Card.Title>
                        <Card.Text>{game.notes}</Card.Text>
                    </Card.Body>
                </Card>
            </div>

        )
    })



    return (
        <>
            <Col>
                <h1 id='saved-games-title'>View, Analyze, and Play Through Your Favourite Games</h1>
                {games}
            </Col>
        </>

    )
}

export default SavedGames;