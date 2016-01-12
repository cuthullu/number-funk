import {Injectable} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {Game} from '../model/game/game';


@Injectable()
export class GameService {
    private game: Game;
    
    constructor(private http: Http) { }
    
    getGame() {
        if(this.game === undefined){
            return this.getNewGame();
        }
        return this.game;
    }
    
    getNewGame() { 
        this.game = new Game();
        return this.game;
    }

}