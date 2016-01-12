import {Component, Inject} from 'angular2/core'
import {OnInit} from 'angular2/core'
import {Input, Output, EventEmitter} from 'angular2/core'
import {RouteParams} from "angular2/router"

import {Round} from '../../model/round';
import {NumberService} from './../../service/number.service'

@Component({
    selector: 'round-component',
    templateUrl: 'app/numbers/component/round/round.html'

})

export class RoundComponent {
	public answer: number = 0;
    @Input() round: Round;
    @Input() fail;
    @Input() solved;

    constructor(private _routeParams: RouteParams, private _numberService: NumberService) { 

    }

    checkAnswer() {
		this.round.checkAnswer(this.answer);
        if(this.round.solved) {
            this.solved(this.round.points)
        }
    }

    requestClue() {
        this._numberService.requestClue(this.round);
    }

    giveUp() {
        this.fail();
    }
}
