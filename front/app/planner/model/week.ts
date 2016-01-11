import {Day} from './day';
export class Week {
    public date: Date;
    public days: Day[] = new Array(7);

    constructor(date?: Date) {
        this.date = date;
        this.fillWeek();
    }

    setData (data) {
		if(data.body !== undefined){
			data.body.forEach(day=> {
				this.days[day.date.getDay()] = day;
			});

		}
    }


    private fillWeek() {
		for (var i = 0; i < this.days.length; i ++) {
			if(this.days[i] === undefined)	{
				var nd = new Date(this.date.getTime());
				nd.setDate(nd.getDate() + i);
				this.days[i] = new Day(nd);
			}
		}
    }
}
