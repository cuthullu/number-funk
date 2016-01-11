import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Week} from './../model/week';


@Injectable()
export class DayService {
    constructor(private http: Http) {}
    getWeek(weekStart:Date) {
		weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        var week: Week = new Week(weekStart);
        this.http.get('http://192.168.99.100:3003/api/days?' + "start=" + weekStart.getTime())
			.subscribe(
                data => week.setData(data),
				err => console.error(err),
                () => console.log("Day request done")
			);
        return week;
    }
}