// React-bootstrap components imports

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

// React hooks imports

import { useState } from 'react';

const SavePlayerGameForm = () => {



    const [formData, setFormData] = useState({
        studiedPosition: "",
        notes: "",
        gameID: "",
      });

      const { studiedPosition, notes} = formData;

      const handleChange = (e) => {
        const {  name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const configObj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ ...formData}),
        };
    
        fetch("http://localhost:3000/post", configObj)
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
          });
      };
   
    return (

        <Container className="rounded mb-0 border border-dark" style={{height: "40rem"}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Studied Position</Form.Label>
                    <Form.Control name="studiedPosition" value={studiedPosition} onChange={handleChange} placeholder="Choose White or Black" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control name="notes" value={notes} onChange={handleChange} placeholder="Alternate Moves or Interesting Sequence" />
                </Form.Group>
                <Form.Group className="mb-3">
                <iframe  title='chessGame' src={`https://lichess.org/embed/game/?theme=auto&bg=auto`} width="600" height="397" ></iframe>
                <Form.Text name="" className="text-muted">
                        
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>

    );
}

export default SavePlayerGameForm;