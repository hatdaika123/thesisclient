import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing';
import { ChartModule } from 'primeng/chart';
import { StatisticComponent } from './component/statistic/statistic.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import ExpenseModule from '../expense/expense.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StatisticComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ChartModule,
    SelectButtonModule,
    DropdownModule,
    ExpenseModule
  ]
})
export default class DashboardModule { }
