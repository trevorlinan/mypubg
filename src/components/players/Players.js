import React, { Component } from 'react';
import './Players.css';
import axios from 'axios';

import Matches from '../matches/Matches';
import Season from '../season/Season';
import { players } from '../../data';

class Player extends Component {
    constructor () {
        super();

        this.state = {
            playerData: null,
            currentSeasonId: null
        };
    }

    componentDidMount () {
        this.getCurrentSeason();
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevState.currentSeasonId == null)  {
            this.getPlayerData();
        }
    }

    getCurrentSeason = () => {
        if (window.localStorage.hasOwnProperty('seasonId')) {
            let currentSeasonId = window.localStorage.getItem('seasonId');
            this.setState({ currentSeasonId });
            return;
        }
        axios.get(
            'https://api.pubg.com/shards/xbox-na/seasons',
            {
                headers: {
                    Authorization: `Bearer ${ process.env.REACT_APP_PUBG_API_KEY }`,
                    Accept: 'application/json'
                }
            })
            .then(data => {
                const seasons = data.data.data;
                let currentSeason = seasons.find(season => {
                    const { attributes: { isCurrentSeason }} = season;
                    if (isCurrentSeason) return season;
                });
                const { id: currentSeasonId } = currentSeason;
                this.setState({ currentSeasonId })
                window.localStorage.setItem('seasonId', currentSeasonId);
            })
    }

    getPlayerData = () => {
        const playerList = players.join(',');
        if (window.localStorage.hasOwnProperty('playerData')) {
            let playerData = JSON.parse(window.localStorage.getItem('playerData'));
            this.setState({ playerData });
            return;
        }
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
                this.setState({ playerData });
                window.localStorage.setItem('playerData', JSON.stringify(playerData));
            })
    };

    listPlayers = (playerData, currentSeasonId) => {
        return playerData.map(player => {
            const {
                relationships: { matches: { data: matchIds }},
                attributes: { name: playerName },
                id
            } = player;
            return (
                <div className="player" key={ id }>
                    {/*<h4>{ playerName }</h4>*/}
                    <Season { ...{ id, playerName, currentSeasonId }} />
                    {/*<Matches { ...{ matchIds }} />*/}
                </div>
            )
        })
    }

    render () {
        const { playerData, currentSeasonId } = this.state;
        return (
            <React.Fragment>
                { /* Add Drop Down Menu Here */ }
                { playerData && playerData.length ?
                    <div className="players">
                        { this.listPlayers(playerData, currentSeasonId) }
                    </div>
                 : null }
            </React.Fragment>
        )
    }
}

export default Player;
