import React from 'react';
import './TopStats.css';

const TopStats = props => {
    const { seasonData } = props;
    if (seasonData) {
        const { attributes: {gameModeStats: {squad}}} = seasonData;
        let topStatsObj = {
            'Longest Kill': Math.round(squad['longestKill']),
            // 'Longest Time Survived': Math.round(squad['longestTimeSurvived']),
            // 'Wins': squad['wins']
        }
        return (
            <ul className="top-stats">
                <li className="season-row">
                    {Object.keys(topStatsObj).map((stat, ind) => {
                        return (
                            <div className='stat' key={ind}>
                                <h3>{stat}:</h3>
                                <p>{topStatsObj[stat]}</p>
                            </div>
                        )
                    })}
                </li>
            </ul>
        )
    }
    return <div className="loading">Loading...</div>
}

export default TopStats;
