// lichessPgnViewer is a module to display PGN chess data on an embeded chessboard
import lichessPgnViewer from 'https://cdn.jsdelivr.net/npm/lichess-pgn-viewer@1.5.5/+esm'

// React hooks imports
import { useEffect } from 'react';

// React-bootstrap components imports
import { Row } from 'react-bootstrap';

const TournamentChessBoard = ({ broadcastRoundId, broadcastRoundName }) => {

    useEffect(() => {
        if (broadcastRoundId !== undefined) {

            console.log(broadcastRoundId);
            fetch(`https://lichess.org/api/broadcast/round/${broadcastRoundId}.pgn`)
                .then(res => res.text())
                .then(data => {

                    // REGEX to seperate list and include event.
                    return data.split(/(?=\[Event)/)

                })
                .then(roundGamesData => {

                    // Clear Previous List
                    document.querySelector("#games-container").innerHTML = ""
                    // ----------------

                    roundGamesData.forEach((game) => {
                        const test2 = document.createElement("div")
                        test2.setAttribute("class", `lpv${roundGamesData.indexOf(game)} tournmanet-round-card`)

                        document.querySelector("#games-container").appendChild(test2)

                        lichessPgnViewer(
                            document.querySelector(`.lpv${roundGamesData.indexOf(game)}`), {
                            pgn: game,
                            // optional parameters go here

                        }
                        )
                       

                    })

                    document.querySelectorAll(".lpv__controls__goto--prev").innerText = "<"

                    console.log(document.querySelectorAll(".lpv__controls__goto--prev"));
                })

        }
    }, [broadcastRoundId])


    return (

        <Row>
            <h1 id="tournament-chess-boards">{broadcastRoundName}</h1>
            <div id='games-container' className='viewers'></div>
        </Row>




    )
}

export default TournamentChessBoard;
