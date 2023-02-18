// React hooks imports
import { useEffect, useState } from "react";

// React-bootstrap imports
import { Row } from "react-bootstrap";

// React components imports
import TournamentCard from "./TournamentCard";

const TournamentData = ({ handleSelectRound }) => {

    const [data, setData] = useState([]);


    useEffect(() => {
        let jsonData = [];

        // Data is in nd-json so need to convert to text, split intp array, exclude empty lines, then return needed data.

        fetch("https://lichess.org/api/broadcast?nb=5")
            .then(resp => {

                resp.text()
                    .then(ndjson => {
                        ndjson = ndjson.split("\n");
                        ndjson.forEach(el => {
                            if (el.length !== 0) {
                                jsonData.push(JSON.parse(el));
                            }
                        });
                        setData(jsonData)
                    });
            });
    }, [])

    const tournamentCards = data.map(({ tour, rounds }) => {
        return (
            <TournamentCard
                key={tour.id}
                name={tour.name}
                description={tour.description}
                url={tour.url}
                markup={tour.markup}
                rounds={rounds}
                handleSelectRound={handleSelectRound}
            />
        )
    })

    return (

        <Row style={{display:'flex'}} className="justify-content-center">
            <h1 id="tournaments-title">Tournaments</h1>
            {tournamentCards}



        </Row>

    )



}

export default TournamentData;