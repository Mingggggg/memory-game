import React from "react";

const Display = ({ cnt, player, reset, restart, scores }) => {
    let _scores = scores.map((score, name) => ({ name, score }));
    _scores.sort(({ score: s1 }, { score: s2 }) => s1 < s2);
    return (
        <div className="Display">
            <div className="title">{cnt > 1 ? "Multi Player" : "Single Player"}</div>
            { cnt > 1 ? <div className="title">Player {player}'s turn</div> : null }
            <div className="columns">
                <div>
                    <div className="button" onClick={reset}>Reset</div>
                    <div className="button" onClick={restart}>Restart</div>
                </div>
                <div>
                    {
                        _scores.map(({ name, score }) => (
                            <div key={name}>P{name+1}: {score}</div>
                        ))
                    }    
                </div>
            </div>
        </div>
    )
};

export default Display;