import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { concatMap, tap } from 'rxjs';
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
export class ExpenseHistoryComponent implements OnInit, AfterViewInit {

  @Input() header: string = 'transactions history';
  @Input() showHeader: boolean = true;
  @Input() loadOnScroll: boolean = false;
  @Input() limit: number = 5;
  @Input() sort: string = 'date,desc';
  @ViewChild('anchor') anchorEl?: ElementRef;

  public expenses: ExpenseDTO[] = [];
  public urlHelper = UrlHelper;
  private end$?: IntersectionObserver;
  private currentPage: number = 0;

  constructor(
    private expenseService: ExpenseService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    if (!this.loadOnScroll) {
      this.loadExpenses(0);
    }
  }

  loadExpenses(page: number): void {

    this.expenseService
      .getExpensesUsingGET(page, this.limit, this.sort)
      .pipe(
        tap(data => {
          this.expenses.push(...data.data);
          if (((data.currentPage + 1) * data.pageSize >= data.total)) {
            this.end$?.unobserve(this.anchorEl?.nativeElement);
          }
        }),
        concatMap((data: PageOfExpenseDTO) => {
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

  ngAfterViewInit(): void {
    if (!this.anchorEl) return;

    this.end$ = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        this.loadExpenses(this.currentPage);
        this.currentPage++;
      });
    });

    this.end$.observe(this.anchorEl.nativeElement);
  }

}
