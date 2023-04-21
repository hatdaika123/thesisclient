import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { CategoryDTO } from 'src/app/models/CategoryDTO.model';
import { ExpenseDTO } from 'src/app/models/ExpenseDTO.model';
import { CategoryService } from 'src/app/services/category.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { TRANSACTION_TYPES, alertError } from 'src/app/utils/helpers';
import { UrlHelper, alertSuccess } from 'src/app/utils/helpers';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ConfirmationService]
})
export class ExpenseFormComponent implements OnInit {

  public urlHelper = UrlHelper;
  public transactionTypes = TRANSACTION_TYPES;
  public form?: FormGroup;
  public categories: CategoryDTO[] = [];
  public submitting: boolean = false;
  public loading: boolean = false;
  public deleting: boolean = false;
  public expense?: ExpenseDTO;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private cd: ChangeDetectorRef,
    private expenseService: ExpenseService,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.initCategoryDropdown();
    this.activatedRoute
      .params
      .subscribe({
        next: res => {
          if (!res['id']) {
            this.initForm();
            return;
          }
          this.loadExpenseThenInitForm(res['id']);
        }
      });
  }

  initCategoryDropdown(): void {
    this.categoryService
      .listAllUserCategoryUsingGET()
      .subscribe({
        next: res => {
          this.categories = res;
          this.cd.detectChanges();
        }
      });
  }

  loadExpenseThenInitForm(id: string): void {
    if (this.loading) return;

    this.expenseService
      .getExpenseByIdUsingGET(id)
      .pipe(
        finalize(() => {})
      )
      .subscribe({
        next: res => {
          if (!res) {
            this.initForm();
            return;
          }
          this.expense = res;
          this.initForm(this.expense);
        },
        error: (err: HttpErrorResponse) => {
          alertError(this.messageService, err.error);
        }
      });
  }

  initForm(expense?: ExpenseDTO): void {
    this.form = this.fb.group({
      _id: [expense?._id],
      type: [expense?.type || 'expense', Validators.required],
      date: [expense?.date || new Date(), Validators.required],
      amount: [expense?.amount || null, Validators.required],
      categoryId: [expense?.categoryId, Validators.required],
      description: [expense?.description],
      location: [expense?.location],
      images: [expense?.images || []]
    });
    this.cd.detectChanges();
  }

  submit(): void {
    if (this.form?.invalid) return;
    if (this.submitting) return;
    this.submitting = true;

    this.expenseService
      .saveExpenseUsingPOST(
        this.form?.getRawValue()
      )
      .pipe(
        finalize(() => {
          this.submitting = false;
        })
      )
      .subscribe({
        next: _ => {
          alertSuccess(this.messageService);
          this.router.navigateByUrl(UrlHelper.expense());
        },
        error: (err: HttpErrorResponse) => {
          alertError(this.messageService, err.error);
        }
      });
  }

  onDeleteClicked(): void {
    if (!this.expense?._id) return;

    this.confirmationService.confirm({
      message: "Are you sure to delete this transaction?",
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteExpenseById(<string>this.expense?._id);
      }
    });
  }

  deleteExpenseById(id: string): void {
    if (this.deleting) return;
    this.deleting = true;

    this.expenseService
      .deleteExpenseByIdUsingDELETE(id)
      .subscribe({
        next: _ => {
          alertSuccess(this.messageService, 'Deleted.');
          this.deleting = false;
          this.router.navigateByUrl(this.urlHelper.expense());
        },
        error: (err: HttpErrorResponse) => {
          this.deleting = false;
          alertError(this.messageService, err.error);
        }
      });
  }
}
