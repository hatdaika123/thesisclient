import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { switchMap, tap } from 'rxjs';
import { CategoryDTO } from 'src/app/models/CategoryDTO.model';
import { ExpenseDTO } from 'src/app/models/ExpenseDTO.model';
import { PageOfExpenseDTO } from 'src/app/models/PageOfExpenseDTO.model';
import { CategoryService } from 'src/app/services/category.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { UrlHelper, alertError } from 'src/app/utils/helpers';

@Component({
  selector: 'expense-history',
  templateUrl: './expense-history.component.html',
  styleUrls: ['./expense-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class ExpenseHistoryComponent implements OnInit {

  public expenses: ExpenseDTO[] = [];
  private LIMIT: number = 10;
  public urlHelper = UrlHelper;

  constructor(
    private expenseService: ExpenseService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService
      .getExpensesUsingGET(0, this.LIMIT)
      .pipe(
        tap(data => {
          this.expenses = data.data;
        }),
        switchMap((data: PageOfExpenseDTO) => {
          const categoryIds: string[] = data.data.map(e => e.categoryId || '');
          return this.categoryService.listCategoryByIdsUsingGET(categoryIds);
        })
      )
      .subscribe({
        next: res => {
          if (!res || !res.length) return;
          let obj: { [key: string]: CategoryDTO } = {};
          res.forEach(item => obj[<string>item._id] = item);

          this.expenses.forEach(expense => {
            expense.category = {...obj[<string>expense.categoryId]}
          });

          this.cd.detectChanges();
        },
        error: (err: HttpErrorResponse) => {
          alertError(this.messageService, err.error);
        }
      });
  }

}
