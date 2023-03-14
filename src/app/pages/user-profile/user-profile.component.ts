import { Component, OnInit } from '@angular/core';
import { UrlHelper } from 'src/app/utils/helpers';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public urlHelper = UrlHelper;

  constructor() { }

  ngOnInit(): void {
  }

}
