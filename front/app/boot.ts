import {bootstrap}    from 'angular2/platform/browser'
import {ROUTER_PROVIDERS} from 'angular2/router'
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './app.component'
import {NumberService} from './numbers/service/number.service'
import {GameService} from './numbers/service/game.service'
import {RoundService} from './numbers/service/round.service'

bootstrap(AppComponent, [NumberService, GameService, RoundService, ROUTER_PROVIDERS, HTTP_PROVIDERS]);
