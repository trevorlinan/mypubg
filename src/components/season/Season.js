import React, { Component } from 'react';
import './Season.css';
import axios from "axios/index"

import TopStats from '../stats/TopStats';
import FullStats from '../stats/FullStats';

class Season extends Component {
    constructor () {
        super();

        this.state = {
            seasonData: null,
            showFullStats: false
        }
    }

    componentDidMount () {
        this.getSeasonData()
    }

    getSeasonData = () => {
        const { id: playerId, currentSeasonId } = this.props;
        if (window.localStorage.hasOwnProperty('playerData')) {
            let playerData = JSON.parse(window.localStorage.getItem('playerData'));
            let playerIndex = playerData.findIndex(({ id }) => playerId === id);
            let seasonData = playerData[playerIndex].seasonData;
            this.setState({ seasonData });
            return;
        }
        axios.get(
            `https://api.pubg.com/shards/xbox-na/players/${ playerId }/seasons/${ currentSeasonId }`,
            {
                headers: {
                    Authorization: `Bearer ${ process.env.REACT_APP_PUBG_API_KEY }`,
                    Accept: 'application/json'
                }
            })
            .then(data => {
                let seasonData = data.data.data;
                this.setState({ seasonData });
                if (window.localStorage.hasOwnProperty('playerData')) {
                    let playerData = JSON.parse(window.localStorage.getItem('playerData'));
                    let playerIndex = playerData.findIndex(({ id }) => playerId === id);
                    playerData[playerIndex].seasonData = seasonData;
                    window.localStorage.setItem('playerData', JSON.stringify(playerData))
                }
            })
    }

    render () {
        const { seasonData, showFullStats } = this.state;
        const { playerName } = this.props;
        return (
            <div className="season">
                <div className="season-peek">
                    <h4 className="player-name">{ playerName }</h4>
                    <div
                        className={`drop-arrow ${ showFullStats ? 'open' : null }`}
                        onClick={() => this.setState({ showFullStats: !showFullStats })}>
                    </div>
                    <TopStats { ...{ seasonData }} />
                </div>
                <FullStats { ...{ seasonData, showFullStats } } />
            </div>
        )
    }
}

export default Season;
