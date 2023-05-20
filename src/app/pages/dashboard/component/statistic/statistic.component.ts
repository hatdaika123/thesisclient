import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, forkJoin, switchMap, takeUntil } from 'rxjs';
import { LineChartDataDTO } from 'src/app/models/LineChartDataDTO.model';
import { PieChartDataDTO } from 'src/app/models/PieChartDataDTO.model';
import { StatisticService } from 'src/app/services/statistic.service';
import { TRANSACTION_TYPES, UrlHelper } from 'src/app/utils/helpers';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  public form?: FormGroup;
  public urlHelper = UrlHelper;
  public transactionTypes = TRANSACTION_TYPES;
  public dateTypes: DateType[] = [
    { name: 'Day', value: 'date' },
    { name: 'Week', value: 'week' },
    { name: 'Month', value: 'month' },
    { name: 'Year', value: 'year' }
  ];
  public theDateType: string = '';

  basicData: any;
  basicOptions: any = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#717171',
          fontSize: 14
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          display: false
        },
        grid: {
          display: false
        }
      }
    }
  };
  data: any;
  chartOptions: any = {
    plugins: {
      legend: {
        display: false
      }
    }
  };

  constructor(
    private fb: FormBuilder,
    private statisticService: StatisticService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete;
  }

  ngOnInit(): void {
    this.initForm();
  }

  loadDataThenDrawPieChart(): void {
    const { dateType, expenseType } = this.form?.getRawValue();
    this.statisticService
      .getPieChartDataUsingGET(expenseType, dateType)
      .subscribe({
        next: res => this.drawPieChart(res)
      });
  }

  drawPieChart(pieData: PieChartDataDTO[]): void {
    this.data = {
      labels: pieData?.length ? pieData.map(item => item.category?.name) : ['No Data'],
      datasets: [
        {
          data: pieData?.length ? pieData.map(item => item.amount) : [1],
          backgroundColor: pieData?.length ? pieData.map(item => item.category?.color) : ['grey']
        }
      ]
    };

    this.cd.detectChanges();
  }

  drawLineChart(lineData: LineChartDataDTO[]): void {
    const { expenseType } = this.form?.getRawValue();
    this.basicData = {
      labels: lineData.map(item => item._id),
      datasets: [
        {
          label: expenseType,
          data: lineData.map(item => item.data),
          fill: true,
          borderColor: expenseType === 'income' ? '#25A969' : '#E74C3C',
          tension: .4,
          backgroundColor: expenseType === 'income' ? '#2596be1c' : '#e74c3c1c'
        }
      ]
    };

    this.cd.detectChanges();
  }

  initForm(): void {
    this.form = this.fb.group({
      dateType: ['date'],
      expenseType: ['expense']
    });

    this.form?.controls['dateType']
      .valueChanges
      .pipe(
        takeUntil(
          this.destroy$
        ),
        switchMap(value => {
          this.theDateType = value;
          return forkJoin([
            this.statisticService
              .getPieChartDataUsingGET(this.form?.controls['expenseType'].value, value),
            this.statisticService
              .getLineChartDataUsingGET(this.form?.controls['expenseType'].value, value)
          ]);
        })
      )
      .subscribe({
        next: res => {
          this.drawPieChart(res[0]);
          this.drawLineChart(res[1]);
        }
      });

    this.form?.controls['expenseType']
      .valueChanges
      .pipe(
        takeUntil(
          this.destroy$
        ),
        switchMap(value => {
          return forkJoin([
            this.statisticService
              .getPieChartDataUsingGET(value, this.form?.controls['dateType'].value),
            this.statisticService
              .getLineChartDataUsingGET(value, this.form?.controls['dateType'].value)
          ]);
        })
      )
      .subscribe({
        next: res => {
          this.drawPieChart(res[0]);
          this.drawLineChart(res[1]);
        }
      });

    this.form?.controls['dateType'].setValue('date');
  }
}

interface DateType {
  name: string,
  value: string
}