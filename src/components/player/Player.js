import React, { Component } from 'react';
import './Player.css';
import axios from 'axios';

import Matches from './Matches';

class Player extends Component {
    constructor () {
        super();

        this.state = {
            playerName: null,
            matchIds: null
        };
    }

    getPlayerData = () => {
        axios.get(
            `https://api.pubg.com/shards/xbox-na/players?filter[playerNames]=${ process.env.REACT_APP_TEST_ACCOUNT_NAME }`,
            {
                headers: {
                    Authorization: `Bearer ${ process.env.REACT_APP_PUBG_API_KEY }`,
                    Accept: 'application/json'
                }
            })
            .then(data => {
                let playerData = data.data.data[0];

                const {
                    relationships: { matches: { data: matchIds }},
                    attributes: { name: playerName }
                } = playerData;

                this.setState({
                    playerName,
                    matchIds
                })
            })
    }

    componentDidMount () {
        this.getPlayerData();
    }

    render () {
        const { playerName, matchIds } = this.state;
        return (
            <div className="player">
                <h2>Player Component</h2>
                <h3>Player Name: { playerName }</h3>
                <h3>Match Ids:</h3>
                <Matches { ...{ matchIds }} />
            </div>
        )
    }
}

export default Player;
