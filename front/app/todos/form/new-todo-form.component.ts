import {Component} from 'angular2/core'
import {Todo} from './../models/todo'
import {TodoService} from './../service/todo.service'

@Component({
    selector : 'todo-form',
    templateUrl: 'app/todos/form/new-todo-form.html'

})

export class NewTodoFormComponent {
    public todo: Todo = new Todo();

    constructor(private _todoService: TodoService) { }

    onSubmit() {
        this._todoService.addTodo(this.todo);
        this.todo = new Todo();
    }
}