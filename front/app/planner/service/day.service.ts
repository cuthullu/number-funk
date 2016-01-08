import {Injectable} from 'angular2/core';
import {Day} from './../models/day';
import {Http, HTTP_PROVIDERS} from 'angular2/http';


@Injectable()
export class DayService {
    constructor(private http: Http) {}
    getWeek(weekStart:Date) {
		weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        var week: Day[] = [];
        this.http.get('http://192.168.99.100:3003/api/days?' + "start=" + weekStart.getTime())
			.subscribe(
				data => week.concat(data),
				err => console.error(err),
				() => console.log()
			);
		return week;

    }

    addTodo(todo: Todo) {
        this.todos.push(todo);
    }
}