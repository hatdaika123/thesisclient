import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UrlHelper } from 'src/app/utils/helpers';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticComponent implements OnInit {

  public urlHelper = UrlHelper;
  public dateTypes: DateType[] = [
    { name: 'Day', value: 'day' },
    { name: 'Week', value: 'week' },
    { name: 'Month', value: 'month' },
    { name: 'Year', value: 'year' }
  ];

  basicData: any;
  basicOptions: any;
  data: any;
  chartOptions: any;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.basicData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Income',
          data: [65, 59, 80, 81, 56, 55, 60],
          fill: true,
          borderColor: '#25A969',
          tension: .4,
          backgroundColor: '#2596be1c'
        }
      ]
    };
    this.basicOptions = {
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

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D"
          ]
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  }
}

interface DateType {
  name: string,
  value: string
}