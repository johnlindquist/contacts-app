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
      <contact-edit
        *ngSwitchWhen="'new'"
        [contact]="service.randomStore | async"
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

  onUpdate(contact){
    console.log('onUpdate');
    if(contact.id){
      this.service.putContactSubject.next(contact);
    }else{
      this.service.postContactSubject.next(contact);
    }
  }

  constructor(routeParams:RouteParams, public service:ContactService, public routeData:RouteData, public router:Router) {
    const id = routeParams.get('id');

    //if we have an id, we're editing. If not, we're creating a new contact.
    if(id) {
      service.loadContactSubject.next(id);

    }else{
      this.service.randomSubject.next();
    }
  }
}
