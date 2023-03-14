import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from '../app.animations';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class PagesComponent implements OnInit {

  constructor(
    private contexts: ChildrenOutletContexts
  ) { }

  ngOnInit(): void {
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.
      route?.
      snapshot?.
      data?.
      ['animation'];
  }
  

}
