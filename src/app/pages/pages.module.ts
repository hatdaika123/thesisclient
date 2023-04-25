import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages.routing';
import { NavComponent } from './nav/nav.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    NavComponent,
    PagesComponent,
    DashboardComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SidebarModule,
    ButtonModule
  ]
})
export class PagesModule { }
