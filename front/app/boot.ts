import {bootstrap}    from 'angular2/platform/browser'
import {ROUTER_PROVIDERS} from 'angular2/router'
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './app.component'
import {NumberService} from './numbers/service/number.service'
import {GameService} from './numbers/service/game.service'
import {RoundService} from './numbers/service/round.service'
import {ToastService} from './numbers/service/toast.service'

bootstrap(AppComponent, [NumberService, GameService, RoundService, ToastService, ROUTER_PROVIDERS, HTTP_PROVIDERS]);
