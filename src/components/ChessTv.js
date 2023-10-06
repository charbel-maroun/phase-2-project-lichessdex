import React, { useEffect, useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

import { Col } from 'react-bootstrap';

const ChessTv = ({ liveChessType }) => {
    const [games, setGames] = useState([]);

    let controller = new AbortController();

    const dataFunc = async () => {
        try {
            const response = await fetch(`https://lichess.org/api/tv/${liveChessType.toLowerCase()}?nb=4`, { signal: controller.signal });
            const data = await response.text();
            const roundGamesData = data.split(/(?=\[Event)/);
            setGames(roundGamesData);
            setTimeout(dataFunc, 500);
        } catch (error) {
            if (controller.signal.aborted) {
                // console.log('The user aborted the request');
            } else {
                console.error('The request failed');
            }
        }
    };

    useEffect(() => {
        dataFunc();
        return () => controller.abort();
    }, [liveChessType]);

    return (
        <Col>
            <h1 id="live-chess-title">{liveChessType}</h1>
            <p id='live-chess-info'>Click On A Game To Go To Lichess Page</p>
            <div id='live-container' className='viewers'>
                {games.map((game, index) => {
                    const chessInstance = new Chess();
                    chessInstance.loadPgn(game); // Corrected here
                    const fen = chessInstance.fen();

                    return (
                        <div key={index} onClick={() => window.open(game.slice(game.indexOf("https://lichess.org/"), game.indexOf("https://lichess.org/") + 28), '_blank')}>
                            <Chessboard position={fen} />
                        </div>
                    );
                })}
            </div>
        </Col>
    );
};

export default ChessTv;
