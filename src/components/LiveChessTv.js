// Use lichess iframe embed to view on going top rated game.

const LiveChessTv = () => {
    return (
        <div id='title-container'>
            <h1 id="title">Welcome to LiChessDex</h1>
            <p>Search for players, check out the top 5 players, watch live chess broadcasts, and MORE!</p>
            <iframe title="LiveChessTv" src="https://lichess.org/tv/frame?theme=brown&bg=dark" width="400px" height="444px" allowtransparency="true"></iframe>
        </div>




    )
}

export default LiveChessTv;