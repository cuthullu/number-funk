import {Injectable} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/share';
import {Game} from '../model/game/game';
import {ApiConnectionService} from './apiConnection.service';
import {ToastService} from './toast.service'


@Injectable()
export class GameService {
    game$: Observable<Game>;
    private _gameObserver: any;
    constructor(
        private http: Http, 
        private _apiConnectionService: ApiConnectionService,
        private _toastService: ToastService ) {
            this.game$ = new Observable(observer => 
            this._gameObserver = observer).share();
         }
    
    reqGame(id) {
        var url = this._apiConnectionService.getHost() + "/game/" + id;
        this.http.get(url).subscribe(
            data => {
                var g:Game = new Game(data.json());
                this._gameObserver.next(g);
            },
            err => this._toastService.addToast(err,"danger",3000)
        );
    }

    
    reqNewGame() { 
        var url = this._apiConnectionService.getHost() + "/game";
        this.http.get(url).subscribe(
            data => {
                var g:Game = new Game(data.json());
                this._gameObserver.next(g);
            },
            err => this._toastService.addToast(err,"danger",3000)
        );
    }
    
    setGameName(id,name) {
        var url = this._apiConnectionService.getHost() + "/game/" + id + "/";
        this.http.post(url, {name : name}).subscribe(
            () => this._toastService.addToast("Name Submitted good", "success", 3000),
            err => this._toastService.addToast(err,"danger",3000)
        );
    }
    
    

}