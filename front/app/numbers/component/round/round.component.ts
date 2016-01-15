import {Component, Inject} from 'angular2/core'
import {OnInit} from 'angular2/core'
import {Input, Output, EventEmitter} from 'angular2/core'
import {RouteParams} from "angular2/router"

import {Round} from '../../model/round';
import {Game} from '../../model/game/game';
import {RoundService} from './../../service/round.service'
import {ToastService} from './../../service/toast.service'

@Component({
    selector: 'round-component',
    templateUrl: 'app/numbers/component/round/round.html'

})

export class RoundComponent {
	public answer: number = 0;
    @Input() round: Round;
    @Input() game; Game;
    @Input() giveUpRound;

    constructor(
        private _routeParams: RouteParams,
        private _roundService: RoundService) { 

    }

    checkAnswer() {
		this._roundService.postSolution(this.game, this.round, this.answer);
        
    }

    requestClue() {
        this._roundService.reqClue(this.round);
    }

    giveUp() {
        this.giveUpRound();
    }
}
