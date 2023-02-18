
// lichessPgnViewer is a module to display PGN chess data on an embeded chessboard
import lichessPgnViewer from 'https://cdn.jsdelivr.net/npm/lichess-pgn-viewer@1.5.5/+esm'

// React hooks imports
import { useEffect } from 'react';

// React-bootstrap components imports
import { Col } from 'react-bootstrap'



const ChessTv = ({ liveChessType }) => {


    console.log(liveChessType.toLowerCase());

    let controller = new AbortController();



    const dataFunc = () => {


        fetch(`https://lichess.org/api/tv/${liveChessType.toLowerCase()}?nb=4`,
            { signal: controller.signal })
            .then(res => res.text())
            .then(data => {
                // Data is return as PGN converted to text.
                // REGEX to seperate list and include event.
                return data.split(/(?=\[Event)/)

            })
            .then(roundGamesData => {

                // Clear Previous List
                document.querySelector("#live-container").innerHTML = ""
                // ----------------

                roundGamesData.forEach((game) => {

                    // Create element to populate with chessboard widget.
                    const chessElement = document.createElement("div")

                    // Set attributes so lichessPgnViewer can select element.
                    chessElement.setAttribute("class", `lpv${roundGamesData.indexOf(game)}`)


                    document.querySelector("#live-container").appendChild(chessElement)

                    lichessPgnViewer(
                        document.querySelector(`.lpv${roundGamesData.indexOf(game)}`), {
                        pgn: game,
                        initialPly: "last",
                        showControls: false,
                        showMoves: false,
                        scrollToMove: false,
                        drawArrows: true,
                        showClocks: false,

                    }
                    )

                    // When widget is clicked a new tab with the game loaded on Lichess.com is opened.
                    document.querySelector(`.lpv${roundGamesData.indexOf(game)}`).addEventListener("click", () => {
                        window.open(game.slice(game.indexOf("https://lichess.org/"), game.indexOf("https://lichess.org/") + 28), '_blank');

                    })

                })
                setTimeout(dataFunc, 500)

            }

            )
            .catch(() => {
                if (controller.signal.aborted) {
                    console.log('The user aborted the request');
                } else {
                    console.error('The request failed');
                }
            })
    }


    // Data is fetched continuously. To stop when new game type is selected, and AbortController is used.

    useEffect(() => {
        dataFunc()

        return () => {
            controller.abort();
        };

    }, [liveChessType])






    return (
        <Col>
            <h1 id="live-chess-title">{liveChessType}</h1>
            <p id='live-chess-info'>Click On A Game To Go To Lichess Page</p>
            <div id='live-container' className='viewers'></div>
        </Col>





    )


}

export default ChessTv;
