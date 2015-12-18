import {Injectable} from "angular2/core";
import {ReplaySubject} from "rxjs/subject/ReplaySubject";
import {BehaviorSubject} from "rxjs/subject/BehaviorSubject";
import {Subject} from "rxjs/Subject";
import {Http, Headers, Response} from "angular2/http";

import "rxjs/Rx";


@Injectable()
export class ContactService {
  static BASE_URL = `http://localhost:3000/people`;

  contactsStore = new ReplaySubject(1);
  contactsSubject = new BehaviorSubject([]);

  contacts = this.contactsSubject.mergeMap((val:any)=> {
    return this.http
      .get(`${ContactService.BASE_URL}?_start=0&_limit=100`)
      .map(res => res.json())
  }).map((contacts:[any])=> {
    if (!contacts) return contacts;
    //sorting by last name
    return contacts.sort((a, b)=> {
      const aName = a.name.last;
      const bName = b.name.last;
      if(aName > bName) return 1;
      if(aName < bName) return -1;
      return 0;
    })
  }).subscribe(this.contactsStore);

  newContactSubject = new ReplaySubject(1);

  newContact = this.newContactSubject
    .mergeMap((contact:any)=> {
      return this.http
        .post(
          `${ContactService.BASE_URL}`,
          JSON.stringify(contact),
          {
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          }
        )
    });

  selectedContactStore = new Subject();

  loadContactSubject = new Subject();
  loadContact = this.loadContactSubject
    .mergeMap((id)=> this.http
      .get(`${ContactService.BASE_URL}/${id}`)
      .map((res:Response) => res.json()));



  putContactSubject = new Subject();
  putContact = this.putContactSubject
    .mergeMap((contact)=> {
      return this.http
      .put(
        `${ContactService.BASE_URL}/${contact.id}`,
        JSON.stringify(contact),
        {
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
      .map((res:Response) => res.json())});


  constructor(public http:Http) {

    //When I create or update a contact, I want to refresh the contacts
    this.newContact
      .subscribe(this.contactsSubject);

    this.putContact
      .subscribe(this.contactsSubject);

    this.loadContact
      .subscribe(this.selectedContactStore);
  }
}

