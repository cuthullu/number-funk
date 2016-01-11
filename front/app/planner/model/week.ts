import {Day} from './day';
export class Week {
    public date: Date;
    public days: Day[] = [];

    constructor(date?: Date) {
        this.date = date;
    }

    setData (data) {
		if(data.body !== undefined){
			this.days = this.days.concat(data.body);
		}
    	if(data.length < 7 || data.length === undefined) {
			this.newWeek();
    	}
    }


    private newWeek() {
		while (this.date.getDay() <= 6 && this.days.length < 7) {
			this.days.push(new Day(new Date(this.date.getTime())));
			this.date.setDate(this.date.getDate() + 1)
		}
		this.date.setDate(this.date.getDate() + 7);
		return this.days;
    }
}
