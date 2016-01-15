import {NumberService} from './../../service/number.service'

export class Round {
    public number: number;
    public clues: string[];
    public points;
    public solved = false;
    private max = 100;
    public _id: string;

    constructor(jRound?) {
        if (jRound) {
            for (var prop in jRound) this[prop] = jRound[prop];
        }
    }

    resetRound() {
        this.number = Math.floor(Math.random() * this.max);
        this.clues = [];
        this.points = 6;
    }

    checkAnswer(answer: number) {
        this.solved = answer === this.number;
        return this.solved;
    }

    addClue(json) {
        this.clues.push(json.clue);
        this.points += json.penalty;
    }

    sanitize(raw: string) {
        var reg = new RegExp('\\b' + this.number + '\\b');
        raw = raw.replace(reg, 'It');
        reg = new RegExp('\\b' + this.number + '\\b', 'g');
        raw = raw.replace(reg, 'it');
        return raw;
    }
}
