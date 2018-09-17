import React from 'react';
import Game from './containers/Game';
import './App.css';

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Game />
            </div>
        );
    }
};