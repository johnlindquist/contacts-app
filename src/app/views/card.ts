import {Component} from "angular2/core";
import {Router, RouteData, RouteParams} from "angular2/router";

import {ContactCard} from "../components/contact-card";
import {ContactEdit} from "../components/contact-edit";

import {ContactService} from "../services/contacts-service";

@Component({
  directives: [ContactCard, ContactEdit],
  template: `
    <div [ngSwitch]="state">
      <contact-card
        *ngSwitchWhen="'view'"
        [contact]="service.selectedContactStore | async"
        (edit)="onEdit($event)"
        >
      </contact-card>
      <contact-edit
        *ngSwitchWhen="'edit'"
        [contact]="service.selectedContactStore | async"

      >
      </contact-edit>
    </div>
  `
})
export class Card {
  state;

  onEdit(contact){
    console.log('contact', this.router);
    this.router.navigate(['../ContactEdit', {id:contact.id}])
  }

  constructor(routeParams:RouteParams, public service:ContactService, public routeData:RouteData, public router:Router) {
    console.log('card', routeData.get('state'));

    this.state = routeData.get('state');

    if(this.state == 'view'){
      const id = routeParams.get('id');
      service.loadContactSubject.next(id);
    }
  }
}
