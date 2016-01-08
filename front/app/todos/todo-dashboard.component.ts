import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core'
import {Todo} from './models/todo'
import {TodoService} from './service/todo.service'
import {NewTodoFormComponent} from './form/new-todo-form.component'
import {TodoListComponent} from './list/todo-list.component'

@Component({
    selector: 'todo-dashboard',
    templateUrl: 'app/todos/todo-dashboard.html',
    directives: [NewTodoFormComponent, TodoListComponent]
})
export class TodoDashboardComponent {

}