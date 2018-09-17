import React from 'react';
import { types } from "./types";
import './App.css';

const initCards = len => {
    const cards = Array(len).fill(0).map((_, i) => ({
        content: i%(len/2),
        state: types.HIDDEN
    }));
    cards.sort((x, y) => (0.5 - Math.random()));
    return cards;
}

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            round: 1,
            mode: types.MODE_SELECTION,
            config: 36,
            cards: initCards(36)
        };
    }
    nextStates = s => this.setState({ ...this.state, ...s });
    nextMode = mode => this.nextState({ mode })
    // nextConfig = 
    nextRound = () => this.nextState({ round: this.state.round+1 })
    render() {
        return (
            <div className="App">
                <Game
                    state={state}
                    nextMode={this.nextMode}
                />
            </div>
        );
    }
};