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
    templateUrl: 'views/dashboard.html',
    directives: [GameComponent]
})

export class DashboardComponent {
    public game: Game;
    public name: string;
    public table: Game[];
    myShow = false;
    
    constructor(
        private _router: Router,
        private _gameService: GameService) {
        
    }
    
    ngOnInit() {
        this._gameService.table$.subscribe(
            data => {
                this.table = data;
            }
        )
        this._gameService.reqTable();
    }
    
    newGame() {
        //this._gameService.game$
        this._gameService.reqNewGame(this.name).subscribe(
            data =>{
                this._router.navigate(["Game", {game: data.json().id}])
            }
        );
    }
   
    
    public isShow() {
        return this.myShow;
    }
}
