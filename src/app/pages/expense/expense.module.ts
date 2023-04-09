import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseComponent } from './expense.component';
import { ExpenseRoutingModule } from './expense.routing';
import { ExpenseFormComponent } from './component/expense-form/expense-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ExpenseHistoryComponent } from './component/expense-history/expense-history.component';
import { ExpenseHistoryItemComponent } from './component/expense-history-item/expense-history-item.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharesModule } from 'src/app/shares/shares.module';
import { ToastModule } from 'primeng/toast';
import { ExpenseListComponent } from './component/expense-list/expense-list.component';

@NgModule({
  declarations: [
    ExpenseComponent,
    ExpenseFormComponent,
    ExpenseHistoryComponent,
    ExpenseHistoryItemComponent,
    ExpenseListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExpenseRoutingModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    SharesModule,
    ToastModule
  ],
  exports: [
    ExpenseHistoryComponent
  ]
})
export default class ExpenseModule { }
