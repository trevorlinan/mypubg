import React from 'react';
import './FullStats.css';

const FullStats = props => {
    const { fullStatsObj } = props;

    const listStats = stats => {
        let list = createList(stats);
        return list.map((row, ind) => {
            return (
                <li className="season-row" key={ ind }>
                    {Object.keys(row).map((stat, ind) => {
                        let strBreak = stat.replace(/([a-z](?=[A-Z]))/g, '$1 ');
                        let humanizeStat = strBreak.charAt(0).toUpperCase() + strBreak.slice(1);
                        return (
                            <div className='stat' key={ ind }>
                                <h3>{ humanizeStat }:</h3>
                                <p>{ stats[stat] }</p>
                            </div>
                        )
                    })}
                </li>
            )
        })
    }

    const createList = stats => {
        let listRows = [];
        Object.keys(stats).reduce((obj, stat, ind) => {
            obj[stat] = stats[stat];
            if (ind % 3 === 2) {
                listRows.push(obj);
                obj = {};
            }
            return obj;
        }, {})
        return listRows;
    }

    return (
        <ul className="full-stats">
            { listStats(fullStatsObj) }
        </ul>
    )
}

export default FullStats;
