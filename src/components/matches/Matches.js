import React, { Component } from 'react';
import './Matches.css';
import axios from 'axios';

class Matches extends Component {
    constructor (props) {
        super(props);

        this.state = {
            matchData: null
        }
    }

    componentDidMount () {
        this.getMatches();
    }

    componentDidUpdate (prevProps) {
        if (prevProps.matchIds == null)  this.getMatches();
    }

    getMatches = () => {
        const { matchIds } = this.props;
        if (matchIds && matchIds.length) {
            const getMatchData = async () => {
                const matchData = await Promise.all(
                    matchIds.map(async match => {
                        const data = await axios.get(
                            `https://api.pubg.com/shards/xbox-na/matches/${ match.id }`,
                            {
                                headers: {
                                    Authorization: `Bearer ${ process.env.REACT_APP_PUBG_API_KEY }`,
                                    Accept: 'application/json'
                                }
                            });
                        return data.data.data; // ...but why?
                    })
                );
                this.setState({ matchData });
            }
            getMatchData();
        }
    }

    listMatchItems = matchData => {
        return matchData.map(data => {
            const { id, attributes: { mapName, gameMode, duration }} = data;
            let minutes = Math.floor(duration / 60);
            let seconds = duration - minutes * 60;
            return (
                <li className="match-row" key={ id }>
                    <p>{ mapName}</p>
                    <p>{ gameMode }</p>
                    <p>{ `${ minutes }:${ seconds < 10 ? '0' + seconds : seconds }` }</p>
                </li>
            )
        })
    }

    render () {
        const { matchData } = this.state;
        return (
            <div className="matches">
                { matchData && matchData.length ?
                    <ul>
                        <li className="match-row" key={'title-row'}>
                            <h3>Map Name</h3>
                            <h3>Game Mode</h3>
                            <h3>Duration</h3>
                        </li>
                        { this.listMatchItems(matchData) }
                    </ul>
                : <p className="loading">Loading...</p> }
            </div>
        )
    }
}

export default Matches;
