// React hooks import
import { useState, useEffect } from "react";

// Bootstrap components import
import { Stack } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";


// 
import PlayerCard from "./PlayerCard";
import SelectListType from "./SelectListType";

const TopFiveList = ({handleShowPlayerGames}) => {

    // Initial type is set to blitz
    const [type, setType] = useState('blitz')

    const [topFiveDetails, setTopFiveDetails] = useState([])


    const handleChangeType = (changeType) => {
        setType(changeType)
    }

    // Top convert to letter country code to country name
    const regionNames = new Intl.DisplayNames(
        ['en'], { type: 'region' });


    useEffect(() => {
        // Fetch the leaderboard data
        fetch('https://lichess.org/api/player')
            .then(res => res.json())
            .then(data => {
                const list = [];
                data[type].slice(0, 5).forEach(({ username }) => {
                    list.push(username)
                })
                // Select only the 5 top players in the list.
                return list;
            })
            .then(async (data) => {
                // Use player usernames to fetch their profile
                const userData = await Promise.all(
                    data.map((username) => {
                        return (
                            fetch(`https://lichess.org/api/user/${username}`)
                                .then(res => res.json())
                                .then(data => { return data })
                        )
                    })
                )
                return userData;


            })
            .then(data => {

                // Pass data to the PlayerCard component
                return (data.map(({ id, username, title, perfs, profile, url }) => {
                    if (profile === undefined || profile.country === undefined || profile.country.length > 2) {
                        return (
                            <PlayerCard
                                key={id} s
                                username={username}
                                title={title}
                                rating={perfs[type].rating}
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
                                rating={perfs[type].rating}
                                country={regionNames.of(profile.country.slice(-2))}
                                url={url}
                                handleShowPlayerGames={handleShowPlayerGames}
                            />)
                    }

                })
                )
            })
            .then(data => {
                setTopFiveDetails(data)
            })



    }, [type])


    return (

        <Stack>
            <Col>
                <Card border="dark" style={{borderRadius: 0, padding: "1rem"}}>
                    <h1 className="leaderboard-font">TOP FIVE!</h1>
                    <SelectListType handleChangeType={handleChangeType} />
                </Card>
            </Col>
            <Col>
            {topFiveDetails}
            </Col>
        </Stack>
    )
};

export default TopFiveList;