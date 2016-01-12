import {Component, Inject} from 'angular2/core'
import {OnInit} from 'angular2/core'
import {Input, Output, EventEmitter, TimerWrapper} from 'angular2/core'
import {RouteParams} from "angular2/router"

import {Game} from '../../model/game/game';
import {Round} from '../../model/round';

import {NumberService} from './../../service/number.service'
import {GameService} from './../../service/game.service'
import {RoundService} from './../../service/round.service'
import {RoundComponent} from '../round/round.component'
import {ToastComponent} from '../toast/toast.component'

@Component({
    selector: 'game-component',
    templateUrl: 'app/numbers/component/game/game.html',
    directives: [RoundComponent, ToastComponent]

})

export class GameComponent {
    public game: Game;
    
    constructor(private _routeParams: RouteParams,
        private _numberService: NumberService,
        private _gameService: GameService,
        private _roundService: RoundService) {
        
    }

    ngOnInit() {
        this.game = this._gameService.getGame();
        this._roundService.addRound(this.game);
    }


    addRound() {
        this._roundService.addRound(this.game);
    }

    public failed = () => {
        this.addRound();
    }

    public solved = (points) => {
        this.game.points += points;
        this.addRound();
        
    }
}
