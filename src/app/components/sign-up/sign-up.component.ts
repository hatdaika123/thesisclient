import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserForm } from 'src/app/models/UserForm.models';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { alertError, alertSuccess, UrlHelper } from 'src/app/utils/helpers';
import { ConfirmationService } from 'primeng/api';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ConfirmationService]
})
export class SignUpComponent implements OnInit {

  public form?: FormGroup;
  public processing: boolean = false;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private userAuthService: UserAuthService,
    private confirmationService: ConfirmationService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.processing || this.form?.invalid) return;
    this.processing = true;

    const userForm: UserForm = this.form?.getRawValue();
    this.userAuthService
      .userSignUpUsingPOST(userForm)
      .subscribe({
        next: _ => {
          alertSuccess(this.messageService);
          this.confirmationService.confirm({
            message: "You've successfully registered to our app. Would you like to login?",
            header: 'Success',
            icon: 'pi pi-check',
            accept: () => {
              this.login(userForm);
            },
            reject: () => {
              this.resetForm();
            }
          });
        },
        error: (err: HttpErrorResponse) => {
          alertError(this.messageService, err.error);
          this.processing = false;
        },
        complete: () => this.processing = false
      });
  }

  resetForm(): void {
    this.form?.reset();
  }

  login(userForm: UserForm): void {
    if (this.processing) return;
    this.processing = true;

    this.userAuthService
      .userLoginUsingPOST(userForm)
      .subscribe({
        next: (res) => {
          this.localStorageService.store('user', res);
          this.router.navigateByUrl(UrlHelper.expense());
        },
        error: (err) => {
          alertError(this.messageService, err);
          this.processing = false;
        },
        complete: () => this.processing = false
      });
  }

}
