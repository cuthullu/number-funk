import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {GameComponent} from './numbers/component/game/game.component'


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
    {path:'/',      name: 'Dashboard',   component: GameComponent, useAsDefault: true}
])
export class AppComponent {
    public title = 'Number Funk';


}
