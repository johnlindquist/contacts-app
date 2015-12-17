
import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";

import {ContactService} from "./app/services/contacts-service";
import {RouteConfig} from "angular2/router";
import {Route} from "angular2/router";
import {Home} from "./app/views/home";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {ROUTER_PROVIDERS} from "angular2/router";
import {HTTP_PROVIDERS} from "angular2/http";
import {APP_BASE_HREF, Location} from "angular2/router";
import {Redirect} from "angular2/router";

// The three "..." indicate this route has "child" routes, otherwise "/" terminates the route
@RouteConfig([
  new Route({path: '/app/...', component: Home, name: 'Home', useAsDefault: true}),
])
@Component({
  selector: 'app',
  directives:[ROUTER_DIRECTIVES],
  template:`
    <router-outlet></router-outlet>
  `,
})
export class App{}

bootstrap(App, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  Location,
  ContactService
]);
