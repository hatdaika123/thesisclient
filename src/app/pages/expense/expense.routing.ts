import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExpenseFormComponent } from "./component/expense-form/expense-form.component";
import { ExpenseComponent } from "./expense.component";
import { ExpenseListComponent } from "./component/expense-list/expense-list.component";

const routes: Routes = [
    { 
        path: '', 
        component: ExpenseComponent
    },
    {
        path: 'form',
        component: ExpenseFormComponent,
        data: { animation: 'ExpenseFormPage' }
    },
    {
        path: 'form/:id',
        component: ExpenseFormComponent,
        data: { animation: 'ExpenseFormPage' }
    },
    {
        path: 'all',
        component: ExpenseListComponent,
        data: { animation: 'ExpenseFormPage' }
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExpenseRoutingModule {

}