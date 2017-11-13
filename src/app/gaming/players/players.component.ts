import { Component, OnInit } from '@angular/core';
import {Player} from '../../shared/player';
import {Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {PlayersService} from '../../services/players.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  providers: [PlayersService]
})
export class PlayersComponent implements OnInit {
  players: Player[];
  screenSize: number;
  startAt = new Subject();
  endAt = new Subject();
  lastKeypress: number = 0;


  constructor(private playersService: PlayersService, private router: Router, private meta: Meta, private title: Title) {
    title.setTitle('World Dota 2 pro-players rankings list by region');
    meta.addTags([
      {
        name: 'url', content: 'https://www.cybergates.gg/pro-players/dota2/rankings'
      },
      {
        name: 'description', content: 'Choose Dota2 pro-players you like to follow their latest news with integrated twitter timeline'
      },
      {
        name: 'image', content: 'https://cybergates.gg/assets/img/pro_players.png'
      },
      {
        name: 'og:url', content: 'https://www.cybergates.gg/pro-players/dota2/rankings'
      },
      {
        name: 'og:type', content: 'website'
      },
      {
        name: 'og:title', content: 'Dota2 pro-players latest news timeline | Cyber Gates'
      },
      {
        name: 'og:description', content: 'Choose Dota2 pro-players you like to follow their latest news with integrated twitter timeline'
      },
      {
        name: 'og:image', content: 'https://cybergates.gg/assets/img/pro_players.png'
      },
      {
        name: 'og:image:width', content: '1200'
      },
      {
        name: 'og:image:height', content: '600'
      }
    ])
  }

  search($event) {
    if ($event.timeStamp - this.lastKeypress > 200) {
      let q = $event.target.value;
      this.startAt.next(q);
      this.endAt.next(q + '\uf8ff');
    }
    this.lastKeypress = $event.timeStamp
  }

  ngOnInit() {
    this.players = [];
    this.playersService
      .getPlayers()
      .subscribe((players: Player[]) => {
        this.players = players;
      });
    this.playersService
      .searchPlayers(this.startAt, this.endAt)
      .subscribe((players: Player[]) => {
      this.players = players;
    });
    this.screenSize = screen.width;
  }

}
