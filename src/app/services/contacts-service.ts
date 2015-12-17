import {Injectable} from "angular2/core";
import {ReplaySubject} from "rxjs/subject/ReplaySubject";
import {BehaviorSubject} from "rxjs/subject/BehaviorSubject";
import {Subject} from "rxjs/Subject";
import {Http} from "angular2/http";
import {Headers} from "angular2/http";
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
      .map(res => res.json()));

  constructor(public http:Http) {
    /*
     1. `newContact` is Observing `newContactSubject` which is
     called above. So a `newContactSubject.next()` flows to a
     `newContact.subscribe()`.

     2. `contactsSubject` is the ReplaySubject which stores the
     data.

     When you `.subscribe(subject)`, it calls `.next()` on the
     `subject`. In our case, `contactsSubject` triggers the
     `http.get` all contacts request.
     */
    this.newContact
      .subscribe(this.contactsSubject);

    this.loadContact.subscribe(this.selectedContactStore);
  }
}

