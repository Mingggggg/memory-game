import React from 'react';
import { types } from "./types";
import Game from "./components/Game";
import './App.css';


const Mode = () => {};

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            round: 1,
            mode: types.SINGLE_PLAYER,
            row: 6,
        };
    }
    nextStates = s => this.setState({ ...this.state, ...s });
    nextMode = mode => this.nextState({ mode })
    nextRound = () => this.nextState({ round: this.state.round+1 })
    render() {
        const { mode } = this.state;
        return (
            <div className="App">
                {
                    mode == types.MODE_SELECTION ? (
                        <Mode />
                    ) : (
                        <Game
                            state={this.state}
                            nextMode={this.nextMode}
                        />
                    )
                }
            </div>
        );
    }
};