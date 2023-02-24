import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import { Col } from 'react-bootstrap'



const SavedGames = ({postData, handleDeleteGame}) => {

    const onDeleteClick = (id) => {
        fetch('http://localhost:3004/post/' + id, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(() => {
                handleDeleteGame(id)
            })
    }

    const games = postData.map((game) => {

        // Each card had inputed data and an iframe embed to play through chess game.
        return (
            <div key={game.gameID} style={{ display: 'flex' }} className="justify-content-center">
                <Card key={game.gameID} style={{ width: '605px', margin: '4rem', paddingTop: "4px" }}>
                    <iframe title='chessGame' src={`https://lichess.org/embed/game/${game.gameID}?theme=auto&bg=auto`} width="600" height="397"></iframe>

                    <Card.Body>
                        <Card.Title>{game.studiedPosition}</Card.Title>
                        <Card.Text>{game.notes}</Card.Text>
                        <Button variant='outline-dark' onClick={() => onDeleteClick(game.id)}>Delete</Button>
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