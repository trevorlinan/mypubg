import React from 'react';
import './TopStats.css';

const TopStats = props => {
    const { topStatsObj } = props;
    return (
        <ul className="top-stats">
            <li className="season-row">
                {Object.keys(topStatsObj).map((stat, ind) => {
                    return (
                        <div className='stat' key={ ind}>
                            <h3>{ stat }:</h3>
                            <p>{ topStatsObj[stat] }</p>
                        </div>
                    )
                })}
            </li>
        </ul>
    )
}

export default TopStats;
