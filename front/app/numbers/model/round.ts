export class Round {
    public number: number;
    public clues: string[];
    public points;
    public solved = false;
    private max = 100;
    public _id: string;

    constructor(jRound?) {
        if (jRound) {
            this.update(jRound);
        }
    }
    
    update(jRound) {
        for (var prop in jRound) this[prop] = jRound[prop];
    }
}
