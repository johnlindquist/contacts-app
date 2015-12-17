import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router, Route} from "angular2/router";

import {Card} from "./card";
import {FirstLoad} from "./first-load";

import {ContactCard} from "../components/contact-card";
import {ContactEdit} from "../components/contact-edit";
import {ContactList} from "../components/contact-list";

import {ContactService} from "../services/contacts-service";

@RouteConfig([
  new Route({path: '/loading', component: FirstLoad, name: 'FirstLoad', useAsDefault:true}),
  new Route({path: '/:id', component: Card, name: 'ContactCard', data:{state:'view'}}),
  new Route({path: '/:id/edit', component: Card, name: 'ContactEdit', data:{state:'edit'}}),
  new Route({path: '/new', component: Card, name: 'ContactNew', data:{state:'new'}})
])
@Component({
  directives: [ContactList, ContactCard, ROUTER_DIRECTIVES],
  template: `
  <style>
    .container{
      border: 2px solid #d1d1d3;
      display: flex;
      flex-direction: row;
    }
  </style>
  <div class="container">
    <contact-list
      [contacts]="service.contactsStore | async"
      (select)="onSelect($event)"
      [selectedContact]="service.selectedContactStore | async"
    ></contact-list>

    <router-outlet></router-outlet>
  </div>`
})
export class Home {
  onSelect(contact) {
    this.router.navigate(['./ContactCard', {id: contact.id}])
  }

  constructor(public router:Router, public service:ContactService) {
  }
}
