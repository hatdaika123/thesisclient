import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryManagementComponent } from "./category-management.component";
import { CategoryFormComponent } from "./component/category-form/category-form.component";

const routes: Routes = [
    { 
        path: '', 
        component: CategoryManagementComponent
    },
    {
        path: 'form',
        component: CategoryFormComponent,
        data: { animation: 'CategoryFormPage' }
    },
    {
        path: 'form/:id',
        component: CategoryFormComponent,
        data: { animation: 'CategoryFormPage' }
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryManagementRoutingModule {

}