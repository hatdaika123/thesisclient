import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserForm } from '../models/UserForm.models';
import { UserDTO } from '../models/UserDTO.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAuthDTO } from '../models/UserAuthDTO.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  userSignUpUsingPOST(form: UserForm): Observable<UserDTO> {
    const url: string = `${environment.api}/signup`;
    return this.httpClient
      .post<UserDTO>(url, form);
  }

  userLoginUsingPOST(form: UserForm): Observable<UserAuthDTO> {
    const url: string = `${environment.api}/login`;
    return this.httpClient
      .post<UserAuthDTO>(url, form);
  }
}
