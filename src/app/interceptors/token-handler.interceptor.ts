import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalStorageService } from "ngx-webstorage";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private localStorageService: LocalStorageService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const curUser = this.localStorageService.retrieve('user');
        if (curUser) {
            request = request.clone({
                setHeaders: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'X-Access-Token': curUser.token
                }
            });
        }
        return next.handle(request);
    }
} 