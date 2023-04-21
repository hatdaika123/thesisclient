import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryManagementComponent } from "./category-management/category-management.component";
import { PagesComponent } from "./pages.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AuthGuard } from "../guards/auth.guard";

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
                data: { animation: 'DashboardPage' },
                canActivate: [AuthGuard]
            },
            {
                path: 'expense',
                loadChildren: () => import('./expense/expense.module').then(m => m.default),
                data: { animation: 'ExpensePage' },
                canActivate: [AuthGuard]
            },
            {
                path: 'category',
                loadChildren: () => import('./category-management/category-management.module').then(m => m.default),
                data: { animation: 'CategoryPage' },
                canActivate: [AuthGuard]
            },
            {
                path: 'profile',
                component: UserProfileComponent,
                data: { animation: 'ProfilePage' },
                canActivate: [AuthGuard]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }