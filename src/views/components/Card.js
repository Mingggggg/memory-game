import React from "react";

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

export default Card;