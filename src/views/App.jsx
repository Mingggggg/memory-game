import React from 'react';
import { types } from "./types";
import Game from "./components/Game";
import './App.css';

const initCards = len => {
    const cards = Array(len).fill(0).map((_, i) => ({
        content: i%(len/2),
        state: types.HIDDEN
    }));
    cards.sort((x, y) => (0.5 - Math.random()));
    return cards;
}

const Mode = () => {};

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            round: 1,
            mode: types.SINGLE_PLAYER,
            row: 6,
            cards: initCards(36)
        };
    }
    nextStates = s => this.setState({ ...this.state, ...s });
    nextMode = mode => this.nextState({ mode })
    // nextConfig = 
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