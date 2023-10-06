import React, { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { Row, Button, Col } from 'react-bootstrap';

const TournamentChessBoard = ({ broadcastRoundId, broadcastRoundName }) => {
    const [games, setGames] = useState([]);
    const [currentMoves, setCurrentMoves] = useState([]);

    useEffect(() => {
        if (broadcastRoundId !== undefined) {
            fetch(`https://lichess.org/api/broadcast/round/${broadcastRoundId}.pgn`)
                .then(res => res.text())
                .then(data => data.split(/(?=\[Event)/))
                .then(roundGamesData => {
                    setGames(roundGamesData);
                    setCurrentMoves(new Array(roundGamesData.length).fill(0));
                });
        }
    }, [broadcastRoundId]);

    const handlePrevMove = (index, history) => {
        setCurrentMoves(prev => {
            const newMoves = [...prev];
            newMoves[index] = Math.max(newMoves[index] - 1, 0);
            return newMoves;
        });
    }

    const handleNextMove = (index, history) => {
        setCurrentMoves(prev => {
            const newMoves = [...prev];
            newMoves[index] = Math.min(newMoves[index] + 1, history.length - 1);
            return newMoves;
        });
    }

    return (
        <Col>
            <h1 id="tournament-chess-boards">{broadcastRoundName}</h1>
            <Row id='games-container' className='viewers'>
                {games.map((game, index) => {
                    const chessInstance = new Chess();
                    chessInstance.loadPgn(game); // Corrected here
                    const history = chessInstance.history();
                    chessInstance.loadPgn(history.slice(0, currentMoves[index]).join(' '));
                    const fen = chessInstance.fen();

                    return (
                        <div key={index}>
                            <Chessboard position={fen} width={450} />
                            
                            <div>
                                Moves: {history.join(' ')}
                            </div>

                            <div>
                                <Button onClick={() => handlePrevMove(index, history)}>Previous</Button>
                                <Button onClick={() => handleNextMove(index, history)}>Next</Button>
                            </div>

                            <div>
                                Current Move: {history[currentMoves[index]] || ''}
                            </div>
                        </div>
                    );
                })}
            </Row>
        </Col>
    );
};

export default TournamentChessBoard;
