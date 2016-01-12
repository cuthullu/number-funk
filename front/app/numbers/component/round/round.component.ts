import {Component, Inject} from 'angular2/core'
import {OnInit} from 'angular2/core'
import {Input, Output, EventEmitter} from 'angular2/core'
import {RouteParams} from "angular2/router"

import {Round} from '../../model/round';
import {NumberService} from './../../service/number.service'
import {ToastService} from './../../service/toast.service'

@Component({
    selector: 'round-component',
    templateUrl: 'app/numbers/component/round/round.html'

})

export class RoundComponent {
	public answer: number = 0;
    @Input() round: Round;
    @Input() fail;
    @Input() solved;

    constructor(
        private _routeParams: RouteParams,
        private _numberService: NumberService,
        private _toastService: ToastService) { 

    }

    checkAnswer() {
		this.round.checkAnswer(this.answer);
        if(this.round.solved) {
            this._toastService.addToast(
              "Aye well done you got " + this.round.points + " points that round",
              "success",
              3000  
            );
            this.solved(this.round.points)
        }else {
            this._toastService.addToast(
              "You failed. I'm taking one of your points. Don't fail again, failure.",
              "warning",
              3000  
            );
        }
    }

    requestClue() {
        this._numberService.requestClue(this.round);
    }

    giveUp() {
        this.fail();
    }
}
