import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {Output} from "angular2/core";
import {EventEmitter} from "angular2/core";
import {Pipe} from "angular2/core";
import {ContactRenderer} from "./contact-renderer";


@Component({
  selector: `contact-list`,
  directives: [ContactRenderer],
  template: `<style>
  .contact-list {
    display: flex;
    flex-direction: column;
    height: 600px;
    width: 400px;
    overflow-y: auto;
    margin-left: 10px;
  }

  h2 {
    margin-top: 15px;
  }
</style>
<div class="contact-list" *ngIf="contacts">
  <div *ngFor="#contact of contacts">
    <h2 *ngIf="showBigLetter(contact)">{{getBigLetter(contact)}}</h2>
    <contact-renderer
      [selected]="contact.id == selectedContact?.id"
      (click)="select.emit(contact)"
      [contact]="contact"
    >
    </contact-renderer>
  </div>

</div>`
})
export class ContactList {

  @Input() selectedContact;
  @Input() contacts;
  @Output() select = new EventEmitter();

  getBigLetter(contact) {
    return contact.name.last.substr(0, 1);
  }

  _currentLetter = "";
  showBigLetter(contact) {
    let bigLetter = this.getBigLetter(contact);

    if (bigLetter === this._currentLetter) {
      return false;
    }

    this._currentLetter = bigLetter;
    return true;
  }


}
