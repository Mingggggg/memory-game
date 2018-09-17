import React from 'react';

const Card = ({ card: { state, content }, key, row }) => {
    const onClick = state == types.HIDDEN ? flipCard : null; 
    return (
        <div
            key={key}
            className={"card "+state.toLowerCase()}
            style={{ width: (100/row)+'%' }}
            onClick={onClick}
        >
            {content}
        </div>
    )
};

const Game = ({ state: { cards }, }) => {
    return (
        <div className="Grid">
            {
                cards.map((card, key) => (
                    <Card key={key} card={card} />
                ))
            }
        </div>
    );
};

export default Game;