import React, { Component } from 'react';
import './Player.css';
import axios from 'axios';

import Matches from '../matches/Matches';
import { players } from '../../data';

class Player extends Component {
    constructor () {
        super();

        this.state = {
            playerData: null
        };
    }

    getPlayerData = () => {
        const playerList = players.join(',');
        axios.get(
            `https://api.pubg.com/shards/xbox-na/players?filter[playerNames]=${ playerList }`,
            {
                headers: {
                    Authorization: `Bearer ${ process.env.REACT_APP_PUBG_API_KEY }`,
                    Accept: 'application/json'
                }
            })
            .then(data => {
                let playerData = data.data.data;
                this.setState({ playerData })
            })
    }

    listPlayers = playerData => {
        return playerData.map(player => {
            const {
                relationships: { matches: { data: matchIds }},
                attributes: { name: playerName },
                id
            } = player;
            return (
                <div className="player" key={ id }>
                    <h4>{ playerName }</h4>
                    <Matches { ...{ matchIds }} />
                </div>
            )
        })
    }

    componentDidMount () {
        this.getPlayerData();
    }

    render () {
        const { playerData } = this.state;
        return (
            playerData && playerData.length ?
                this.listPlayers(playerData)
            : null
        )
    }
}

export default Player;
