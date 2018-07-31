import React, { Component } from 'react';
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

    componentDidUpdate (prevProps, prevState) {
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
                        console.log('data', data);
                        return <li>{data.data.data.attributes.mapName}</li>
                    })
                );
                console.log(matchData);
                this.setState({ matchData });
            }
            getMatchData();
        }
    }

    render () {
        const { matchData } = this.state;
        return (
            matchData && matchData.length ?
                <ul>
                    { matchData.map(data => <li>{ data.name }</li>)}
                </ul>
                : null
        )
    }
}

export default Matches;