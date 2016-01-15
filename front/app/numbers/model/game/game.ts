import {Round} from '../round';

export class Game {
    public rounds: Round[] = [];
    public currentRound;
    public points = 0;
    public name: string;
    public solved: number = 0;
    public _id: string;

    constructor(obj?) {
        if (obj) {
            var jRounds = obj.rounds;
            delete obj.rounds;
            for (var prop in obj) this[prop] = obj[prop];

            for (var jRound of jRounds) this.rounds.push(new Round(jRound));
        }
    }

    resetGame() {
        this.rounds = [];
        this.points = 0;
    }
    
    addRound(round: Round) {
        this.rounds.push(round);
        this.currentRound = round;
        this.solved = this.rounds.filter(r => r.solved).length;
    }

    update(uGame) {
        this.points = uGame.points;
        this.name = uGame.name;
        this.solved = uGame.solved;
    }

    peekAtRounds() {
        return this.rounds[this.rounds.length - 1];
    }
}
