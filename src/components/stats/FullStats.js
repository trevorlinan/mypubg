import React from 'react';
import anime from 'animejs';
import { Transition } from 'react-transition-group';
import './FullStats.css';

let containerHeight = null;
let currentAnimation = null;
const clearCurrentAnimation = () => currentAnimation && currentAnimation.pause()
const animate = {
    scaleCenterOut: (container, done) => {
        clearCurrentAnimation();
        if (!containerHeight) containerHeight = container.offsetHeight;
        currentAnimation = anime
            .timeline()
            .add({
                targets: container,
                height: 0,
                scaleY: 0,
                duration: 0
            })
            .add({
                targets: container,
                height: containerHeight + 'px',
                scaleY: 1,
                easing: 'easeOutExpo',
                duration: 500,
                complete: () => {}
            })
    },
    scaleOutToCenter: (container, done) => {
        clearCurrentAnimation();
        currentAnimation = anime
            .timeline()
            .add({
                targets: container,
                height: containerHeight + 'px',
                scaleY: 1,
                duration: 0
            })
            .add({
                targets: container,
                height: 0,
                scaleY: 0,
                easing: 'easeOutExpo',
                duration: 250,
                complete: () => {}
            })
    }
}

const createList = stats => {
    let listRows = [];
    Object.keys(stats).reduce((obj, stat, ind) => {
        obj[stat] = stats[stat];
        if (ind % 1 === 0) { // (ind % 2 === 0) for 2 columns, (ind % 3 === 2) for 3 columns
            listRows.push(obj);
            obj = {};
        }
        return obj;
    }, {});
    return listRows;
};

const listStats = data => {
    const { attributes: { gameModeStats: { squad: fullStatsObj } }} = data;
    let list = createList(fullStatsObj);
    return list.map((row, ind) => {
        return (
            <li className="season-row" key={ind}>
                {Object.keys(row).map((stat, ind) => {
                    let strBreak = stat.replace(/([a-z](?=[A-Z]))/g, '$1 ');
                    let humanizeStat = strBreak.charAt(0).toUpperCase() + strBreak.slice(1);
                    return (
                        <div className='stat' key={ind}>
                            <div className="stat-info">
                                <h3>{humanizeStat}:</h3>
                                <p>{fullStatsObj[stat]}</p>
                            </div>
                        </div>
                    )
                })}
            </li>
        )
    })
};

const FullStats = props => {
    const { showFullStats, seasonData } = props;
    if (seasonData) {
        return (
            <Transition
                mountOnEnter
                in={ showFullStats }
                onEnter={ animate.scaleCenterOut }
                onExit={ animate.scaleOutToCenter }
                timeout={ 0 }
                >
                <div className="season-list">
                    <ul className="full-stats">
                        { listStats(seasonData) }
                    </ul>
                </div>
            </Transition>
        )
    }
    return null;
};

export default FullStats;
