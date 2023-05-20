import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { UrlHelper } from 'src/app/utils/helpers';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public urlHelper = UrlHelper;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  onLogOutClicked(): void {
    this.localStorageService.clear('user');
    this.router.navigateByUrl(this.urlHelper.logIn());
  }

}
