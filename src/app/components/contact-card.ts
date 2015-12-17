import {Component, Input, Output, EventEmitter} from "angular2/core";
@Component({
  selector: `contact-card`,
  template: `<style>
  .card{
    border: none;
  }
  img {
    height: 256px;
    width: 256px;
  }
</style>
<!--http://v4-alpha.getbootstrap.com/components/card/-->
<div class="card" *ngIf="contact">
  <div class="card-block">
    <h4 class="card-title">{{contact.name.first}} {{contact.name.last}}</h4>
    <h6 class="card-subtitle text-muted">{{contact.email}}</h6>
  </div>
  <img [src]="contact.avatar">
  <div class="card-block">
    <p class="card-text">{{contact.lorem}}</p>
    <p class="card-link" (click)="edit.emit(contact)">Edit</p>
  </div>
</div>`
})
export class ContactCard {
  @Input() contact;
  @Output() edit = new EventEmitter();

  constructor(){
    console.log('contact-card');
  }
}
