import {Component, Input, Output} from "angular2/core";
import {ControlGroup} from "angular2/common";
import {Control} from "angular2/common";
import {FormBuilder} from "angular2/common";
import {Validators} from "angular2/common";
import {EventEmitter} from "angular2/core";
@Component({
  selector: 'contact-edit',
  template: `<div *ngIf="contact">

  <form [ngFormModel]="contactForm" (submit)="update.emit(contactForm.value)">

    <div ngControlGroup="name">
      <fieldset class="form-group">
        <label for="firstName">First Name</label>
        <input ngControl="first" type="text" class="form-control" id="firstName" placeholder="First Name">
      </fieldset>

      <fieldset class="form-group">
        <label for="lastName">Last Name</label>
        <input ngControl="last" type="text" class="form-control" id="lastName" placeholder="Last Name">
      </fieldset>
    </div>

    <fieldset class="form-group">
      <label for="email">Email address</label>
      <input ngControl="email" type="email" class="form-control" id="email" placeholder="Email">
    </fieldset>

    <fieldset class="form-group">
      <label for="avatar">Image URL</label>
      <input ngControl="avatar" type="url" class="form-control" id="avatar" placeholder="An Image URL">
    </fieldset>

    <button type="submit">Submit</button>

  </form>
  <h6 *ngIf="!contactForm.valid" style="color:red">Please fill out every field</h6>

</div>

  `
})
export class ContactEdit {
  @Input() contact;

  contactForm:ControlGroup;
  @Output() update = new EventEmitter();

  constructor(public builder:FormBuilder) {
  }


  ngOnChanges(change) {
    if (change.contact.currentValue) {
      const {id, name:{first, last}, email, avatar} = change.contact.currentValue;

      this.contactForm = this.builder.group({
        id: [id],
        name: this.builder.group( {
          first: [first, Validators.required],
          last: [last, Validators.required],
        }),
        email: [email, Validators.required],
        avatar: [avatar, Validators.required],
      });

    }
  }
}
