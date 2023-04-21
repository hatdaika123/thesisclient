import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { UrlHelper } from '../utils/helpers';
import { UserAuthService } from '../services/user-auth.service';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userAuthService: UserAuthService,
    private localStorageService: LocalStorageService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.localStorageService.retrieve('user');
    if (!user) {
      this.router.navigateByUrl(UrlHelper.logIn());
      return false;
    }

    return this.userAuthService
      .verifyTokenUsingPOST(user.token)
      .pipe(
        map(_ => {
          return true;
        }),
        catchError(_ => {
          this.router.navigateByUrl(UrlHelper.logIn());
          return EMPTY;
        })
      );
  }
  
}
