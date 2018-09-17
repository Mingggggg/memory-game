import React from "react";
import { types } from "../types";
import { throttle } from "../utils";

const Card = ({ card, state, row, reveal, index }) => {
    const onClick = state == types.HIDDEN ? () => reveal(index) : null; 
    return (
        <div
            className={"card "+state.toLowerCase()}
            style={{ width: (100/row)+'%' }}
            onClick={onClick}
        >
            {content}
        </div>
    )
};

const initGame = len => {
    const cards = Array(len).fill(0).map((_, i) => i%(len/2))
        , states = Array(len).fill(types.HIDDEN);
    return { cards, states };
};

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            revealed: -1,
            ...initGame(this.props.row**2)
        };
        this.reveal = throttle(index => {
            const { revealed, states } = this.state;
            if (revealed != -1) {
                if (cards[index] == cards[revealed]) {
                    states[index] = states[revealed] = types.MATCHED;
                } else {

                }
            }
        });
    }
    render() {
        const { cards, states } = this.state
        return (
            <div className="Grid">
                {
                    cards.map((card, key) => (
                        <Card
                            key={key}
                            card={card}
                            state={states[key]}
                            row={row}
                            index={key}
                            reveal={this.reveal}
                        />
                    ))
                }
            </div>
        );
    }
};