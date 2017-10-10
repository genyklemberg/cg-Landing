import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../shared/user';
import {
  AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable
} from 'angularfire2/database';

@Injectable()
export class SubscriberService {

  users: FirebaseListObservable<User[]>;
  user: FirebaseObjectObservable<User>;

  constructor(private db: AngularFireDatabase) {
    this.users = db.list('/users');
  }

  addNewUser(user: User) {
    this.users.push(this.convertUser(user));
  }

  // convert date to string, Firebase cannot save Date object!
  private convertUser (user: User) {
    const obj = {};
    for (const prop in user) {
      if (prop === 'date'){
        obj[prop] = user[prop].toUTCString();
      } else {
        obj[prop] = user[prop];
      }
    }
    return obj;
  }

}
