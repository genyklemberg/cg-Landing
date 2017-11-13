import {Component, EventEmitter, Output, OnInit, HostListener} from '@angular/core';
import {Router} from '@angular/router';

let runScrolling: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();

  constructor(public router: Router) { }

  ngOnInit() {
  }

  onSelected(feature: string) {
    this.featureSelected.emit(feature);
  }

  /* smooth scrolling */
  scrolling(event): void {
    event.preventDefault();

    clearInterval(runScrolling);

    let getHref: string = event.currentTarget.attributes.href.value;
    console.log(getHref, 1);
    let getElem: any = document.querySelector(getHref);
    console.log(getElem, 2);
    let elemPosition: number;
    let positionTop: number;
    let step: number;

    runScrolling = setInterval(() => {
      elemPosition = getElem.offsetTop;
      positionTop = window.pageYOffset;

      if (step >= -10 && step <= 10) {
        window.scrollTo(0, elemPosition);
        clearInterval(runScrolling);
      } else {
        scrollBy(0, step/10);
        step = Math.round(getElem.getBoundingClientRect().top);
        this.scrolling;
      }
    }, 10);
  }

}
