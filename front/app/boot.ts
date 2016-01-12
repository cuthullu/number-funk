import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {NumberService} from './numbers/service/number.service'
import {ROUTER_PROVIDERS} from 'angular2/router'
import {HTTP_PROVIDERS} from 'angular2/http';

bootstrap(AppComponent, [NumberService, ROUTER_PROVIDERS, HTTP_PROVIDERS]);
