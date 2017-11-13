import { Injectable } from '@angular/core'
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Player} from '../shared/player';

@Injectable()
export class PlayersService {

  players: FirebaseListObservable<Player[]>;
  player: FirebaseObjectObservable<Player>;

  constructor(private db: AngularFireDatabase) {
    this.players = this.db.list('/players');
  }

  getPlayers(): FirebaseListObservable<Player[]> {
    return this.players = this.db.list('/players', { query: { orderByChild: '/region', startAt: true }});
  }

  searchPlayers(start, end): FirebaseListObservable<any> {
    return this.db.list('/players', {
      query: {
        searchByTitle: 'Title',
        orderByChild: 'nick',
        startAt: start,
        endAt: end
      }
    });
  }



  getPlayer(index: number) {
    return this.db.object('/players/' + index);
  }

}
