import React from "react";

const Display = ({cnt, player, reset, restart}) => {
    return (
        <div className="Display">
            <div className="title">{cnt > 1 ? "Multi Player" : "Single Player"}</div>
            <div className="title">Player {player}'s turn</div>
            <div className="button" onClick={reset}>Reset</div>
            <div className="button" onClick={restart}>Restart</div>
        </div>
    )
};

export default Display;