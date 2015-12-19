import {Injectable} from "angular2/core";
import {ReplaySubject} from "rxjs/subject/ReplaySubject";
import {BehaviorSubject} from "rxjs/subject/BehaviorSubject";
import {Subject} from "rxjs/Subject";
import {Http, Headers, Response} from "angular2/http";

import "rxjs/Rx";


@Injectable()
export class ContactService {
  static BASE_URL = `http://localhost:3000/people`;
  static RANDOM_URL = `http://localhost:3000/random`;

  contactsStore = new ReplaySubject(1);
  contactsSubject = new BehaviorSubject([]);

  selectedContactStore = new Subject();

  loadContactSubject = new Subject();
  loadContactStore = new Subject();

  postContactSubject = new Subject();
  postContactStore = new Subject();

  putContactSubject = new Subject();
  putContactStore = new Subject();

  randomSubject = new Subject();
  randomStore = new Subject();


  constructor(public http:Http) {
    this.contactsSubject.mergeMap((val:any)=> {
      return this.http
        .get(`${ContactService.BASE_URL}?_start=0&_limit=100`)
        .map(res => res.json())
    }).map((contacts:[any])=> {
      if (!contacts) return contacts;
      //sorting by last name
      return contacts.sort((a:any, b:any)=> {
        const aName = a.name.last;
        const bName = b.name.last;
        if(aName > bName) return 1;
        if(aName < bName) return -1;
        return 0;
      })
    }).subscribe(this.contactsStore);


    this.postContactSubject
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
      })
      .map((res)=> res.json())
      .subscribe(this.postContactStore);

    this.putContactSubject
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
          .map((res:Response) => res.json())})
          .subscribe(this.putContactStore);

    this.loadContactSubject
      .mergeMap((id)=> this.http
        .get(`${ContactService.BASE_URL}/${id}`)
        .map((res:Response) => res.json()))
        .subscribe(this.loadContactStore);


    this.postContactStore
      .subscribe(this.contactsSubject);

    this.putContactStore
      .subscribe(this.contactsSubject);

    this.loadContactStore
      .subscribe(this.selectedContactStore);

    this.randomSubject
      .mergeMap(()=> {
        return this.http
          .get(`${ContactService.RANDOM_URL}/`)
          .map((res:Response) => res.json())})
          .subscribe(this.randomStore)
  }
}

