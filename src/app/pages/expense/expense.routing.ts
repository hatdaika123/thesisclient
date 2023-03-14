import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExpenseFormComponent } from "./component/expense-form/expense-form.component";
import { ExpenseComponent } from "./expense.component";

const routes: Routes = [
    { 
        path: '', 
        component: ExpenseComponent
    },
    {
        path: 'form',
        component: ExpenseFormComponent,
        data: { animation: 'ExpenseFormPage' }
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExpenseRoutingModule {

}