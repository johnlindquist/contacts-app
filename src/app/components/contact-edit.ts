import {Component, Input, Output} from "angular2/core";
@Component({
  selector:'contact-edit',
  template:`I'm an edit component`
})
export class ContactEdit{
  @Input() contact;

  constructor(){
    console.log('contact-edit');
  }

  ngOnInit(){
    console.log(this.contact);
  }
}
