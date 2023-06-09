import { PreviewComponent } from './components/preview/preview.component';
import { EditWorkExperienceComponent } from './components/edit-work-experience/edit-work-experience.component';
import { AddWorkExperienceComponent } from './components/add-work-experience/add-work-experience.component';
import { WorkExperiencesListComponent } from './components/work-experiences-list/work-experiences-list.component';
import { EditDegreeComponent } from './components/edit-degree/edit-degree.component';
import { AddDegreeComponent } from './components/add-degree/add-degree.component';
import { DegreesListComponent } from './components/degrees-list/degrees-list.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { DeleteSkillComponent } from './components/delete-skill/delete-skill.component';
import { UpdateSkillComponent } from './components/update-skill/update-skill.component';
import { AddSkillComponent } from './components/add-skill/add-skill.component';
import { SkillListComponent } from './components/skill-list/skill-list.component';
import { SummaryComponent } from './components/summary/summary.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
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
    path:'courses',
    component:CourseListComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'courses/add',
    component:AddCourseComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'courses/edit/:id',
    component:EditCourseComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'degrees',
    component:DegreesListComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'degrees/add',
    component:AddDegreeComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'degrees/edit/:id',
    component:EditDegreeComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'workexperiences',
    component:WorkExperiencesListComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'workexperiences/add',
    component:AddWorkExperienceComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'workexperiences/edit/:id',
    component:EditWorkExperienceComponent,
    canActivate:[OktaAuthGuard],
  },
  {
    path:'preview',
    component:PreviewComponent,
    canActivate: [OktaAuthGuard]
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
