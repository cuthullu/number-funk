import {Component, Inject} from 'angular2/core'
import {OnInit} from 'angular2/core'
import {Input, Output, EventEmitter} from 'angular2/core'
import {RouteParams} from "angular2/router"

import {Game} from '../../model/game/game';
import {Round} from '../../model/round';

import {NumberService} from './../../service/number.service'
import {RoundComponent} from '../round/round.component'


@Component({
    selector: 'game-component',
    templateUrl: 'app/numbers/component/game/game.html',
    directives: [RoundComponent]

})

export class GameComponent {
    public game: Game;
    public currentRound: Round;
    public self = this;
    constructor(private _routeParams: RouteParams, private _numberService: NumberService) {
        
    }

    ngOnInit() {
        this.game = new Game();
        this.addRound();
    }


    addRound() {
        this.currentRound = new Round();
        this.game.addRound(this.currentRound);
        this._numberService.requestClue(this.currentRound);
    }

    public failed = () => {
        this.addRound();
    }

    public solved = (points) => {
        this.game.points += points;
        this.addRound();
    }
}
