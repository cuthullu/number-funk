import {NumberService} from './../../service/number.service'

export class Round {
    public number: number;
    public clues: string[];
    public points;
    public solved = false;
    private max = 100;

    constructor() {
        this.resetRound();
    }

    resetRound() {
		this.number = Math.floor(Math.random() * this.max);
		this.clues= [];
		this.points = 6;
    }

    checkAnswer(answer: number) {
    	this.solved = answer === this.number;
    	return this.solved;
    }

    addClue(json){
    	if(json.found) { 
    		var san = this.sanitize(json.text);
    		if(this.clues.indexOf(san) < 0) {
    			this.clues.push(san);
    			this.points --;
    		}else {
    			console.log("Duplicate Clue")
    		}
    	}else {
            
        }
    }

	sanitize(raw: string) {
		var reg = new RegExp('\\b' + this.number + '\\b');
		raw = raw.replace(reg, 'It');
		reg = new RegExp('\\b' + this.number + '\\b','g');
		raw = raw.replace(reg, 'it');
		return raw;
	}
}
