module IdProvider {
    var currentTodoId = 0;
    export function getNextTodoId(){
        return currentTodoId++;
    }
}
export class Todo {
    public id: number;
    public message: string;
    public checked: boolean = false;

    constructor(message?:string){
        this.message = message || undefined;
        this.id = IdProvider.getNextTodoId();
    }

    toggleChecked() {
        this.checked = !this.checked;
    }
}
