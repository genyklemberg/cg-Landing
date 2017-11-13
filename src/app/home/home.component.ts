import { Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';
import {SubscriberService} from '../services/subscriber.service';
import {User} from '../shared/user';
import { trigger, state, style, transition, animate} from '@angular/animations';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SubscriberService, AngularFireDatabase],
  animations: [
    trigger('myAwesomeAnimation', [
      state('show', style({
        opacity: 1,
      })),
      state('hide', style({
        opacity: 0.1,
      })),
      transition('show => hide', animate('1000ms ease-in'
      )),
    ]),
  ]
})
export class HomeComponent implements OnInit {
  user: User;
  newUser = this._resetNewUserObj();
  subscribeForm: FormGroup;
  name: string;
  email: string;
  message: string;
  date: Date;
  submitted = false;
  state = 'show';
  submit = false;

  constructor(private subscriberService: SubscriberService, private meta: Meta, private title: Title) {
    title.setTitle('Cyber Gates | Your 1st Step in Gaming World');
    meta.addTags([
      {
        name: 'url', content: 'https://www.cybergates.gg'
      },
      {
        name: 'description', content: 'A Major Gaming hub for new and pro players. ' +
      'No matter what games you play Dota2, Lol, CS:GO, PUBG, HotS, FIFA, Heartstone or some others you\'ll definitely find something' +
      'for your needs'
      },
      {
        name: 'image', content: 'https://cybergates.gg/assets/img/logo.jpg'
      },
      {
        name: 'og:url', content: 'https://www.cybergates.gg'
      },
      {
        name: 'og:type', content: 'website'
      },
      {
        name: 'og:title', content: 'Cyber Gates | Your 1st Step in Gaming World'
      },
      {
        name: 'og:description', content: 'A Major Gaming hub for new and pro players. ' +
      'No matter what games you play Dota2, Lol, CS:GO, PUBG, HotS, FIFA, Heartstone or some others you\'ll definitely find something' +
      'for your needs'
      },
      {
        name: 'og:image', content: 'https://cybergates.gg/assets/img/logo.jpg'
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
    this.subscribeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'message': new FormControl(null)
    });
  }

  addUser (name, email, message, date){
    // TODO: add form validation
    this.newUser = {
      name,
      email,
      message,
      date
    }

    this.subscriberService.addNewUser(this.newUser);
    // TODO: need to implement return promise method if event added successfully
    this.newUser = this._resetNewUserObj();
  }

  private _resetNewUserObj(){
    let user: User = {
      name: '',
      email: '',
      message: '',
      date: new Date()
    };
    return user;
  }

  onSubmit(value) {
    let that = this;
    if ( this.subscribeForm.get('name').valid && this.subscribeForm.get('email').valid) {
      this.name = value.name;
      this.email = value.email;
      this.message = value.message;
      this.date = new Date();
      this.addUser(this.name, this.email, this.message, this.date);
      this.subscribeForm.reset();
      this.myAnime();
      window.setTimeout(function() {
        console.log('work');
        that.submitted = true;
      }, 1000);
    } else { this.submit = true; }
  }

  myAnime() {
    this.state = (this.state === 'show' ? 'hide' : 'show');
  }

  // scrollToTop(event) {
  //   (function smoothscroll(): void {
  //     event.preventDefault();
  //
  //     let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  //     if (currentScroll > 0) {
  //       window.requestAnimationFrame(smoothscroll);
  //       window.scrollTo(0, currentScroll - (currentScroll / 10));
  //     }
  //   })();
  // }

}
