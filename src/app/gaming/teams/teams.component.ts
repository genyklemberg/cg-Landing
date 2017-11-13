import { Component, OnInit} from '@angular/core';
import {Team} from '../../shared/team';
import {TeamsService} from '../../services/teams.service';
import {Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [TeamsService]
})
export class TeamsComponent implements OnInit {
  teams: Team[];
  screenSize: number;

  constructor(private teamsService: TeamsService, private router: Router, private meta: Meta, private title: Title) {
    title.setTitle('Dota2 pro-teams latest news timeline | Cyber Gates');
    meta.addTags([
      {
        name: 'url', content: 'https://www.cybergates.gg/pro-teams/dota2/rankings'
      },
      {
        name: 'description', content: 'Choose Dota2 pro-teams you like to follow their latest news with integrated twitter timeline'
      },
      {
        name: 'image', content: 'https://cybergates.gg/assets/img/pro_teams.png'
      },
      {
        name: 'og:url', content: 'https://www.cybergates.gg/pro-teams/dota2/rankings'
      },
      {
        name: 'og:type', content: 'website'
      },
      {
        name: 'og:title', content: 'Dota2 pro-teams latest news timeline | Cyber Gates'
      },
      {
        name: 'og:description', content: 'Choose Dota2 pro-teams you like to follow their latest news with integrated twitter timeline'
      },
      {
        name: 'og:image', content: 'https://cybergates.gg/assets/img/pro_teams.png'
      },
      {
        name: 'og:image:width', content: '1200'
      },
      {
        name: 'og:image:height', content: '600'
      }
    ])
  }

  ngOnInit() {
    this.teams = [];
    this.teamsService.getTeams().subscribe((teams: Team[]) => {
      this.teams = teams;
    });
    this.screenSize = screen.width;
  }


}
