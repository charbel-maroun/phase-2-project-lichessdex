import { Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap'

const SavedGames = () => {
    const [savedGames, setSavedGames] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/post')

            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSavedGames(data);
            })

    }, [])

    const games = savedGames.map((game) => {

        // Each card had inputed data and an iframe embed to play through chess game.
        return (
            <Card key={game.gameID} style={{ width: '625px' , margin: '4rem', paddingTop: "4px"}}>
                <iframe title='chessGame' src={`https://lichess.org/embed/game/${game.gameID}?theme=auto&bg=auto`} width="600" height="397"></iframe>

                <Card.Body>
                    <Card.Title>{game.studiedPosition}</Card.Title>
                    <Card.Text>{game.notes}</Card.Text>
                </Card.Body>
            </Card>


        )
    })



    return (
        <Row>
            {games}
        </Row>
    )
}

export default SavedGames;