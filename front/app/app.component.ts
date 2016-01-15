import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {GameComponent} from './numbers/component/game/game.component'
import {DashboardComponent} from './numbers/component/dashboard/dashboard.component'


@Component({
    selector: 'my-app',
    template: `
    <a [routerLink]="['Dashboard']">Dashboard</a>
    <router-outlet></router-outlet>
    `,
    styleUrls:['app/styles/style.css'],
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path:'/',      as: 'Dashboard',   component: DashboardComponent, useAsDefault: true},
    {path: '/game/:game', as: 'Game', component: GameComponent}
])
export class AppComponent {
    public title = 'Number Funk';
}
