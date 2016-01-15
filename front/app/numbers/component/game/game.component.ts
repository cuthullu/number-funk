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
    public currentRound;

    constructor(private _routeParams: RouteParams,
        private _numberService: NumberService,
        private _gameService: GameService,
        private _roundService: RoundService) {

    }

    ngOnInit() {
        this._gameService.game$.subscribe(sGame => {
            if (this.game === undefined) {
                this.game = sGame;
                this._roundService.rounds$.subscribe(nRounds => {
                    this.game.rounds = nRounds;
                    this.currentRound = this.game.peekAtRounds();
                })
                if (this.game.rounds.length === 0) {
                    this._roundService.reqNewRound(this.game);
                } else {
                    this.currentRound = this.game.peekAtRounds();
                }
            } else {
                this.game.update(sGame);
            }
        });
        this._gameService.reqGame(this._routeParams.params.game);
        
        this._roundService.result$.subscribe(result => {
            if(result === true) {
                this.addRound();
            }
        })
    }

    addRound() {
        this._roundService.reqNewRound(this.game);
    }

    public giveUp = () => {
        this.addRound();
    }

    public solved = (points) => {
        this.game.points += points;
        this.addRound();

    }
}
