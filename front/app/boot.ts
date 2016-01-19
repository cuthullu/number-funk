import {bootstrap}    from 'angular2/platform/browser'
import {ROUTER_PROVIDERS,LocationStrategy,HashLocationStrategy } from 'angular2/router'
import {HTTP_PROVIDERS,RequestOptions,BaseRequestOptions,Headers} from 'angular2/http';
import {provide} from 'angular2/core';
import {AppComponent} from './app.component'
import {GameService} from './numbers/service/game.service'
import {RoundService} from './numbers/service/round.service'
import {ToastService} from './numbers/service/toast.service'
import {ApiConnectionService} from './numbers/service/apiConnection.service'

var headers = new Headers();
headers.append('Content-Type', 'application/json');
class MyOptions extends BaseRequestOptions {
  headers = headers;
}

bootstrap(AppComponent, [
    ApiConnectionService,
    GameService,
    RoundService,
    ToastService,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(RequestOptions, {useClass:MyOptions})
     ]);
