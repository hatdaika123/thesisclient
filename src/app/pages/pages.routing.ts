import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryManagementComponent } from "./category-management/category-management.component";
import { PagesComponent } from "./pages.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { 
                path: '',
                redirectTo: 'expense',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.default),
                data: { animation: 'DashboardPage' }
            },
            {
                path: 'expense',
                loadChildren: () => import('./expense/expense.module').then(m => m.default),
                data: { animation: 'ExpensePage' }
            },
            {
                path: 'category',
                loadChildren: () => import('./category-management/category-management.module').then(m => m.default),
                data: { animation: 'CategoryPage' }
            },
            {
                path: 'profile',
                component: UserProfileComponent,
                data: { animation: 'ProfilePage' }
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }