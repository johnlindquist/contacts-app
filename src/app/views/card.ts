import {Component} from "angular2/core";
import {Router, RouteData, RouteParams} from "angular2/router";

import {ContactCard} from "../components/contact-card";
import {ContactEdit} from "../components/contact-edit";

import {ContactService} from "../services/contacts-service";

@Component({
  directives: [ContactCard, ContactEdit],
  template: `
    <div [ngSwitch]="routeData.get('state')">
      <contact-card
        *ngSwitchWhen="'view'"
        [contact]="service.selectedContactStore | async"
        (edit)="onEdit($event)"
        >
      </contact-card>
      <contact-edit
        *ngSwitchWhen="'edit'"
        [contact]="service.selectedContactStore | async"
        (update)="onUpdate($event)"
      >
      </contact-edit>
    </div>
  `
})
export class Card {
  state;

  /*
   We reuse this `Card` for all the card related routes
   This prevents the router from caching the card
   */
  routerCanReuse() {
    return false;
  }

  onEdit(contact) {
    this.router.navigate(['../ContactEdit', {id: contact.id}])
  }

  onUpdate(event){
    this.service.putContact.subscribe((contact)=>{
      this.router.navigate(['../ContactCard', {id:contact.id}])
    });

    this.service.putContactSubject.next(event);
  }

  constructor(routeParams:RouteParams, public service:ContactService, public routeData:RouteData, public router:Router) {
    service.loadContactSubject.next(routeParams.get('id'));
  }
}
