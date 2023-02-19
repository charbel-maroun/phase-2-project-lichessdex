import PlayerCard from "./PlayerCard";

const PlayerProfile = ({playerData, handleShowPlayerGames}) => {
    console.log(playerData.perfs.classical.rating);

    const { id, username, title, perfs, profile, url} = playerData


    // Convert two letter country code to country name
    const regionNames = new Intl.DisplayNames(
        ['en'], { type: 'region' });


        // If statement because some player data is missing and caused errors
    if (profile === undefined || profile.country === undefined || profile.country.length > 2) {
        return (
            <PlayerCard
                key={id} s
                username={username}
                title={typeof title === String ? title : "No Title"}
                rating={perfs.classical.rating}
                country={"Not Available"}
                url={url}
                handleShowPlayerGames={handleShowPlayerGames}
            />
        )
    }
    else {

        return (

            <PlayerCard
                key={id}
                username={username}
                title={typeof title === String ? title : "No Title"}
                rating={perfs.classical.rating}
                country={regionNames.of(profile.country.slice(-2))}
                url={url}
                handleShowPlayerGames={handleShowPlayerGames}
            />)
    }

}

export default PlayerProfile;