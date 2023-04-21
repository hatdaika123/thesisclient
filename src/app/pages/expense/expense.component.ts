import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { StatisticService } from 'src/app/services/statistic.service';
import { UrlHelper } from 'src/app/utils/helpers';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseComponent implements OnInit {

  public urlHelper = UrlHelper;
  public expense: number = 0;
  public income: number = 0;
  public username?: string;

  constructor(
    private statisticService: StatisticService,
    private cd: ChangeDetectorRef,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.username = this.localStorageService.retrieve('user').username;
    this.loadOverview();
  }

  loadOverview(): void {
    this.statisticService
    .getOverviewSummaryUsingGET()
    .subscribe({
      next: res => {
        this.expense = res.expense;
        this.income = res.income;
        this.cd.detectChanges();
      }
    });
  }

}
