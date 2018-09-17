import React from "react";
import { types } from "../types";

const flipCard = () => {};
const Card = ({ card: { state, content }, row }) => {
    const onClick = state == types.HIDDEN ? flipCard : null; 
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

const Game = ({ state: { cards, row }}) => {
    console.log(cards)
    return (
        <div className="Grid">
            {
                cards.map((card, key) => (
                    <Card key={key} card={card} row={row} />
                ))
            }
        </div>
    );
};

export default Game;