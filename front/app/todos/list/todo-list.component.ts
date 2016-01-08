import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core'
import {Todo} from './../models/todo'
import {TodoService} from './../service/todo.service'

@Component({
    selector: 'todo-list',
    templateUrl: 'app/todos/list/todo-list.html'
})
export class TodoListComponent {
    public todos: Todo[] = [];
    constructor(private _todoService: TodoService) { }


    getTodos() {
        this.todos = this._todoService.getTodos();
    }

    ngOnInit() {
        this.getTodos();
    }


}