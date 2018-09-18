import React from 'react';
import Game from "./components/Game";
import './App.css';

export default class App extends React.Component {
    static init = () => {
        let player = 0;
        while (player == NaN || player < 1 || typeof player != 'number') {
            player = parseInt(prompt("Enter number of player"));
        }
        const levels = {
            'easy': 4, 
            'medium': 6,
            'hard': 8,
        };
        let level = 'insane';
        while (!(level in levels)) {
            level = prompt("Enter the level of difficulty you'd like (easy, medium or hard)").toLowerCase();
        }
        return {
            row: levels[level],
            player,
            round: 0,
        }
    }
    constructor(props) {
        super(props);
        this.state = App.init();
    }
    restart = () => {
        const round = this.state.round+1;
        this.setState({ ...App.init(), round });
    }
    render() {
        return (
            <div className="App">
                <Game
                    state={this.state}
                    restart={this.restart}
                />
            </div>
        );
    }
};