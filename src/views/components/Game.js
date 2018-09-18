import React from "react";
import Card from "./Card";
import Display from "./Display";

export default class Game extends React.Component {
    static initGame = ({ row, player }) => {
        const len = row**2
            , cards = Array(len).fill(0).map((_, i) => i%(len/2))
            , scores = Array(player).fill(0);
        cards.sort((x, y) => (0.5 - Math.random()));
        return {
            cards, row, scores,
            revealed: [], matched: {},
            player: 0,
            cnt: player,
        };
    };
    constructor(props) {
        super(props);
        this.state = Game.initGame(this.props.state);
    }
    componentWillReceiveProps = ({ state }) => {
        if (state.round > this.props.state.round)
            this.setState(Game.initGame(state));
    }
    reveal = index => () => {
        const { revealed, matched, states, player, cnt } = this.state;
        if (revealed.includes(index) || index in matched) return;
        revealed.push(index);
        if (revealed.length % 2 == 0) {
            this.check();
        } else this.setState({ ...this.state });
    };
    reset = () => this.setState(Game.initGame(this.props.state));
    check = () => {
        const { revealed, cards, matched, player, row, cnt, scores } = this.state
        const i = revealed[0], j = revealed[1];
        if (cards[i] == cards[j]) {
            matched[i] = matched[j] = player;
            cards[i]=cards[j]="P"+(player+1);
            ++scores[player];
            revealed.splice(0, 2);
            if (Object.keys(matched).length == row**2) {
                const winners = scores.reduce((prev, curr, index) => {
                    if (scores[index] > scores[prev[0]]) return [index];
                    else if (prev.length == 0 || scores[index] == scores[prev[0]]) prev.push(index);
                    return prev;
                }, []);
                const verdict = winners.length == cnt && cnt > 1 ? "Draw!" : winners
                    .map(winner => "Player "+(winner+1))
                    .join(" and ")+" won!";
                this.setState({ ...this.state });
                alert(verdict);
                return;
            }
        } else {
            setTimeout(() => {
                this.state.revealed.splice(0, 2);
                this.setState({ ...this.state });
            }, 600);
        }
        this.setState({ ...this.state, revealed, matched, player: (player+1) % cnt });
    };
    render() {
        const { cards, states, revealed, 
            matched, row, cnt, player, scores } = this.state
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
                    cnt={cnt}
                    player={player+1}
                    reset={this.reset}
                    restart={this.props.restart}
                    scores={scores}
                />
            </div>
        );
    }
};