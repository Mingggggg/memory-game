import React from 'react';
import Game from "./components/Game";
import './App.css';

export default class App extends React.Component {
    static init = () => {
        let player = 0;
        while (player < 1) {
            let cin = prompt("Enter number of player", "1")
            if (cin == null) continue;
            player = parseInt(cin);
        }
        const levels = {
            'easy': 2, 
            'medium': 6,
            'hard': 8,
        };
        let level = 'insane';
        while (!(level in levels)) {
            level = prompt("Enter the level of difficulty you'd like (Easy, Medium or Hard)", "Easy")
                .toLowerCase();
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