export class Day {
    public _id: number;
    public date: Date;
    public meals: string[];

    constructor(date?: Date) {
        this.date = date;
        this.meals = [];
    }
}
