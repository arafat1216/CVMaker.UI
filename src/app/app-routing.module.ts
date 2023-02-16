import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { OktaAuthGuard } from '@okta/okta-angular';

const routes: Routes = [
  {
    path:'',
    component:WelcomeComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'login/callback',
    component:OktaCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
