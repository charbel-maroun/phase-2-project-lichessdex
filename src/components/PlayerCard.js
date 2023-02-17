import Card from 'react-bootstrap/Card';
import { Button, ButtonGroup } from 'react-bootstrap';


const PlayerCard = ({ id, username, title, rating, country, url, handleShowPlayerGames}) => {


  return (
    <Card border="dark" style={{borderRadius: 0, height: "13rem"}}>
      <Card.Body>
        <Card.Title>{username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Rating {rating}</Card.Subtitle>
        <Card.Text>
          Title: {title}
          <br/>
          Country: {country}
        </Card.Text>
        <ButtonGroup>
        <Button xs={6}  variant='outline-dark' target="_blank" href={url}>Player Page</Button>
        <Button xs={6} variant='outline-dark'onClick={ () => handleShowPlayerGames(username)}>Player Games</Button>
        </ButtonGroup>

      </Card.Body>
    </Card>
  );
}

export default PlayerCard;