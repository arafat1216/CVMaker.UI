import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { DeleteSkillComponent } from './components/delete-skill/delete-skill.component';
import { UpdateSkillComponent } from './components/update-skill/update-skill.component';
import { AddSkillComponent } from './components/add-skill/add-skill.component';
import { SkillListComponent } from './components/skill-list/skill-list.component';
import { SummaryComponent } from './components/summary/summary.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { EducationComponent } from './components/education/education.component';
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
    path:'education',
    component:EducationComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'social-links',
    component:SocialLinksComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'summary',
    component:SummaryComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'skills',
    component:SkillListComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'skills/add',
    component:AddSkillComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'skills/edit/:id',
    component:UpdateSkillComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'projects',
    component:ProjectListComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'projects/add',
    component:AddProjectComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'projects/edit/:id',
    component:EditProjectComponent,
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
