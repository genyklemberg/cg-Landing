import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TeamsService} from '../../services/teams.service';


import {Team} from '../team';
import {Ng4TwitterTimelineService} from 'ng4-twitter-timeline/src';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css'],
  providers: [Ng4TwitterTimelineService]
})
export class TwitterComponent implements OnInit {
  @Input() twitter: string;
  selectedTwitter;
  // selectedTeam: Team = {
  //   id: undefined,
  //   title: 'Cyber Gates',
  //   imgPath: undefined,
  //   twitter: 'cybergates_gg',
  //   ranking: 1,
  //   wins: 1,
  //   looses: 0
  // };
  showTw;
  private subscription: Subscription;


  constructor(private teamsService: TeamsService,
              private route: ActivatedRoute,
              private ng4TwitterTimelineService: Ng4TwitterTimelineService) {
  }


  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.showTw = false;
          if (params['twitter']) {
            this.selectedTwitter = params['twitter'];
          } else {
            this.selectedTwitter = 'cybergates_gg';
          }
          // this.twitter = params['twitter'];
          // if (this.twitter !== '') {
          //   this.selectedTwitter = this.twitter;
          //   // this.subscription = this.teamsService.getTeam(this.id)
          //   //   .subscribe(team => this.selectedTwitter = team);
          // }
            setTimeout(() => this.showTw = true, 0)
        }
      );
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
