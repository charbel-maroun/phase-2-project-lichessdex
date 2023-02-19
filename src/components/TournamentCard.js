// Bootstrap components imports
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

// React-router-dom
import { useHistory } from 'react-router-dom';


const TournamentCard = ({ name, description, url, rounds, markup, handleSelectRound }) => {


    // Use tournament data and seperate into already played rounds, and upcoming rounds

    const history = useHistory();

    let finishedGames = [];
    let unFinishedGames = [];

    rounds.forEach((round) => {
        if (round.finished === true) {
            finishedGames.push(
                <option key={round.id} value={round.id}>{round.name}</option>
            )
        } else {
            unFinishedGames.push(
                <option key={round.id} value={round.id}>{round.name}</option>
            )
        }
    })


    const onChangeRound = (roundID, roundName) => {
        handleSelectRound(roundID, roundName)
        history.push(`/tournaments/${name}/${roundID} `)

    }



    return (
        <Card style={{ width: '26rem', margin: '2rem' }}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
            <Card.Text>
                {/* To remove html tags from text */}
                {markup.replace(/<\/?[^>]+(>|$)/g, ""). slice(0,200)}...
            </Card.Text>
            <Card.Link target="_blank" href={url}>View Tournament</Card.Link>
            <Card.Body>

                <Container>
                    <Row>
                        <Col>
                            <h6>Finished Games</h6>
                            <Form.Select
                                style={{ width: "9rem" }}

                                // To retrieve the selected options name.
                                onChange={e => { onChangeRound(e.target.value, e.target.options[e.target.selectedIndex].text) }}
                            >
                                {finishedGames}
                            </Form.Select>
                        </Col>
                        <Col>
                            <h6>Upcoming Games</h6>
                            <Form.Select
                                aria-label="Default select example"
                                style={{ width: "9rem" }}
                            // onChange={e => onChangeRound(e.target.value)}
                            >
                                {unFinishedGames}
                            </Form.Select></Col>

                    </Row></Container>

            </Card.Body>
        </Card>
    );
}

export default TournamentCard;



