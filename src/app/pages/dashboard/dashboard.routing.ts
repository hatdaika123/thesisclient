import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StatisticComponent } from "./component/statistic/statistic.component";

const routes: Routes = [
    { 
        path: '',
        redirectTo: 'statistic',
        pathMatch: 'full'
    },
    {
        path: 'statistic',
        component: StatisticComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {

}