import {Injectable} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable'
import {Game} from '../model/game/game';
import {Round} from '../model/round';
import {ApiConnectionService} from './apiConnection.service';
import {ToastService} from './toast.service'

@Injectable()
export class RoundService {
    rounds$: Observable<Array<Round>>;
    private _roundsObserver: any;
    private _rounds: Array<Round> = [];
    
    result$: Observable<boolean>;
    private _resultObserver: any;
    private _result: boolean = false;
    constructor(
        private http: Http,
        private _apiConnectionService: ApiConnectionService,
        private _toastService: ToastService) {
            this.rounds$ = new Observable(observer => 
            this._roundsObserver = observer).share();
            
            this.result$ = new Observable(observer => 
            this._resultObserver = observer).share()
        }
    
    reqNewRound(game: Game) { 
        var url = this._apiConnectionService.getHost() + "/game/" + game._id + "/rounds/new";
        this.http.get(url).subscribe(
            data => {
                this._rounds.push(new Round(data.json()));
                this._roundsObserver.next(this._rounds);
            },
            err => this._toastService.addToast(err.toString(),"danger")
        );
    }
    
    reqClue(round:Round) {
        var url = this._apiConnectionService.getHost() + "/rounds/" + round._id + "/clue";
        this.http.get(url).subscribe(
            data => {
                if(data.json().newClue === false){
                    this._toastService.addToast("No more clue available for this number...soz", "info");
                }
                this.updateRound(round)
            },
            err => this._toastService.addToast(err.toString(),"danger")
        );
    }
    
    updateRound = (round) => {
        var url = this._apiConnectionService.getHost() + "/rounds/" + round._id;
        this.http.get(url).subscribe(
            data => {
                this._rounds.forEach(round => {
                    if(round._id === data.json()._id){
                        round.update(data.json())
                    }
                })
                console.log("rounds",this, this._rounds);    
                //this._roundsObserver.next(this._rounds);
            },
            err => this._toastService.addToast(err.toString(),"danger")
        );
    }
    
    getRounds = (game) => {
        var url = this._apiConnectionService.getHost() + "/game/" + game._id + "/rounds";
        this.http.get(url).subscribe(
            data => {
                data.json().forEach(jRound => {
                    this._rounds.push(new Round(jRound));
                })    
                this._roundsObserver.next(this._rounds);
            },
            err => this._toastService.addToast(err.toString(),"danger")
        );
    }
    
    postSolution(game, round, answer) {
        var url = this._apiConnectionService.getHost() + "/game/" + game._id + "/rounds/" + round._id + "/solve";
        var body =  JSON.stringify({answer: answer});
        this.http.post(url, body).subscribe(
            data => this.runResult(game, round, data.json()),
            err => this._toastService.addToast(err.toString(),"danger")
        );
    }
    
    private runResult = (game: Game, round: Round, json) => {
        round.solved = json.result;
        if(json.result === true) {
            this._toastService.addToast(
              "Aye well done you got " + round.points + " points that round",
              "success");
              game.points += round.points;
        } else {
            this._toastService.addToast(
              "You failed. I'm taking one of your points. Don't fail again, failure.",
              "warning");
              round.points --;
        }
        this._resultObserver.next(json.result);
        this.updateRound(round);
    }
}