// React-bootstrap components import
import Card from 'react-bootstrap/Card';
import { Button, ButtonGroup } from 'react-bootstrap';

// React-router-dom
import { Link } from 'react-router-dom';


const PlayerCard = ({ id, username, title, rating, country, url, handleShowPlayerGames }) => {


    return (
        <div>
        <Card border="dark" style={{ borderRadius: 0}}>
            <Card.Body>
                <Card.Title>{username}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Rating {rating}</Card.Subtitle>
                <Card.Text>
                    Title: {title}
                    <br />
                    Country: {country}
                </Card.Text>
                <ButtonGroup>
                    <Button xs={6} variant='outline-dark' target="_blank" href={url}>Player Page</Button>
                    <Button xs={6} variant='outline-dark' as={Link} to={`/playergames/${username}`} onClick={() => handleShowPlayerGames(username)}>Player Games</Button>
                </ButtonGroup>

            </Card.Body>
        </Card>
        </div>
    );
}

export default PlayerCard;