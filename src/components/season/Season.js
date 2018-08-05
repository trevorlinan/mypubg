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
            fullStats: false
        }
    }

    componentDidMount () {
        this.getSeasonData()
    }


    getSeasonData = () => {
        const { id: playerId, currentSeasonId } = this.props;
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
                this.setState({ seasonData })
            })
    }

    listTopStats = seasonData => {
        const { attributes: { gameModeStats: { squad } }} = seasonData;
        let topStatsObj = {
            'Longest Kill': Math.round(squad['longestKill']),
            'Longest Time Survived': Math.round(squad['longestTimeSurvived']),
            'Wins': squad['wins']
        }
        return <TopStats { ...{ topStatsObj }} />
    }

    listFullStats = seasonData => {
        const { attributes: { gameModeStats: { squad: fullStatsObj } }} = seasonData;
        return <FullStats { ...{ fullStatsObj }} />
    }

    render () {
        const { seasonData, fullStats } = this.state;
        const { playerName } = this.props;
        return (
            <div className="season">

                <div className="season-peek">
                    <h4 className="player-name">{ playerName }</h4>
                    <div
                        className={`drop-arrow ${ fullStats ? 'open' : null }`}
                        onClick={() => this.setState({ fullStats: !fullStats })}>
                    </div>
                    { seasonData ?
                        this.listTopStats(seasonData)
                    : <div className="loading">Loading</div> }
                </div>

                <div className="season-list">
                    { fullStats ?
                        this.listFullStats(seasonData)
                    : null }
                </div>

            </div>
        )
    }
}

export default Season;
