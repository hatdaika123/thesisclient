import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { MessageService } from 'primeng/api';
import { UserForm } from 'src/app/models/UserForm.models';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { alertError, UrlHelper } from 'src/app/utils/helpers';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class LogInComponent implements OnInit {

  public form?: FormGroup;
  public processing: Boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userAuthService: UserAuthService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.processing || this.form?.invalid) return;
    this.processing = true;

    const userForm: UserForm = this.form?.getRawValue();
    this.userAuthService
      .userLoginUsingPOST(userForm)
      .subscribe({
        next: res => {
          this.localStorageService.store('user', res);
          this.router.navigateByUrl(UrlHelper.expense());
        },
        error: (err: HttpErrorResponse) => {
          alertError(this.messageService, err.error);
          this.processing = false;
        },
        complete: () => this.processing = false
      });
  }

  navigateToSignUpPage(): void {
    this.router.navigateByUrl(
      UrlHelper.signUp()
    );
  }

}
