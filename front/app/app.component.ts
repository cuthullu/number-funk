import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core'
import {Todo} from './todos/models/todo'
import {NewTodoFormComponent} from './todos/form/new-todo-form.component'
import {WeekPlannerComponent} from './planner/component/week/week-planner.component'
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {TodoDashboardComponent} from './todos/todo-dashboard.component'

@Component({
    selector: 'my-app',
    template: `
    <a [routerLink]="['Dashboard']">Dashboard</a>
    <a [routerLink]="['Week', {index:0}]">This Week</a>
    <a [routerLink]="['Week', {index:1}]">This Week</a>
    <router-outlet></router-outlet>
    `,
    styleUrls:['app/styles/style.css'],
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/week/:index', name: 'Week', component: WeekPlannerComponent },
    { path: '/week', name: 'Weeker', component: TodoDashboardComponent },
    {path:'/',      name: 'Dashboard',   component: TodoDashboardComponent, useAsDefault: true}
])
export class AppComponent {
    public title = 'Meal Planner';


}
