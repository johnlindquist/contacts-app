import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {Output} from "angular2/core";
import {EventEmitter} from "angular2/core";
import {Pipe} from "angular2/core";

@Component({
  selector: `contact-renderer`,
  template: `<style>
  .container {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }

  .info{
    margin-left: 10px;
    display: flex;
    flex-direction: column
  }

  .container:hover {
    background-color: #7fcaec;
  }

  .selected {
    background-color: #5890AD;
  }


  img {
    height: 50px;
    width: 50px;
  }
</style>
<div class="container" [ngClass]="{selected:selected}">
  <img [src]="contact.avatar">
  <div class="info">
    <h5>{{contact.name.last}}, {{contact.name.first}}</h5>
    <div>{{contact.email}}</div>
  </div>
</div>`
})
export class ContactRenderer {
  @Input() selected;
  @Input() contact;
}
