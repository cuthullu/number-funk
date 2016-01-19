import {Component, Inject,View} from 'angular2/core'
import {OnInit} from 'angular2/core';
import {Input, Output, EventEmitter} from 'angular2/core';
import {Router} from "angular2/router";

import {Game} from '../../model/game/game';
import {Round} from '../../model/round';

import {GameService} from './../../service/game.service';
import {RoundService} from './../../service/round.service';
import {RoundComponent} from '../round/round.component';
import {ToastComponent} from '../toast/toast.component';
import {GameComponent} from '../game/game.component';

@Component({
    selector: 'dashboard-component',
    templateUrl: 'app/numbers/component/dashboard/dashboard.html',
    directives: [GameComponent]
})

export class DashboardComponent {
    public game: Game;
    myShow = false;
    
    constructor(
        private _router: Router,
        private _gameService: GameService) {
        
    }
    
    newGame() {
        this._gameService.game$.subscribe((newGame)=>{
            this.game = newGame;
            this.myShow = true;
            
            this._router.navigate(["Game", {game: this.game._id}])
        });
        this._gameService.reqNewGame();
    }
   
    
    public isShow() {
        return this.myShow;
    }
}
