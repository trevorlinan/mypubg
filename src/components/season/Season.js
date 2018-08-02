import React, { Component } from 'react';
import './Season.css';
import axios from "axios/index"

class Season extends Component {
    constructor () {
        super();

        this.state = {
            seasonData: null
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

    listSeasonStats = seasonData => {
        const { attributes: { gameModeStats: { squad } }} = seasonData;
        return (
            <li className="season-row">
                <p>{ Math.round(squad['longestKill']) }</p>
                <p>{ Math.round(squad['longestTimeSurvived']) }</p>
                <p>{ squad['wins'] }</p>
            </li>
        )
    }

    render () {
        const { seasonData } = this.state;
        return (
            <div className="season">
                { seasonData ?
                    <ul>
                        <li className="season-row" key={'title-row'}>
                            <h3>Longest Kill</h3>
                            <h3>Longest Time Survived</h3>
                            <h3>Wins</h3>
                        </li>
                        {  this.listSeasonStats(seasonData) }
                    </ul>
                : <p className="loading">Loading...</p> }
            </div>
        )
    }
}

export default Season;
