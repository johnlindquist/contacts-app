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
    .home{
      max-width: 1040px;
      margin-left: auto;
      margin-right: auto;
      border: 2px solid #d1d1d3;
      display: flex;
      flex-direction: row;
      padding: 0;
    }

    .left{
      display: flex;
      flex-direction: column;
    }

    .right{
      width: 100%;
    }
  </style>
  <div class="home">
      <div class="left">
      <button class="btn-primary" (click)="onAdd()">Add New Contact</button>
      <contact-list
        [contacts]="service.contactsStore | async"
        (select)="onSelect($event)"
        [selectedContact]="service.selectedContactStore | async"
      ></contact-list>
    </div>

    <div class="right">
      <router-outlet></router-outlet>
    </div>

  </div>`
})
export class Home {
  onAdd(){
    this.router.navigate(['./ContactNew'])
  }

  onSelect(contact) {
    this.router.navigate(['./ContactCard', {id: contact.id}])
  }

  constructor(public router:Router, public service:ContactService) {
    this.service.postContactStore.subscribe((contact)=> {
      this.router.navigate(['./ContactCard', {id: contact.id}])
    });

    this.service.putContactStore.subscribe((contact)=> {
      this.router.navigate(['./ContactCard', {id: contact.id}])
    });
  }
}
