import React from "react";
import { types } from "../types";

const Card = ({ card, cantClick, row, reveal }) => {
    const onClick = cantClick ? null : reveal; 
    return (
        <div
            className={"card"}
            style={{ width: (100/row)+'%' }}
            onClick={onClick}
        >
            <div className={cantClick ? "" : "hidden"}>
                {card}
            </div>
        </div>
    )
};

export default class Game extends React.Component {
    static initGame = row => {
        const len = row**2
            , cards = Array(len).fill(0).map((_, i) => i%(len/2))
        cards.sort((x, y) => (0.5 - Math.random()));
        return {
            cards, row, 
            revealed: [], matched: {},
            player: 1, win: false
        };
    };
    constructor(props) {
        super(props);
        this.state = Game.initGame(this.props.state.row);
    }
    reveal = index => () => {
        const { revealed, matched, states } = this.state;
        if (revealed.includes(index) || index in matched) return;
        revealed.push(index);
        if (revealed.length % 2 == 0) setTimeout(this.check, 500);
        this.setState({ ...this.state, revealed });
    };
    reset = () => this.setState(Game.initGame(this.state.row));
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
    render() {
        const { cards, states, revealed, matched, row } = this.state
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
                <div>
                    <div>Reset</div>
                </div>
            </div>
        );
    }
};