import {Round} from '../round';

export class Game {
    public rounds: Round[] = [];
    public points = 0;
    public name: string;
    public solved: number = 0;
    

    resetGame() {
		this.rounds = [];
		this.points = 0;
    }
    
    hasPlayed(number:number) {
        return this.rounds.filter(r =>  r.number === number).length > 0;
    }
    
    numberSolved() {
        
    }
    
    addRound(round: Round) {
        this.rounds.push(round);
        this.solved = this.rounds.filter(r =>  r.solved).length; 
    }
}