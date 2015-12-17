import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {ContactService} from "../services/contacts-service";
@Component({
  template: `loading...`
})
export class FirstLoad {
  constructor(router:Router, service:ContactService) {
    //the delay is just to show it working, you can remove it
    setTimeout(()=> {
        service.contactsStore.subscribe((contacts)=> {
          router.navigate(['../ContactCard', {id: contacts[0].id}])
        })
      }, 1000
    )
  }
}
