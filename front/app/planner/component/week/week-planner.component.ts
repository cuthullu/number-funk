import {Component, Inject} from 'angular2/core'
import {OnInit} from 'angular2/core'
import {Input} from 'angular2/core'
import {RouteParams} from "angular2/router"
import {Day} from './../../model/day'
import {Week} from './../../model/week'
import {DayService} from './../../service/day.service'

@Component({
    selector: 'week-planner',
    templateUrl: 'app/planner/component/week/week-planner.html'

})

export class WeekPlannerComponent {
	public week: Week;
	public weekStart: Date;
    constructor( private _routeParams: RouteParams, private _dayService: DayService) { }

    ngOnInit() {
		this.weekStart = new Date();
		this.weekStart.setDate(this.weekStart.getDate() + (7 *  Number.parseInt(this._routeParams.get("index"))));
		this.week = this._dayService.getWeek(this.weekStart);
    }
}