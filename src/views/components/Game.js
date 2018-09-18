import React from "react";
import Card from "./Card";
import Display from "./Display";

export default class Game extends React.Component {
    static initGame = ({ row, player }) => {
        const len = row**2
            , cards = Array(len).fill(0).map((_, i) => i%(len/2))
        cards.sort((x, y) => (0.5 - Math.random()));
        return {
            cards, row, 
            revealed: [], matched: {},
            player: 1, win: false,
            playerCnt: player,
        };
    };
    constructor(props) {
        super(props);
        this.state = Game.initGame(this.props.state);
    }
    reveal = index => () => {
        const { revealed, matched, states } = this.state;
        if (revealed.includes(index) || index in matched) return;
        revealed.push(index);
        if (revealed.length % 2 == 0) setTimeout(this.check, 500);
        this.setState({ ...this.state, revealed });
    };
    reset = () => this.setState(Game.initGame(this.props.state));
    check = () => {
        const { revealed, cards, matched, player, row } = this.state;
        const i = revealed.shift(), j = revealed.shift();
        if (cards[i] == cards[j]) {
            matched[i] = player;
            matched[j] = player;
        }
        if (Object.keys(matched).length == row**2) this.setState({ ...this.state, win: true });
        else this.setState({ ...this.state, revealed, matched });
    };
    componentWillReceiveProps = ({ state }) => {
        if (state.round > this.props.state.round)
            this.setState(Game.initGame(state));
    }
    render() {
        const { cards, states, revealed, matched, row, playerCnt, player } = this.state
        return (
            <div className="Grid">
                {
                    cards.map((card, key) => (
                        <Card
                            key={key}
                            card={card}
                            row={row}
                            index={key}
                            cantClick={revealed.includes(key) || key in matched}
                            reveal={this.reveal(key)}
                        />
                    ))
                }
                <Display
                    cnt={playerCnt}
                    player={player}
                    reset={this.reset}
                    restart={this.props.restart}
                />
            </div>
        );
    }
};