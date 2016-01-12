import {Injectable} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {Game} from '../model/game/game';
import {Round} from '../model/round';
import {NumberService} from './number.service'


@Injectable()
export class RoundService {
    
    constructor(private http: Http,
        private _numberService: NumberService) { }
    
    addRound(game: Game) {
        var round = new Round();
        this._numberService.requestClue(round);
        game.addRound(round);
    }
}