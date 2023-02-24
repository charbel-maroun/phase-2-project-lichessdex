// React-bootstrap components imports

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

// React hooks imports

import { useState } from 'react';

// React-router-dom
import { useParams } from 'react-router-dom'

import { useHistory } from 'react-router-dom'



const SavePlayerGameForm = ({handlePostData}) => {

    const params = useParams();

    const history = useHistory();

    const [formData, setFormData] = useState({
        studiedPosition: "",
        notes: "",
        gameID: params.id,
    });

    const { studiedPosition, notes } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
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
            body: JSON.stringify({ ...formData }),
        };

        fetch("http://localhost:3004/post", configObj)
            .then((resp) => resp.json())
            .then((newPost) => {
                handlePostData(newPost)
                history.push("/savedgames")
            });
    };

    return (

        <Container className="rounded mb-0 border border-dark" style={{ height: "40rem" }}>
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
                    <iframe title='chessGame' src={`https://lichess.org/embed/game/${params.id}?theme=auto&bg=auto`} width="600" height="397" ></iframe>
                    <Form.Text name="" className="text-muted">
                        ID: {params.id}
                    </Form.Text>
                </Form.Group>
                <Button variant='outline-dark' type="submit">
                    Submit
                </Button>
            </Form>
        </Container>

    );
}

export default SavePlayerGameForm;