import {Injectable} from 'angular2/core';
import {Todo} from './../models/todo';

@Injectable()
export class TodoService {
    private todos: Todo[] = [new Todo("tresting")];



    getTodos(){
        return this.todos;
    }

    addTodo(todo :Todo){
        this.todos.push(todo);
    }
}