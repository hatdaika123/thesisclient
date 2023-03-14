import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { 
    path: 'signup', 
    pathMatch: 'full', 
    component: SignUpComponent,
    data: { animation: 'SignUpPage' } 
  },
  { 
    path: 'login', 
    pathMatch: 'full', 
    component: LogInComponent,
    data: { animation: 'LogInPage' }
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
